using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using TwitterFeed.Api.Http.Store;
using TwitterFeed.Api.Model;

namespace TwitterFeed.Api.Http.Controllers
{
    /// <summary>
    /// Represents an API controller that provides a uniform HTTP interface for retrieving news feed.
    /// </summary>
    [Route("feed")]
    public class NewsFeedController : Controller
    {
        private readonly IHttpNewsFeedStore _httpNewsFeedStore;
        private readonly ILogger<NewsFeedController> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="NewsFeedController"/> class.
        /// </summary>
        /// <param name="httpNewsFeedStore">The repository used to store and retrieve resources.</param>
        /// <param name="logger">The logger used to write diagnostic information.</param>
        public NewsFeedController(IHttpNewsFeedStore httpNewsFeedStore, ILogger<NewsFeedController> logger)
        {
            _httpNewsFeedStore = httpNewsFeedStore ?? throw new ArgumentNullException(nameof(httpNewsFeedStore));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Asynchronously retrieves <see cref="NewsFeed"/> information.
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> whose result yields the <see cref="IActionResult"/> to the <see cref="ControllerBase.Request"/>.</returns>
        [HttpGet, Route("")]
        [ProducesResponseType(typeof(NewsFeed), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var newsFeed = await _httpNewsFeedStore.GetAsync(HttpContext.RequestAborted);

                return Ok(newsFeed);
            }
            catch (Exception exception)
            {
                _logger.LogError($"News feed retrieval failed. Exception : {exception}");
                throw;
            }
        }
    }
}
