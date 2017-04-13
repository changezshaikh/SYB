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
    public class ExpensesController : ApiController
    {
        private SaveYourBaconEntities2 db = new SaveYourBaconEntities2();

        // GET: api/Expenses
        public IQueryable<Expense> GetExpenses()
        {
            return db.Expenses;
        }

        // GET: api/Income/5
        [ResponseType(typeof(Expense))]
        public IQueryable<Expense> GetExpense(int id)
        {
            return db.Expenses.Where(expense => expense.ExpenseId == id);
        }

        // GET: api/Expenses/5
        [ResponseType(typeof(Expense))]
        public IQueryable<Expense> GetExpenseByUserId(int id)
        {
            var expenses = db.Expenses.Where(expense => expense.UserId == id);
            //var expenses = from e in db.Expenses
            //               from ea in db.ExpenseAccounts
            //               where e.ExpenseAccountId == ea.ExpenseAccountId && e.UserId == id
            //               select e,ea;

            return expenses;
        }

        [ResponseType(typeof(Expense))]
        public IQueryable<Expense> GetImportantDatesForUser(int id)
        {
            return db.Expenses.Where(expense => expense.BillDate > DateTime.Now && expense.UserId == id);
        }

        // PUT: api/Expenses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExpense(Expense expense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(expense).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(expense.ExpenseId))
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

        // POST: api/Expenses
        [ResponseType(typeof(Expense))]
        public IHttpActionResult PostExpense(Expense expense)
        {
                if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Expense e = db.Expenses.OrderByDescending(ex => ex.ExpenseId).FirstOrDefault();
            int newId = (null == e ? 1000 : e.ExpenseId) + 1;

            expense.ExpenseId = newId;
            expense.IsProcessed = (int)ProcessedStatus.Pending;
            expense.WhenCreated = DateTime.Now;

            db.Expenses.Add(expense);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ExpenseExists(expense.ExpenseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            finally
            {
                var tc = new TransactionsController();
                tc.GenerateExpenseTransactionsForUser(expense.UserId);
            }

            return CreatedAtRoute("DefaultApi", new { id = expense.ExpenseId }, expense);
        }

        //// POST: api/Expenses
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PostExpense(string expenseAccountId, string expenseName, string userId, string frequency, string billAmount, string billDate, string expenseAmountTypeId)
        //{
        //    if (!string.IsNullOrEmpty(expenseAccountId) || !string.IsNullOrEmpty(expenseName))
        //    {
        //        return StatusCode(HttpStatusCode.BadRequest);
        //    }

        //    var expense = new Expense()
        //    {
        //        ExpenseAccountId = int.Parse(expenseAccountId),
        //        ExpenseName = expenseName,
        //        UserId = Convert.ToInt32(userId),
        //        Frequency = frequency,
        //        BillAmount = Convert.ToDecimal(billAmount),
        //        BillDate = Convert.ToDateTime(billDate),
        //        ExpenseAmountTypeId = Convert.ToInt32(expenseAmountTypeId)
        //    };

        //    db.Expenses.Add(expense);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ExpenseExists(expense.ExpenseId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = expense.ExpenseId }, expense);

        //    //return StatusCode(HttpStatusCode.NoContent);
        //}

        // DELETE: api/Expenses/5
        [ResponseType(typeof(Expense))]
        public IHttpActionResult DeleteExpense(int id)
        {
            Expense expense = db.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound();
            }

            db.Expenses.Remove(expense);
            db.SaveChanges();

            return Ok(expense);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExpenseExists(int id)
        {
            return db.Expenses.Count(e => e.ExpenseId == id) > 0;
        }
    }
}