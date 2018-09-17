using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tasks.Service.Thoughts;

namespace TasksAngular.Controllers
{
    public class HomeController : Controller
    {
        private readonly IThoughtService thoughtService;

        public HomeController(IThoughtService thoughtService)
        {
            this.thoughtService = thoughtService;
        }
        public IActionResult Index()
        {

            var thoughts = thoughtService.GetThought(4006);
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
