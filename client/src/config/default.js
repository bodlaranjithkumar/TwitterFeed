const productionConfig = {
  twitterFeedApi: 'http://twitterfeed.azurewebsites.com',
};

const developmentConfig = {
  twitterFeedApi: 'http://localhost:29486',
};

function config() {
  if (typeof window !== 'undefined') {
      // console.log('Application is running in the context of a browser...');
    if (window.location.hostname === 'twitterfeed.azurewebsites.com') {
      // Application is running in production
      // console.log('Application is running in production');
      return productionConfig;
    }

    // Application is running in development/localhost
    // console.log('Application is running in development/localhost');
    return developmentConfig;
  }
  // Application is not running in the browser
  // TODO: Could check Node ENV here. Needs testing.
  // console.log('Application is falling back to development context...');
  return developmentConfig;
}

export default config();
