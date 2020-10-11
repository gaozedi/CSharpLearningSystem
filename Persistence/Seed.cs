using System;
using System.Collections.Generic;
using System.Linq;
using Models;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
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
					////////////省略一部分/////////////////////////////////
                };

                context.TutorialUnits.AddRange(articles);
                context.SaveChanges();      //只执行一次，不需要async
            }
        }
    }
}