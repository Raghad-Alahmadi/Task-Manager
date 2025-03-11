using Microsoft.EntityFrameworkCore;
using TaskModel = service.TaskAPI.Models.Task;


namespace service.TaskAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TaskModel> Tasks { get; set; }
    }

}
