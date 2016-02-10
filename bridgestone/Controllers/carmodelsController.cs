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
    [Authorize(Roles = "Admin")]
    public class carmodelsController : Controller
    {
        private MYDBContext db = new MYDBContext();

        // GET: carmodels
        public ActionResult Index()
        {
            var carmodels = db.carmodels.Include(c => c.carmakes);
            return View(carmodels.ToList());
        }

        // GET: carmodels/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            carmodel carmodel = db.carmodels.Find(id);
            if (carmodel == null)
            {
                return HttpNotFound();
            }
            return View(carmodel);
        }

        // GET: carmodels/Create
        public ActionResult Create()
        {
            ViewBag.makeID = new SelectList(db.carmakes, "makeID", "make");
            return View();
        }

        // POST: carmodels/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "mid,modelname,enteredby,createdwhen,makeID")] carmodel carmodel)
        {
            carmodel.createdwhen = MyDateTime.Now();
            carmodel.enteredby = User.Identity.Name;

            string[] modelnamearr = carmodel.modelname.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);



            if (ModelState.IsValid)
            {
                foreach (string mn in modelnamearr)
                {
                    var mymodel = carmodel;
                    mymodel.modelname = mn.ToUpper();

                    db.carmodels.Add(mymodel);
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }

            ViewBag.makeID = new SelectList(db.carmakes, "makeID", "make", carmodel.makeID);
            return View(carmodel);
        }

        // GET: carmodels/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            carmodel carmodel = db.carmodels.Find(id);
            if (carmodel == null)
            {
                return HttpNotFound();
            }
            ViewBag.makeID = new SelectList(db.carmakes, "makeID", "make", carmodel.makeID);
            return View(carmodel);
        }

        // POST: carmodels/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "mid,modelname,enteredby,createdwhen,makeID")] carmodel carmodel)
        {
            if (ModelState.IsValid)
            {
                db.Entry(carmodel).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.makeID = new SelectList(db.carmakes, "makeID", "make", carmodel.makeID);
            return View(carmodel);
        }

        // GET: carmodels/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            carmodel carmodel = db.carmodels.Find(id);
            if (carmodel == null)
            {
                return HttpNotFound();
            }
            return View(carmodel);
        }

        // POST: carmodels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            carmodel carmodel = db.carmodels.Find(id);
            db.carmodels.Remove(carmodel);
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
