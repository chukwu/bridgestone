using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using bridgestone.Models;
using Microsoft.AspNet.Identity;

namespace bridgestone.Controllers
{

    public class jobsController : Controller
    {
        private MYDBContext db = new MYDBContext();

        // GET: jobs
        public ActionResult Index()
        {
            return View(db.jobs.ToList());
        }

        // GET: jobs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            job job = db.jobs.Find(id);
            if (job == null)
            {
                return HttpNotFound();
            }
            return View(job);
        }

        // GET: jobs/Create
        [Authorize(Roles = "Job Entry")]
        public ActionResult Create()
        {
            return View();
        }

        // POST: jobs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "JobID,fullname,phone,email,make,model,regno,date,datelastvisit,milage,service,details,enteredby,enteredbyid,createdwhen")] job job, string[] service)
        {
            job.createdwhen = MyDateTime.Now();
            job.enteredby = User.Identity.Name;
            job.enteredbyid = User.Identity.GetUserId();

            job.service = String.Join(",", service.Select(p => p.ToString()).ToArray());

            if (ModelState.IsValid)
            {

                string[] makearray = job.make.Split(new char[] { '★' }, StringSplitOptions.RemoveEmptyEntries);
                string[] servicearray = service;


                job.make = makearray[0];
                job.model = makearray[1];

                db.jobs.Add(job);
                db.SaveChanges();

                var insertjobid = job.JobID;

                foreach(var serviceandsub in servicearray){
                    string[] sandsubarray = serviceandsub.Split(new char[] { '★' }, StringSplitOptions.RemoveEmptyEntries);
                    db.jobselections.Add(new jobselection() {JobID = insertjobid, jobsubservice = sandsubarray[1], service = sandsubarray[0]  });
                    db.SaveChanges();
                }

                return RedirectToAction("Index");
            }

            return View(job);
        }

        // GET: jobs/Edit/5
        [Authorize(Roles = "Manage Job Cart")]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            job job = db.jobs.Find(id);
            if (job == null)
            {
                return HttpNotFound();
            }
            return View(job);
        }

        // POST: jobs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Manage Job Cart")]
        public ActionResult Edit([Bind(Include = "JobID,fullname,phone,email,make,model,regno,date,datelastvisit,milage,service,details,enteredby,enteredbyid,createdwhen")] job job, string[] service2)
        {
            bool enteredservice = service2 == null ? false : true;
            if(enteredservice == true){
                enteredservice = service2.Length > 0;
            }

            if (enteredservice)
            {
                job.service = String.Join(",", service2.Select(p => p.ToString()).ToArray());
            }

            if (ModelState.IsValid)
            {
                string[] makearray = job.make.Split(new char[] { '★' }, StringSplitOptions.RemoveEmptyEntries);
                string[] servicearray = service2;

                job.make = makearray[0];
                job.model = makearray[1];

                var insertjobid = job.JobID;

                db.Entry(job).State = EntityState.Modified;
                db.SaveChanges();

                if (enteredservice)
                {
                    List<jobselection> js = db.jobselections.Where(w => w.JobID == insertjobid).ToList<jobselection>();
                    db.jobselections.RemoveRange(js);

                    foreach (var serviceandsub in servicearray)
                    {
                        string[] sandsubarray = serviceandsub.Split(new char[] { '★' }, StringSplitOptions.RemoveEmptyEntries);
                        db.jobselections.Add(new jobselection() { JobID = insertjobid, jobsubservice = sandsubarray[1], service = sandsubarray[0] });
                        db.SaveChanges();
                    }
                }

                return RedirectToAction("Index");
            }
            return View(job);
        }

        // GET: jobs/Delete/5
        [Authorize(Roles = "Manage Job Cart")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            job job = db.jobs.Find(id);
            if (job == null)
            {
                return HttpNotFound();
            }
            return View(job);
        }

        // POST: jobs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Manage Job Cart")]
        public ActionResult DeleteConfirmed(int id)
        {
            List<jobselection> js = db.jobselections.Where(w => w.JobID == id).ToList<jobselection>();
            db.jobselections.RemoveRange(js);

            job job = db.jobs.Find(id);
            db.jobs.Remove(job);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
