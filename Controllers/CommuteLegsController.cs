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
    public class CommuteLegsController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly string baseURL;
        private readonly string apiUrl = "/CommuteTrackerService/api/commutelegs";

        public CommuteLegsController(IConfiguration config)
        {
            configuration = config;
            baseURL = configuration.GetSection("BaseURL").Value;
        }

        // GET: api/<CommuteLegsController>
        [HttpGet]
        public async Task<IEnumerable<CommuteLeg>> Get()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entities = JsonConvert.DeserializeObject<List<CommuteLeg>>(resp);

            return entities;
        }

        // GET api/<CommuteLegsController>/5
        [HttpGet("{id}")]
        public async Task<CommuteLeg> Get(int id)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl + "/" + id.ToString());
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            var entity = JsonConvert.DeserializeObject<CommuteLeg>(resp);

            return entity;
        }

        // POST api/<CommuteLegsController>
        [HttpPost("{completeCommute}")]
        public async Task Post([FromBody] CommuteLeg value, bool completeCommute)
        {
            var commutesController = new CommutesController(configuration);
            var openCommutes = commutesController.GetOpenCommutes().Result;
            int commuteId = 0;
            if (openCommutes.Count() == 0)
            {
                var newCommute = new Commute
                {
                    DestinationId = value.DestinationId,
                    DelaySeconds = value.DelaySeconds,
                    Notes = value.Notes,
                    StartTime = value.StartTime
                };
                var newCommuteResult = await commutesController.Post(newCommute);
                commuteId = ((Commute)((CreatedAtActionResult)newCommuteResult.Result).Value).Id;
            }
            else if (openCommutes.Count() == 1)
            {
                commuteId = openCommutes.First().Id;
            }
            else
            {
                //return BadRequest("More than one open commute.");
            }

            value.CommuteId = commuteId;
            var json = JsonConvert.SerializeObject(value);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);

            var response = await client.PostAsync(apiUrl, data);

            string result = response.Content.ReadAsStringAsync().Result;

            if (completeCommute)
            {
                var commute = commutesController.Get(commuteId).Result;
                var totalDelay = GetTotalDelay(commuteId).Result;
                commute.EndTime = value.EndTime;
                commute.DelaySeconds = totalDelay;
                commutesController.Put(commute.Id, commute);
            }
            Console.WriteLine(result);
        }

        // PUT api/<CommuteLegsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommuteLegsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // GET: api/<CommuteLegsController>/gettotaldelay/5
        [HttpGet]
        [Route("[action]")]
        public async Task<int> GetTotalDelay(int commuteId)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl + "/gettotaldelay/" + commuteId);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();
            _ = int.TryParse(resp, out int result);

            return result;
        }
    }
}
