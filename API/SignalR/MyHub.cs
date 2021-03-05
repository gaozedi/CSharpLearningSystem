using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.CompilationHelper;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MyHub : Hub
    {
        private readonly IMediator _mediator;
        public List<string> CodeSet = new List<string>();
        private string _status;
        private IMyCompiler _compiler;
        public MyHub(IMediator mediator, IMyCompiler compiler)
        {
            _mediator = mediator;
            _compiler = compiler;
        }
        //similar to API Controller
        public async Task SendSignal(string content)
        {
            var username = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            // this.CodeSet.Add(content);
            // command.Username = username;

            // var comment = await _mediator.Send(command);
            // //send to any clients connected to this ChatHub
            //var result = _compiler.Complie(CodeSet[0]);
            // var result = string.Join(" ", CodeSet.ToArray());
            using StreamWriter file = new StreamWriter("WriteLines.txt", append: true);
            await file.WriteLineAsync(content);
            await Clients.All.SendAsync("ReceiveSignal", username + ": " + content);
        }

        public async Task SendFight()
        {

            List<string> lines = System.IO.File.ReadAllLines("WriteLines.txt").ToList();
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
            // command.Username = username;

            // var comment = await _mediator.Send(command);
            // //send to any clients connected to this ChatHub
            await Clients.All.SendAsync("ReceiveHeartbeat", username + ": " + _status);
        }
    }
}