using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace GuestBook.Model
{
    public static class SamplePostData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<PostContext>();
            if (!context.Posts.Any())
            {
                context.Posts.AddRange(
                    new Post("First", "Some content there.."),
                    new Post("Second", "Another content there.."),
                    new Post("Third", "Another amazing content there..")
                    );
                context.SaveChanges();
            }
        }
    }
}
