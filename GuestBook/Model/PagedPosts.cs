using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuestBook.Model
{
    public class PagedPosts
    {
        public Post[] Posts { get; set; }
        public int Page { get; set; }
        public int TotalPages { get; }

        public PagedPosts(IEnumerable<Post> posts, int page)
        {
            Posts = posts
                .OrderByDescending(p => p.CreationTime)
                .Skip( (page-1) * 5)
                .Take(5)
                .ToArray();
            Page = page;
            TotalPages = (int)Math.Ceiling(posts.Count() / 5.0);
        }

        public PagedPosts()
        {
            Posts = new Post[] { };
            Page = 1;
            TotalPages = 1;
        }
    }
}
