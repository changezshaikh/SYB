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
    public class FrequencyTypesController : ApiController
    {
        private SaveYourBaconEntities db = new SaveYourBaconEntities();

        // GET: api/FrequencyTypes
        public IQueryable<FrequencyType> GetFrequencyTypes()
        {
            return db.FrequencyTypes;
        }

        // GET: api/FrequencyTypes/5
        [ResponseType(typeof(FrequencyType))]
        public IHttpActionResult GetFrequencyType(int id)
        {
            FrequencyType frequencyType = db.FrequencyTypes.Find(id);
            if (frequencyType == null)
            {
                return NotFound();
            }

            return Ok(frequencyType);
        }

        // PUT: api/FrequencyTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFrequencyType(int id, FrequencyType frequencyType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != frequencyType.FrequencyId)
            {
                return BadRequest();
            }

            db.Entry(frequencyType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FrequencyTypeExists(id))
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

        // POST: api/FrequencyTypes
        [ResponseType(typeof(FrequencyType))]
        public IHttpActionResult PostFrequencyType(FrequencyType frequencyType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FrequencyTypes.Add(frequencyType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (FrequencyTypeExists(frequencyType.FrequencyId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = frequencyType.FrequencyId }, frequencyType);
        }

        // DELETE: api/FrequencyTypes/5
        [ResponseType(typeof(FrequencyType))]
        public IHttpActionResult DeleteFrequencyType(int id)
        {
            FrequencyType frequencyType = db.FrequencyTypes.Find(id);
            if (frequencyType == null)
            {
                return NotFound();
            }

            db.FrequencyTypes.Remove(frequencyType);
            db.SaveChanges();

            return Ok(frequencyType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FrequencyTypeExists(int id)
        {
            return db.FrequencyTypes.Count(e => e.FrequencyId == id) > 0;
        }
    }
}