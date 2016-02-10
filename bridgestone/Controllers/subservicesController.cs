using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using bridgestone.Models;

namespace bridgestone.Controllers
{
    public class subservicesController : Controller
    {
        private MYDBContext db = new MYDBContext();

        // GET: subservices
        public ActionResult Index()
        {
            var subservices = db.subservices.Include(s => s.services);
            return View(subservices.ToList());
        }

        // GET: subservices/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            subservice subservice = db.subservices.Find(id);
            if (subservice == null)
            {
                return HttpNotFound();
            }
            return View(subservice);
        }

        // GET: subservices/Create
        public ActionResult Create()
        {
            ViewBag.sid = new SelectList(db.services, "sid", "servicename");
            return View();
        }

        // POST: subservices/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ssid,servicename,enteredby,createdwhen,sid")] subservice subservice)
        {
            subservice.createdwhen = MyDateTime.Now();
            subservice.enteredby = User.Identity.Name;

            string[] servicenamearr = subservice.servicename.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            if (ModelState.IsValid)
            {
                foreach (string sn in servicenamearr)
                {
                    var myservice = subservice;
                    myservice.servicename = sn.ToUpper();

                    db.subservices.Add(myservice);
                    db.SaveChanges();
                }
                return RedirectToAction("Index");

            }

            ViewBag.sid = new SelectList(db.services, "sid", "servicename", subservice.sid);
            return View(subservice);
        }

        // GET: subservices/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            subservice subservice = db.subservices.Find(id);
            if (subservice == null)
            {
                return HttpNotFound();
            }
            ViewBag.sid = new SelectList(db.services, "sid", "servicename", subservice.sid);
            return View(subservice);
        }

        // POST: subservices/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ssid,servicename,enteredby,createdwhen,sid")] subservice subservice)
        {
            
            if (ModelState.IsValid)
            {
                db.Entry(subservice).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.sid = new SelectList(db.services, "sid", "servicename", subservice.sid);
            return View(subservice);
        }

        // GET: subservices/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            subservice subservice = db.subservices.Find(id);
            if (subservice == null)
            {
                return HttpNotFound();
            }
            return View(subservice);
        }

        // POST: subservices/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            subservice subservice = db.subservices.Find(id);
            db.subservices.Remove(subservice);
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
