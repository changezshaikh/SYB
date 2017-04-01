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
    public class ExpenseAccountsController : ApiController
    {
        private SaveYourBaconEntities db = new SaveYourBaconEntities();

        // GET: api/ExpenseAccounts
        public IQueryable<ExpenseAccount> GetExpenseAccounts()
        {
            return db.ExpenseAccounts;
        }

        // GET: api/ExpenseAccounts/5
        [ResponseType(typeof(ExpenseAccount))]
        public IHttpActionResult GetExpenseAccount(int id)
        {
            ExpenseAccount expenseAccount = db.ExpenseAccounts.Find(id);
            if (expenseAccount == null)
            {
                return NotFound();
            }

            return Ok(expenseAccount);
        }

        [ResponseType(typeof(ExpenseAccount))]
        public IQueryable<ExpenseAccount> GetExpenseAccountTypesForUser(int id)
        {
            return db.ExpenseAccounts.Where(expenseAccount => expenseAccount.UserId == id);
        }

        // PUT: api/ExpenseAccounts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExpenseAccount(int id, ExpenseAccount expenseAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != expenseAccount.ExpenseAccountId)
            {
                return BadRequest();
            }

            db.Entry(expenseAccount).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseAccountExists(id))
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

        // POST: api/ExpenseAccounts
        [ResponseType(typeof(ExpenseAccount))]
        public IHttpActionResult PostExpenseAccount(ExpenseAccount expenseAccount)
        {
            if (!ModelState.IsValid || expenseAccount == null)
            {
                return BadRequest(ModelState);
            }

            ExpenseAccount e = db.ExpenseAccounts.OrderByDescending(ex => ex.ExpenseAccountId).FirstOrDefault();
            int newId = (null == e ? 1000 : e.ExpenseAccountId) + 1;

            expenseAccount.ExpenseAccountId = newId;

            expenseAccount.WhenCreated = DateTime.Now;

            db.ExpenseAccounts.Add(expenseAccount);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ExpenseAccountExists(expenseAccount.ExpenseAccountId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = expenseAccount.ExpenseAccountId }, expenseAccount);
        }

        // DELETE: api/ExpenseAccounts/5
        [ResponseType(typeof(ExpenseAccount))]
        public IHttpActionResult DeleteExpenseAccount(int id)
        {
            ExpenseAccount expenseAccount = db.ExpenseAccounts.Find(id);
            if (expenseAccount == null)
            {
                return NotFound();
            }

            db.ExpenseAccounts.Remove(expenseAccount);
            db.SaveChanges();

            return Ok(expenseAccount);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExpenseAccountExists(int id)
        {
            return db.ExpenseAccounts.Count(e => e.ExpenseAccountId == id) > 0;
        }
    }
}