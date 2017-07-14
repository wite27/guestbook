using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        /// <summary>
        /// Returns filtered posts on concrete page.
        /// </summary>
        /// <param name="page">Number of page.</param>
        /// <param name="region">Field to search <paramref name="template"/> in. Use one of "title", "content" or "both".</param>
        /// <param name="template">Template for exact matching.</param>
        /// <returns>Posts on concrete page.</returns>
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

        /// <summary>
        /// Adds post with specified <paramref name="title"/> and <paramref name="content"/>
        /// </summary>
        /// <param name="title"></param>
        /// <param name="content"></param>
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

            Response.StatusCode = (int)HttpStatusCode.Created;
        }
    }
}
