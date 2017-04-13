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
using static SaveYourBacon.API.Model.Constants;

namespace SaveYourBacon.API.Controllers
{
    public class TransactionsController : ApiController
    {
        private SaveYourBaconEntities2 db = new SaveYourBaconEntities2();

        // GET: api/Transactions
        public IQueryable<Transaction> GetTransactions()
        {
            return db.Transactions;
        }

        // GET: api/Transactions
        public IQueryable<Transaction> GetTransactionsByUserId(int id)
        {
            var transactions = from t in db.Transactions
                    from tp in db.TransactionPeriods
                    where t.TransactionPeriodId == tp.TransactionPeriodId && tp.UserId == id
                    select t;

            return transactions;
        }

        public IQueryable<TransactionRecord> GetExpenseTransactionsByUserId(int id)
        {
            var transactionRecordList = new List<TransactionRecord>();

            var transactions = (from t in db.Transactions
                               from tp in db.TransactionPeriods
                               where t.TransactionPeriodId == tp.TransactionPeriodId 
                               && tp.UserId == id 
                               && t.TransactionTypeId == (int)Constants.TransactionType.Expense
                               && t.AmountContributed != null
                               select t).OrderBy(t => t.BillDate);

            foreach (var transaction in transactions)
            {
                var tr = new TransactionRecord(transaction);
                var expense = db.Expenses.Where(ex => ex.ExpenseId == tr.TransactionSourceId).FirstOrDefault();
                tr.ExpenseName = expense != null ? expense.ExpenseName : string.Empty;
                var expenseAccountName = db.ExpenseAccounts.Where(ex => ex.ExpenseAccountId == expense.ExpenseAccountId).FirstOrDefault();
                tr.ExpenseAccountName = expense != null ? expenseAccountName.ExpenseAccountName : "Expense Account Not Found";

                transactionRecordList.Add(tr);
            }

            return transactionRecordList.AsQueryable();
        }

        public IQueryable<TransactionRecord> GetIncomeTransactionsByUserId(int id)
        {
            var transactionRecordList = new List<TransactionRecord>();

            var transactions = db.Transactions.Where(t => t.BillDate >= DateTime.Now && t.UserId == id && t.TransactionTypeId == (int)Constants.TransactionType.Income);

            foreach (var transaction in transactions)
            {
                var tr = new TransactionRecord(transaction);
                var income = db.Incomes.Where(i => i.IncomeId == tr.TransactionSourceId).FirstOrDefault();
                if (income == null) continue;
                tr.IncomeSourceName = income != null ? income.IncomeSourceType.IncomeSourceName : string.Empty;
                tr.Frequency = income.Frequency;

                transactionRecordList.Add(tr);
            }

            return transactionRecordList.AsQueryable();
        }

        public IQueryable<TransactionRecord> GetImportantDatesForUser(int id)
        {
            var transactionRecordList = new List<TransactionRecord>();

            var maxDate = DateTime.Now.AddDays(7);

            var transactions = db.Transactions.Where(t => t.BillDate >= DateTime.Now && t.BillDate <= maxDate
                                                    && t.UserId == id 
                                                    && t.TransactionTypeId == (int)Constants.TransactionType.Expense);

            foreach (var transaction in transactions)
            {
                var tr = new TransactionRecord(transaction);
                var expense = db.Expenses.Where(ex => ex.ExpenseId == tr.TransactionSourceId).FirstOrDefault();
                if (expense == null) continue;
                tr.ExpenseName = expense != null ? expense.ExpenseName : string.Empty;
                var expenseAccountName = db.ExpenseAccounts.Where(ex => ex.ExpenseAccountId == expense.ExpenseAccountId).FirstOrDefault();
                tr.ExpenseAccountName = expense != null ? expenseAccountName.ExpenseAccountName : "Expense Account Not Found";
                tr.Frequency = expense.Frequency;

                transactionRecordList.Add(tr);
            }

            return transactionRecordList.AsQueryable();
        }

