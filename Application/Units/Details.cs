using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

using Models;
using MediatR;
using Persistence;

namespace Application.TutorialUnits
{
    public class Details
    {
        //we want to have List<Activity> be returned
        public class Query:IRequest<TutorialUnit>{


              // we want to specify the id of activity that we want to get back,so we have this property
              public int Id { get; set; }
        }   

        //generic para: our query, what we want to be returned from that query.
        public class Handler : IRequestHandler<Query, TutorialUnit>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<TutorialUnit> Handle(Query request, CancellationToken cancellationToken)
            {

                var activity = await _context.TutorialUnits.FindAsync(request.Id);
                if (activity==null)
                {
                    //  throw new Exception("Could not find activity");
                    //use the RestException we created
                    throw new Exception("server error from Details.cs");
                }
                
                return activity;
            }
        }
    }
}