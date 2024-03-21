using AjaxDemo.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxDemo.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=ListPeoplePost;Integrated Security=True;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            Thread.Sleep(2000);
            var repo = new PeopleRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(p);
            return Json(p);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Delete(id);
        }

        public IActionResult GetPersonById(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            return Json(repo.GetById(id));
        }

        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Update(person);
        }
    }
}