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
using bridgestone.Models;

namespace bridgestone.Controllers
{
    [Authorize]
    public class jobsApiController : ApiController
    {
        private MYDBContext db = new MYDBContext();

        // GET: api/jobsApi
        public IQueryable<job> Getjobs()
        {
            return db.jobs;
        }

        // GET: api/jobsApi/5
        [ResponseType(typeof(job))]
        public IHttpActionResult Getjob(int id)
        {
            job job = db.jobs.Find(id);
            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }

        // PUT: api/jobsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putjob(int id, job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != job.JobID)
            {
                return BadRequest();
            }

            db.Entry(job).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!jobExists(id))
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

        // POST: api/jobsApi
        [ResponseType(typeof(job))]
        [Authorize(Roles = "Job Entry")]
        public IHttpActionResult Postjob([FromBody] job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.jobs.Add(job);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = job.JobID }, job);
        }

        // DELETE: api/jobsApi/5
        [ResponseType(typeof(job))]
        public IHttpActionResult Deletejob(int id)
        {
            job job = db.jobs.Find(id);
            if (job == null)
            {
                return NotFound();
            }

            db.jobs.Remove(job);
            db.SaveChanges();

            return Ok(job);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool jobExists(int id)
        {
            return db.jobs.Count(e => e.JobID == id) > 0;
        }
    }
}