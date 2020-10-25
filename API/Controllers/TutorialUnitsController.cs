using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.TutorialUnits;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TutorialUnitsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TutorialUnitsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TutorialUnit>>> List()
        {
            //send message to List Handler
            return await _mediator.Send(new List.Query());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TutorialUnit>> Details(int id)
        {
            //send message to List Handler
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [Route("Compiler")]
        [HttpGet]
        public ActionResult Compile(string code)
        {
            var result = MyCompiler.Compile(code).ToString();
            Console.WriteLine(result);
            return Ok(result);
        }
        // // POST api/values
        // [HttpPost]
        // public void Post([FromBody] string value)
        // {
        // }

        // // PUT api/values/5
        // [HttpPut("{id}")]
        // public void Put(int id, [FromBody] string value)
        // {
        // }

        // // DELETE api/values/5
        // [HttpDelete("{id}")]
        // public void Delete(int id)
        // {
        // }
    }
}
