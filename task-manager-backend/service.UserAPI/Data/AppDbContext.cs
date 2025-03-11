using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using service.UserAPI.Models;

namespace service.UserAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}