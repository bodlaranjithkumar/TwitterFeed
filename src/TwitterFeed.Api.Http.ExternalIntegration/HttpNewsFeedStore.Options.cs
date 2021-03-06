﻿namespace TwitterFeed.Api.Http.ExternalIntegration
{
    /// <summary>
    /// Represents the options used to configure an <see cref="HttpNewsFeedStoreOptions"/>.
    /// </summary>
    public class HttpNewsFeedStoreOptions
    {
        public string ScreenName { get; set; }
        public int? Count { get; set; }
        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }
        public string AccessToken { get; set; }
        public string AccessTokenSecret { get; set; }
    }
}
