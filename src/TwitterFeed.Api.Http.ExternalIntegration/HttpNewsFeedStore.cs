using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using TwitterFeed.Api.Http.Store;
using System.Threading;
using System.Threading.Tasks;
using TwitterFeed.Api.Model;
using TweetSharp;
using System.Linq;

namespace TwitterFeed.Api.Http.ExternalIntegration
{
    public class HttpNewsFeedStore : IHttpNewsFeedStore
    {
        private readonly ILogger<HttpNewsFeedStore> _logger;
        private readonly IOptions<HttpNewsFeedStoreOptions> _options;

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpNewsFeedStore"/> class.
        /// </summary>
        /// <param name="logger">The logger used to write diagnostic information.</param>
        /// <param name="options">The options used to configure the store.</param>
        public HttpNewsFeedStore(ILogger<HttpNewsFeedStore> logger, IOptions<HttpNewsFeedStoreOptions> options)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _options = options ?? throw new ArgumentNullException(nameof(options));
        }

        /// <summary>
        /// Asynchronously retrieves <see cref="NewsFeed"/> information.
        /// </summary>
        /// <param name="cancellationToken">The optional token to monitor for cancellation requests.</param>
        /// <returns>A <see cref="Task{NewsFeed}"/> whose result yields the <see cref="NewsFeed"/> that contains the tweets.</returns>
        public async Task<NewsFeed> GetAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            try
            {
                TwitterService service = new TwitterService(_options.Value.ConsumerKey, _options.Value.ConsumerSecret);
                service.AuthenticateWith(_options.Value.AccessToken, _options.Value.AccessTokenSecret);
                var options = new ListTweetsOnUserTimelineOptions
                {
                    TweetMode = TweetMode.Extended,
                    ScreenName = _options.Value.ScreenName,
                    Count = _options.Value.Count
                };

                var result = await service.ListTweetsOnUserTimelineAsync(options);
                var twitterStatuses = result.Value.ToList();

                var newsFeed = new NewsFeed
                {
                    User = twitterStatuses.Select(t => new User()
                    {
                        Name = t.User.Name,
                        ScreenName = t.User.ScreenName,
                        ProfileImageUrl = t.User.ProfileImageUrl
                    }).FirstOrDefault(),

                    Tweets = twitterStatuses.Select(t => new Tweet()
                    {
                        Id = t.Id,
                        CreatedDate = t.CreatedDate,
                        Content = t.FullText,
                        RetweetCount = t.RetweetCount,
                        Images = t.ExtendedEntities?.Media  // Null propagation.
                                        .Where(e => e.ExtendedEntityType == TwitterMediaType.Photo)
                                        .Select(e => e.MediaUrlHttps)
                                        .ToList()
                    }).ToList()
                };

                return newsFeed;

            }
            catch (Exception exception)
            {
                _logger.LogError($"Unable to fetch the feed. Exception: {exception}");
                throw exception;
            }
        }
    }
}
