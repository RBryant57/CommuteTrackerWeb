using EntityLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommuteTrackerWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FareClassesController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly string baseURL;
        private readonly string apiUrl = "/CommuteTrackerService1/api/fareclasses";

        public FareClassesController(IConfiguration config)
        {
            configuration = config;
            baseURL = configuration.GetSection("BaseURL").Value;
        }

        // GET: api/<FareClassesController>
        [HttpGet]
        public async Task<IEnumerable<FareClass>> Get()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entities = JsonConvert.DeserializeObject<List<FareClass>>(resp);

            return entities;
        }

        // GET api/<FareClassesController>/5
        [HttpGet("{id}")]
        public async Task<FareClass> Get(int id)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl + "/" + id.ToString());
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entity = JsonConvert.DeserializeObject<FareClass>(resp);

            return entity;
        }

        // POST api/<FareClassesController>
        [HttpPost]
        public async Task Post([FromBody] FareClass value)
        {
            var json = JsonConvert.SerializeObject(value);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = new HttpClient();

            var response = await client.PostAsync(apiUrl, data);

            string result = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine(result);
        }

        // PUT api/<FareClassesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FareClassesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
