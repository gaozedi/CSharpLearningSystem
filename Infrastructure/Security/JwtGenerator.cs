using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {   private readonly SymmetricSecurityKey _key;
        public JwtGenerator(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreatToken(AppUser user)
        {
            //build up the token
            //The claims of the token
            var claims  = new List<Claim>{
                //add Username as NameId inside token we send back
                //as our request comes in the API, we'll able to get the username from the token,then make use of it.
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };
            
            //strongest algorithm HmacSha512Signature
            var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        
    }
}