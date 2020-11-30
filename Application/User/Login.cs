using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Models;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using Application.Interfaces;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {

            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                this._jwtGenerator = jwtGenerator;
                this._signInManager = signInManager;
                this._userManager = userManager;

            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.Unauthorized);
                }
                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (result.Succeeded)
                {
                    // TO-DO: generate token
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreatToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                }
                throw new RestException(System.Net.HttpStatusCode.Unauthorized);
            }
        }

    }
}