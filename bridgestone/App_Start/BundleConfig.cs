using System.Web;
using System.Web.Optimization;

namespace bridgestone
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/js/easing.js", "~/Scripts/icheck.js", "~/js/owl.carousel.js", "~/js/jquery.form.js", "~/js/jquery.fitvids.js", "~/js/wow.min.js", "~/js/jquery.mmenu.min.all.js", "~/js/jcycle.js", "~/js/main.js"));

            bundles.Add(new ScriptBundle("~/bundles/arabicbootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/js/easing.js", "~/Scripts/icheck.js", "~/js/owl.carousel2.js", "~/js/jquery.form.js", "~/js/jquery.fitvids.js", "~/js/wow.min.js", "~/js/jquery.mmenu.min.all.js", "~/js/jcycle.js", "~/js/arabicmain.js"));


            bundles.Add(new ScriptBundle("~/bundles/backend").Include(
                      "~/Scripts/bootstrap.js", "~/Scripts/icheck.js", "~/js/tag-it.js", "~/js/select/js/select2.min.js", "~/js/redactor.js", "~/js/redactorplugins.js", "~/js/datatable.js", "~/Scripts/moment.min.js", "~/Scripts/bootstrap-datetimepicker.min.js", "~/js/backendjs.js"));

            bundles.Add(new StyleBundle("~/Content/backendcss").Include(
                      "~/Content/bootstrap.css", "~/css/jquery.tagit.css", "~/js/select/css/select2.min.css", "~/css/grey.css", "~/css/redactor.css", "~/Content/bootstrap-datetimepicker.min.css", "~/css/datatable.css",
                      "~/css/backend.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css", "~/css/grey.css", "~/css/jquery.mmenu.all.css", "~/css/animate.css", "~/css/owl.carousel.css", "~/css/owl.theme.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/arabiccss").Include(
                      "~/Content/bootstrap.css", "~/css/grey.css", "~/css/jquery.mmenu.all.css", "~/css/position.css", "~/css/animate.css", "~/css/owl.carousel2.css",
                      "~/Content/arabiccss.css"));
        }
    }
}
