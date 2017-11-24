using System.Threading;
using System.Threading.Tasks;
using TwitterFeed.Api.Model;

namespace TwitterFeed.Api.Http.Store
{
    public interface IHttpNewsFeedStore
    {
        /// <summary>
        /// Asynchronously retrieves <see cref="NewsFeed"/> information.
        /// </summary>
        /// <param name="cancellationToken">The optional token to monitor for cancellation requests.</param>
        /// <returns>A <see cref="Task{NewsFeed}"/> whose result yields the <see cref="NewsFeed"/> that contains the tweets.</returns>
        Task<NewsFeed> GetAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
