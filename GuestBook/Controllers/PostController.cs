using System.Collections.Generic;
using System.Linq;
using GuestBook.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GuestBook.Controllers
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly PostContext _context;

        public PostController(PostContext context)
        {
            this._context = context;
        }

        // GET: api/posts
        [HttpGet]
        public Post[] Get()
        {
            return _context.Posts.ToArray();
        }

        // Filtered posts
        [HttpGet]
        public Post[] Get(bool title, bool content, string template)
        {
            return _context.Posts
                .Where(p => title && p.Title.Contains(template) || 
                            content && p.Content.Contains(template))
                .ToArray();
        }


        public void Put(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }
    }
}
