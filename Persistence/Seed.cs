using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Models;
using Microsoft.AspNetCore.Identity;
namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,UserManager<AppUser> userManager)
        {

                        //if there're no users
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{
                        DisplayName = "Leslie",
                        UserName ="leslie",
                        Email ="a@a.com"
                    },
                    new AppUser{
                        DisplayName = "Tom",
                        UserName ="tom",
                        Email ="tom@test.com"
                    },
                    new AppUser{
                        DisplayName = "Jane",
                        UserName ="jane",
                        Email ="jane@test.com"
                    },
                };
                foreach (var user in users)
                {
                    //create a user automatically, we don't need to save changes in DataContext
                   await userManager.CreateAsync(user,"Pa$$w0rd");
                }
            }

            if (!context.TutorialUnits.Any())      // if we don't have any activities
            {
                var articles = new List<TutorialUnit>{

                    new TutorialUnit
                    {
                        Content="this is tutorial of C# learning. 1"
                    },
                    new TutorialUnit
                    {
                       Content="this is tutorial of C# learning. 2"
                    },

                };

                context.TutorialUnits.AddRange(articles);
                context.SaveChanges();      //只执行一次，不需要async
            }
        }
    }
}