        public IQueryable<Transaction> GetExpenseTransactionsByExpenseId(int id)
        {
            var transactions = from t in db.Transactions
                               from e in db.Expenses
                               where t.TransactionSourceId == e.ExpenseId
                               select t;

            return transactions.AsQueryable();
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
                    periodId = CreatePeriodForDate(transaction.BillDate, transaction.UserId.Value, true);
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

        public void GenerateExpenseTransactionsForUser(int id)
        {
            var maxDate = DateTime.Now.AddDays(7);
            var expenses = db.Expenses.Where(ex => ex.UserId == id 
                                             && ex.ExpenseAmountTypeId != (int)AmountTypes.OneTime 
                                             && ex.BillDate <= maxDate
                                             //&& (ex.EndDate.HasValue && ex.EndDate.Value > DateTime.Now)
                                             && ex.IsProcessed == (int)ProcessedStatus.Pending);

            IList<Expense> expenses1 = (from e in db.Expenses
                                       where e.UserId == id
                                       && e.ExpenseAmountTypeId != (int)AmountTypes.OneTime
                                       && e.BillDate <= maxDate
                                       && e.IsProcessed == (int)ProcessedStatus.Pending
                                       select e).ToList();

            foreach (Expense expense in expenses1)
            {
                var transactionDates = GetTransactionDates(expense.Frequency, expense.BillDate.Value);

                foreach(var date in transactionDates)
                {
                    var transactionPeriod = PeriodExistsForTransaction(date, id);
                    Transaction t = db.Transactions.OrderByDescending(tr => tr.TransactionId).FirstOrDefault();
                    int newId = (null == t ? 1000 : t.TransactionId) + 1;
                    var billAmount = GetBillAmount(expense);

                    var transaction = new Transaction
                    {
                        TransactionId = newId,
                        BillDate = date,
                        TransactionPeriodId = transactionPeriod != null ? transactionPeriod.TransactionPeriodId : CreatePeriodForDate(date, id, true),
                        TransactionSourceId = expense.ExpenseId,
                        TransactionTypeId = (int)Constants.TransactionType.Expense,
                        UserId = id,
                        AmountContributed = billAmount,
                        WhenCreated = DateTime.Now
                    };

                    db.Transactions.Add(transaction);

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (DbUpdateException)
                    {
                        throw;
                    }
                }

                expense.IsProcessed = (int)ProcessedStatus.Done;

                db.Entry(expense).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    throw;
                }
            }
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

        private decimal? GetBillAmount(Expense expense)
        {
            if(expense.ExpenseAmountTypeId == (int)AmountTypes.Fixed || expense.ExpenseAmountTypeId == (int)AmountTypes.OneTime)
            {
                return expense.BillAmount;
            }
            else
            {
                var minDate = expense.BillDate.Value.AddYears(-1).AddDays(-2);
                var maxDate = expense.BillDate.Value.AddYears(-1).AddDays(2);
                var previousTransaction = db.Transactions.Where(t => t.BillDate >= minDate && t.BillDate <= maxDate).FirstOrDefault();

                return previousTransaction.CustomAmount;
            }
        }

        private List<DateTime> GetTransactionDates(string frequency, DateTime billDate)
        {
            var transactionDates = new List<DateTime>();

            int noOfTransactions = 0;
            switch (frequency)
            {
                case "Annually":
                    noOfTransactions = (int)FrequencyYearlyNumber.Annually;
                    for(int i=0; i < noOfTransactions; i++)
                    {
                        transactionDates.Add(billDate.AddYears(i));
                    }
                    break;
                case "Monthly":
                    noOfTransactions = (int)FrequencyYearlyNumber.Monthly;
                    for (int i = 0; i < noOfTransactions; i++)
                    {
                        transactionDates.Add(billDate.AddMonths(i));
                    }
                    break;
                case "Weekly":
                    noOfTransactions = (int)FrequencyYearlyNumber.Weekly;
                    for (int i = 0; i < noOfTransactions; i++)
                    {
                        transactionDates.Add(billDate.AddDays(i*7));
                    }
                    break;
                case "Fortnightly":
                    noOfTransactions = (int)FrequencyYearlyNumber.Fortnightly;
                    for (int i = 0; i < noOfTransactions; i++)
                    {
                        transactionDates.Add(billDate.AddDays(i * 14));
                    }
                    break;
                case "Quarterly":
                    noOfTransactions = (int)FrequencyYearlyNumber.Quarterly;
                    for (int i = 0; i < noOfTransactions; i++)
                    {
                        transactionDates.Add(billDate.AddMonths(i));
                    }
                    break;
                case "Bi-Annually":
                    noOfTransactions = (int)FrequencyYearlyNumber.BiAnnually;
                    for (int i = 0; i < noOfTransactions; i++)
                    {
                        transactionDates.Add(billDate.AddMonths(i * 6));
                    }
                    break;
                default:
                    noOfTransactions = 0;
                    break;
            }

            return transactionDates;
        }

        private TransactionPeriod PeriodExistsForTransaction(DateTime? transactionDate, int userId)
        {
            var transactionPeriod = db.TransactionPeriods.Where(t => t.UserId == userId && (t.StartDate <= transactionDate && t.EndDate >= transactionDate));

            return transactionPeriod.FirstOrDefault();
        }

        private int CreatePeriodForDate(DateTime? transactionDate, int userId, bool saveChanges)
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

            if (saveChanges)
            {
                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    return -1;
                }

            }

            return newId;
        }
    }
}