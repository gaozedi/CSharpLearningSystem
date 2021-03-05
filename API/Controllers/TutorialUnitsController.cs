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
using Microsoft.AspNetCore.Authorization;
using API.CompilationHelper;

namespace API.Controllers
{

    public class TutorialUnitsController : BaseController
    {
        private IMyCompiler _mycompiler;
        public TutorialUnitsController(IMyCompiler compiler):base()
        {
            _mycompiler = compiler;
        }
        
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TutorialUnit>>> List()
        {
            //send message to List Handler
            return await Mediator.Send(new List.Query());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TutorialUnit>> Details(int id)
        {
            //send message to List Handler
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [Route("Compiler")]
        [HttpPost]
        public ActionResult Compile(CodeViewModel code)
        {
            var result =_mycompiler.Complie(code.CodeStr).ToString();
            Console.WriteLine(result);
            return Ok(result);
        }

        [Route("Meow")]
        [HttpGet]
        public ActionResult<String> Meow()
        {
            return ("Meow");
        }
    }
}
