﻿using System;
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
    public class IncomeController : ApiController
    {
        private SaveYourBaconEntities db = new SaveYourBaconEntities();

        // GET: api/Income
        public IQueryable<Income> GetIncomes()
        {
            return db.Incomes;
        }

        // GET: api/Income/5
        [ResponseType(typeof(Income))]
        public IQueryable<Income> GetIncomeByUserId(int id)
        {
            return db.Incomes.Where(income => income.UserId == id);
        }

        // GET: api/Income/5
        [ResponseType(typeof(Income))]
        public IQueryable<Income> GetIncome(int id)
        {
            return db.Incomes.Where(income => income.IncomeId == id);
        }

        // PUT: api/Income/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncome(Income income)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(income).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncomeExists(income.IncomeId))
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

        // PUT: api/Income/5
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdateIncomeAmount(int id, Income income)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != income.IncomeId)
            {
                return BadRequest();
            }

            db.Entry(income).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncomeExists(id))
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

        // POST: api/Income
        [ResponseType(typeof(Income))]
        public IHttpActionResult PostIncome(Income income)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Income i = db.Incomes.OrderByDescending(inc => inc.IncomeId).FirstOrDefault();
            int newId = (null == i ? 1000 : i.IncomeId) + 1;

            income.IncomeId = newId;

            var incomeSourceType = new IncomeSourceType();

            if(income.IncomeSourceTypeId < 0)
            {
                IncomeSourceType ist = db.IncomeSourceTypes.OrderByDescending(inc => inc.IncomeSourceTypeId).FirstOrDefault();
                int newIstId = (null == i ? 1000 : ist.IncomeSourceTypeId) + 1;

                incomeSourceType.IncomeSourceTypeId = newIstId;

                incomeSourceType.IncomeSourceName = income.NewIncomeName;

                incomeSourceType.UserId = income.UserId;

                incomeSourceType.WhenCreated = DateTime.Now;

                income.IncomeSourceTypeId = newIstId;

                db.IncomeSourceTypes.Add(incomeSourceType);
            }

            income.WhenCreated = DateTime.Now;

            db.Incomes.Add(income);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (IncomeExists(income.IncomeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = income.IncomeId }, income);
        }

        // DELETE: api/Income/5
        [ResponseType(typeof(Income))]
        public IHttpActionResult DeleteIncome(int id)
        {
            Income income = db.Incomes.Find(id);
            if (income == null)
            {
                return NotFound();
            }

            db.Incomes.Remove(income);
            db.SaveChanges();

            return Ok(income);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IncomeExists(int id)
        {
            return db.Incomes.Count(e => e.IncomeId == id) > 0;
        }
    }
}