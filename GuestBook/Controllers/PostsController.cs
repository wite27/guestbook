using System.Collections.Generic;
using System.Linq;
using GuestBook.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GuestBook.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private readonly PostContext _context;

        public PostsController(PostContext context)
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
        //[HttpGet]
        public IActionResult Filter(bool title, bool content, string template)
        {
            return Json(_context.Posts
                .Where(p => title && p.Title.Contains(template) || 
                            content && p.Content.Contains(template))
                .ToArray());
        }


        public void Put(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
        }
    }
}
