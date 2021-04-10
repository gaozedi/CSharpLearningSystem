using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.CompilationHelper;
using Application.Errors;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MyHub : Hub
    {
        private readonly IMediator _mediator;
        public List<string> CodeSet = new List<string>();
        public int LinesUserSubmitted { get; set; }
        private string _status;
        private IMyCompiler _compiler;
        public MyHub(IMediator mediator, IMyCompiler compiler)
        {
            _mediator = mediator;
            _compiler = compiler;
        }
        

        //Write code to file.
        public async Task SendSignal(string content)
        {
            var username = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            using StreamWriter file = new StreamWriter("WriteLines.txt", append: true);
            await file.WriteLineAsync(content);
            await Clients.All.SendAsync("ReceiveSignal", username + ":" + content.Length + ":" + content[0] + "*******" + content[content.Length - 2] + ";");
        }
        //Compile Code
        public async Task SendFight()
        {
            List<string> lines = System.IO.File.ReadAllLines("WriteLines.txt").ToList();
            //All 2 users need to submit the code.
            if (lines.Count != 2)
            {
                throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Message = "Code Lines Count not match" });
            }
            lines.Add("return target.ToString();");
            var codeSet = string.Join(" ", lines.ToArray());
            var compiledResult = _compiler.Complie(codeSet);
            File.WriteAllText("WriteLines.txt", "int target = 128;");  //initialize file content before next turn.
            await Clients.All.SendAsync("ReceiveFight", compiledResult);
        }

        public async Task SendHeartbeat(string content)
        {
            var username = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            this._status = content;
            LinesUserSubmitted = System.IO.File.ReadAllLines("WriteLines.txt").ToList().Count;
            await Clients.All.SendAsync("ReceiveHeartbeat", username + ":" + _status + ":"+ LinesUserSubmitted);
        }
    }
}