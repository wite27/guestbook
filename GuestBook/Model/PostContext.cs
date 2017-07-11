using Microsoft.EntityFrameworkCore;

namespace GuestBook.Model
{
    public class PostContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        public PostContext(DbContextOptions<PostContext> options)
        : base(options)
        {
        
        }
    }
}
