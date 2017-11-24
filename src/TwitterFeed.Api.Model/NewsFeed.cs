using System;
using System.Collections.Generic;

namespace TwitterFeed.Api.Model
{
    public class NewsFeed
    {
        public User User { get; set; }
        public IList<Tweet> Tweets { get; set; }
    }

    public class User
    {
        public string Name { get; set; }
        public string ScreenName { get; set; }
        public string ProfileImageUrl { get; set; }
    }

    public class Tweet
    {
        public long Id { get; set; }
        public string Content { get; set; }
        public IList<Uri> Images { get; set; }
        public int RetweetCount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
