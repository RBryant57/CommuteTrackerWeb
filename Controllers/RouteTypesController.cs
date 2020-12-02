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
    public class RouteTypesController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly string baseURL;

        public RouteTypesController(IConfiguration config)
        {
            configuration = config;
            baseURL = configuration.GetSection("BaseURL").Value;
        }

        // GET: api/<RouteTypesController>
        [HttpGet]
        public async Task<IEnumerable<RouteType>> Get()
        {
            var routeClient = new HttpClient();
            routeClient.BaseAddress = new Uri(baseURL);
            routeClient.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            var url = "/CommuteTrackerService1/api/routetypes/";
            HttpResponseMessage response = await routeClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var routeTypes = JsonConvert.DeserializeObject<List<RouteType>>(resp);

            return routeTypes;
        }

        // GET api/<RouteTypesController>/5
        [HttpGet("{id}")]
        public async Task<RouteType> Get(int id)
        {
            var routeClient = new HttpClient();
            routeClient.BaseAddress = new Uri(baseURL);
            routeClient.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            var url = "/CommuteTrackerService1/api/routetypes/" + id.ToString();
            HttpResponseMessage response = await routeClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var routeType = JsonConvert.DeserializeObject<RouteType>(resp);

            return routeType;
        }

        // POST api/<RouteTypesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RouteTypesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RouteTypesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
