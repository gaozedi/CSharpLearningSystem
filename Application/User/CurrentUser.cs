using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            //1. Inject necessary services
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._userManager = userManager;
                this._jwtGenerator = jwtGenerator;
            }
            
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
                if (user == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.Unauthorized);
                }
                // Use the service in handler
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreatToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                
                throw new RestException(System.Net.HttpStatusCode.Unauthorized);

            }
        }
    }
}