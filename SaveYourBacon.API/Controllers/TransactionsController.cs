using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SaveYourBacon.API.Model;

namespace SaveYourBacon.API.Controllers
{
    public class TransactionsController : ApiController
    {
        private SaveYourBaconEntities db = new SaveYourBaconEntities();

        // GET: api/Transactions
        public IQueryable<Transaction> GetTransactions()
        {
            return db.Transactions;
        }

        // GET: api/Transactions
        public IQueryable<Transaction> GetTransactionsByUserId(int id)
        {
            return db.Transactions.Where(transaction => transaction.TransactionPeriod.UserId == id);
        }

        public IQueryable<TransactionRecord> GetExpenseTransactionsByUserId(int id)
        {
            var transactionRecordList = new List<TransactionRecord>();
            var transactions = db.Transactions.Where(transaction => transaction.TransactionPeriod.UserId == id && transaction.TransactionTypeId == (int)Constants.TransactionType.Expense);

            foreach (var transaction in transactions)
            {
                var tr = new TransactionRecord(transaction);
                var expense = db.Expenses.Where(ex => ex.ExpenseId == tr.TransactionSourceId).FirstOrDefault();
                tr.ExpenseName = expense.ExpenseName;
                tr.ExpenseAccountName = expense.ExpenseAccount.ExpenseAccountName;

                transactionRecordList.Add(tr);
            }

            return transactionRecordList.AsQueryable();
        }

        // GET: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult GetTransaction(int id)
        {
            Transaction transaction = db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // PUT: api/Transactions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransaction(int id, Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transaction.TransactionId)
            {
                return BadRequest();
            }

            db.Entry(transaction).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Transactions
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult PostTransaction(Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Transaction t = db.Transactions.OrderByDescending(tr => tr.TransactionId).FirstOrDefault();
            int newId = (null == t ? 1000 : t.TransactionId) + 1;

            transaction.TransactionId = newId;

            db.Transactions.Add(transaction);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TransactionExists(transaction.TransactionId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = transaction.TransactionId }, transaction);
        }

        [ResponseType(typeof(Transaction))]
        public IHttpActionResult PostTransactions(List<Transaction> transactions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Transaction t = db.Transactions.OrderByDescending(tr => tr.TransactionId).FirstOrDefault();
            int newId = (null == t ? 1000 : t.TransactionId) + 1;
            var count = 0;

            foreach (var transaction in transactions)
            {
                transaction.TransactionId = newId + count;
                transaction.WhenCreated = DateTime.Now;

                var period = PeriodExistsForTransaction(transaction.BillDate, transaction.UserId.Value);
                var periodId = 0;

                if(period == null)
                {
                    periodId = CreatePeriodForDate(transaction.BillDate, transaction.UserId.Value);
                    transaction.TransactionPeriodId = periodId;
                }
                else
                {
                    transaction.TransactionPeriodId = period.TransactionPeriodId;
                }

                db.Transactions.Add(transaction);

                count++;
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult DeleteTransaction(int id)
        {
            Transaction transaction = db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            db.Transactions.Remove(transaction);
            db.SaveChanges();

            return Ok(transaction);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransactionExists(int id)
        {
            return db.Transactions.Count(e => e.TransactionId == id) > 0;
        }

        private TransactionPeriod PeriodExistsForTransaction(DateTime? transactionDate, int userId)
        {
            var transactionPeriod = db.TransactionPeriods.Where(t => t.UserId == userId && (t.StartDate < transactionDate && t.EndDate >= transactionDate));

            return transactionPeriod.FirstOrDefault();
        }

        private int CreatePeriodForDate(DateTime? transactionDate, int userId)
        {
            TransactionPeriod t = db.TransactionPeriods.OrderByDescending(tr => tr.TransactionPeriodId).FirstOrDefault();
            int newId = (null == t ? 1000 : t.TransactionPeriodId) + 1;
            var tp = new TransactionPeriod();
            var newStartDate = new DateTime(transactionDate.Value.Year, transactionDate.Value.Month, 1);
            var newEndate = new DateTime(transactionDate.Value.Year, transactionDate.Value.Month, DateTime.DaysInMonth(transactionDate.Value.Year, transactionDate.Value.Month));
            tp.StartDate = newStartDate;
            tp.EndDate = newEndate;
            tp.UserId = userId;
            tp.TransactionPeriodId = newId;

            db.TransactionPeriods.Add(tp);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return -1;
            }

            return newId;
        }
    }
}