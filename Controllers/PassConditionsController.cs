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
    public class PassConditionsController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly string baseURL;
        private readonly string apiUrl = "/CommuteTrackerService1/api/passconditions";

        public PassConditionsController(IConfiguration config)
        {
            configuration = config;
            baseURL = configuration.GetSection("BaseURL").Value;
        }

        // GET: api/<PassConditionsController>
        [HttpGet]
        public async Task<IEnumerable<PassCondition>> Get()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entities = JsonConvert.DeserializeObject<List<PassCondition>>(resp);

            return entities;
        }

        // GET api/<PassConditionsController>/5
        [HttpGet("{id}")]
        public async Task<PassCondition> Get(int id)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl + "/" + id.ToString());
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entity = JsonConvert.DeserializeObject<PassCondition>(resp);

            return entity;
        }

        // POST api/<PassConditionsController>
        [HttpPost]
        public async Task Post([FromBody] PassCondition value)
        {
            var json = JsonConvert.SerializeObject(value);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = new HttpClient();

            var response = await client.PostAsync(apiUrl, data);

            string result = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine(result);
        }

        // PUT api/<PassConditionsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PassConditionsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
