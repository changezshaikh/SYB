using SaveYourBacon.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace SaveYourBacon.API.Controllers
{
    public class ImpDatesController : ApiController
    {
        private SaveYourBaconEntities db = new SaveYourBaconEntities();

        // GET: api/ImpDates/5
        [ResponseType(typeof(Expense))]
        public IQueryable<Expense> GetImportantDatesForUser(int id)
        {
            return db.Expenses.Where(expense => expense.BillDate > DateTime.Now && expense.UserId == id);
        }
    }
}
