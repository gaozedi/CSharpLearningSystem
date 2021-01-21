using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using System;
using FluentValidation;
using Application.Interfaces;
using Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;

namespace Application.User
{
    public class Register
    {
        // return the user so that user can be logged in after regirstration.
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManage;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, UserManager<AppUser> userManage, IJwtGenerator jwtGenerator)
            {
                this._context = context;
                this._userManage = userManage;
                this._jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                }
                if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Username = "Username already exists" });
                };

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username
                };

                var result = await _userManage.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreatToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}