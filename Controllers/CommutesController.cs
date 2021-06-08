using EntityLayer.Interfaces;
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
    public class CommutesController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly string baseURL;
        private readonly string apiUrl = "/api/commutes";

        public CommutesController(IConfiguration config)
        {
            configuration = config;
            baseURL = configuration.GetSection("BaseURL").Value;
        }

        // GET: api/<CommutesController>
        [HttpGet]
        public async Task<IEnumerable<Commute>> Get()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entities = JsonConvert.DeserializeObject<List<Commute>>(resp);

            return entities;
        }

        // GET api/<CommutesController>/5
        [HttpGet("{id}")]
        public async Task<Commute> Get(int id)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl + "/" + id.ToString());
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entity = JsonConvert.DeserializeObject<Commute>(resp);

            return entity;
        }

        // POST api/<CommutesController>
        [HttpPost]
        public async Task<ActionResult<IEntity>> Post([FromBody] Commute value)
        {
            var json = JsonConvert.SerializeObject(value);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);

            var response = await client.PostAsync(apiUrl, data);

            string result = response.Content.ReadAsStringAsync().Result;
            var newEntity = JsonConvert.DeserializeObject<Commute>(result);
            return CreatedAtAction("GetCommute", new { id = newEntity.Id }, newEntity);
        }

        // PUT api/<CommutesController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Commute value)
        {
            var json = JsonConvert.SerializeObject(value);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);

            var response = await client.PutAsync(apiUrl + "/" + id, data);

            string result = response.Content.ReadAsStringAsync().Result;
            var newEntity = JsonConvert.DeserializeObject<Commute>(result);
        }

        // DELETE api/<CommutesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // GET: api/<CommutesController>/getopencommutes
        [HttpGet]
        [Route("[action]")]
        public async Task<IEnumerable<Commute>> GetOpenCommutes()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl + "/getopencommutes");
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entities = JsonConvert.DeserializeObject<List<Commute>>(resp);

            return entities;
        }
    }
}
