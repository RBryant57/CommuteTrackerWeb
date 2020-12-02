using EntityLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommuteTrackerWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly string baseURL;

        public RoutesController(IConfiguration config)
        {
            baseURL = config.GetSection("BaseURL").Value;
        }

        // GET: api/<RoutesController>
        [HttpGet]
        public async Task<IEnumerable<Route>> Get()
        {
            var routeClient = new HttpClient();
            routeClient.BaseAddress = new Uri(baseURL);
            routeClient.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            var url = "/CommuteTrackerService1/api/routes/";
            HttpResponseMessage response = await routeClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var routes = JsonConvert.DeserializeObject<List<Route>>(resp);

            return routes;
        }

        // GET api/<RoutesController>/5
        [HttpGet("{id}")]
        public async Task<Route> Get(int id)
        {
            var routeClient = new HttpClient();
            routeClient.BaseAddress = new Uri(baseURL);
            routeClient.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            var url = "/CommuteTrackerService1/api/routes/" + id.ToString();
            HttpResponseMessage response = await routeClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var route = JsonConvert.DeserializeObject<Route>(resp);

            return route;
        }

        // POST api/<RoutesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RoutesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RoutesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
