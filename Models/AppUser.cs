using System;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class AppUser:IdentityUser
    {
         public string DisplayName { get; set; }
    }
}