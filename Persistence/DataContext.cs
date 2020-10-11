using System;
using Microsoft.EntityFrameworkCore;
using Models;
namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TutorialUnit> TutorialUnits { get; set; }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     builder.Entity<Article>()
        //         .HasData(
        //             new Article { Id = 1, Content = "Value 101" },
        //             new Article { Id = 2, Content = "Value 102" },
        //             new Article { Id = 3, Content = "Value 103" }
        //         );
        // }
    }
}
