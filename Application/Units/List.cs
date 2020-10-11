using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TutorialUnits
{
    public class List
    {
        //we want to have List<Activity> be returned
        public class Query:IRequest<List<TutorialUnit>>{

              //inject data context
        }   

        //generic parameter: 1.our query 2. what we want to be returned from that query.
        public class Handler : IRequestHandler<Query, List<TutorialUnit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<List<TutorialUnit>> Handle(Query request, CancellationToken cancellationToken)
            {
                var units = await _context.TutorialUnits.ToListAsync();
                
                return units;
            }
        }
    }
}