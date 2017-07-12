using System;
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
        public PagedPosts Get(int page = 1, string region = "", string template = "")
        {
            if (String.IsNullOrEmpty(template))
                return new PagedPosts(_context.Posts, page);

            var title = region == "title" || region == "both";
            var content = region == "content" || region == "both";
            if (!(title || content))
                return new PagedPosts();

            return new PagedPosts(Filter(title, content, template), page);
        }

        private IEnumerable<Post> Filter(bool title, bool content, string template)
        {
            return _context.Posts
                .Where(p => title && p.Title.Contains(template) || 
                            content && p.Content.Contains(template));
        }

        [HttpPost]
        public void Post(string title, string content)
        {
            if (title != null && content != null)
            {
                Post(new Post(title, content));
            }
        }
        private void Post(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
        }
    }
}
