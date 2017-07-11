using System;

namespace GuestBook.Model
{
    public class Post
    {
        public Post()
        {
        }

        public Post(string title, string content)
        {
            this.Title = title;
            this.Content = content;
            this.CreationTime = DateTime.Now;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreationTime { get; set; }
    }
}