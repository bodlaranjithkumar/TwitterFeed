// Inject fetch polyfill if fetch is unsuported by the user's browser
if (!window.fetch) { const fetch = require('whatwg-fetch'); } // eslint-disable-line

/**
 * Represents a the base FETCH configuration settings common to most GET requests.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch for more options.
 * @param {string} method - The HTTP method used to communicate to the API being requested.
 * @param {Object} headers - This HTTP Headers object that you want to send along with the request.
 **/
const baseOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

/**
 * This method is used to resolve the first promise that the FETCH method returns. Common things
 * that this method is used for: resolving successful/bad requests, resolving HTTP Status Codes, raising custom errors.
 * @param {Object} response - An HTTP response object. Could be undefined or null if the request was aborted for any reason.
 * @return {Object} - The Promise object for the HTTP call
 **/
function statusHelper(response) {
  if (response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.reject(new Error('Unable to complete data request.'));
}

/**
 * This is a wrapper function around the FETCH Promise. If additional processing is needed for the HTTP response, it should be done here.
 * @param {string} url - The URL used in the method request. Use this in combination with the toQueryString method.
 * @param {Object} options - The FETCH method HTTP options.
 * @return {void} - No return value
 **/
function callFetch(url, options) {
  return fetch(url, options)
    .then(statusHelper)
    .then(response => response.json())
    .catch(error => error)
    .then(data => data);
}

/**
 * This is a collection of shortcut methods you can use to call HTTP endpoints. By default you can supply the basic method options
 * and get basic operations for each type. This should be sufficient for most calls. If you need to supply overridden options or
 * you would like to change the base options, each convienence method has a overridden options parameter for you to use.
 *
 * There is also a convience method built into this object to do query string construction if you need it.
 **/
const api = {
  /**
   * This is a basic GET method call. It inherits the base options from this library and can be overridden to suit your needs.
   * @param {string} url - The URL used in the method request. Use this in combination with the toQueryString method.
   * @param {Object} [overriddenOptions] - Optional. Used to override the base options for the method. Any options passed in will override the defaults.
   * @return {Object} - The response object from the HTTP call. It will be in JSON format if successful.
   **/
  GET(url, overriddenOptions = {}) {
    return callFetch(url, Object.assign({}, baseOptions, overriddenOptions));
  },

  /**
   * This is a basic POST method call. It inherits the base options from this library and can be overridden to suit your needs.
   * @param {string} url - The URL used in the method request. Use this in combination with the toQueryString method.
   * @param {Object} payload - Used as the body payload for the method. It will be wrapped in a JSON.stringify() call.
   * @param {Object} [overriddenOptions] - Optional. Used to override the base options for the method. Any options passed in will override the defaults.
   * @return {Object} - The response object from the HTTP call. It will be in JSON format if successful.
   **/
  POST(url, payload, overriddenOptions = {}) {
    return callFetch(url, Object.assign({}, baseOptions, { method: 'POST', body: JSON.stringify(payload) }, overriddenOptions));
  },

  /**
   * This is a basic PUT method call. It inherits the base options from this library and can be overridden to suit your needs.
   * @param {string} url - The URL used in the method request. Use this in combination with the toQueryString method.
   * @param {Object} payload - Used as the body payload for the method. It will be wrapped in a JSON.stringify() call.
   * @param {Object} [overriddenOptions] - Optional. Used to override the base options for the method. Any options passed in will override the defaults.
   * @return {Object} - The response object from the HTTP call. It will be in JSON format if successful.
   **/
  PUT(url, payload, overriddenOptions = {}) {
    return callFetch(url, Object.assign({}, baseOptions, { method: 'PUT', body: JSON.stringify(payload) }, overriddenOptions));
  },

  /**
   * This is a basic PATCH method call. It inherits the base options from this library and can be overridden to suit your needs.
   * @param {string} url - The URL used in the method request. Use this in combination with the toQueryString method.
   * @param {Object} payload - Used as the body payload for the method. It will be wrapped in a JSON.stringify() call.
   * @param {Object} [overriddenOptions] - Optional. Used to override the base options for the method. Any options passed in will override the defaults.
   * @return {Object} - The response object from the HTTP call. It will be in JSON format if successful.
   **/
  PATCH(url, payload, overriddenOptions = {}) {
    return callFetch(url, Object.assign({}, baseOptions, { method: 'PATCH', body: JSON.stringify(payload) }, overriddenOptions));
  },

  /**
   * This is a basic DELETE method call. It inherits the base options from this library and can be overridden to suit your needs.
   * @param {string} url - The URL used in the method request. Use this in combination with the toQueryString method.
   * @param {Object} payload - Used as the body payload for the method. It will be wrapped in a JSON.stringify() call.
   * @param {Object} [overriddenOptions] - Optional. Used to override the base options for the method. Any options passed in will override the defaults.
   * @return {Object} - The response object from the HTTP call. It will be in JSON format if successful.
   **/
  DELETE(url, overriddenOptions = {}) {
    return callFetch(url, Object.assign({}, baseOptions, { method: 'DELETE' }, overriddenOptions));
  },

  /**
   * This method is used to construct a query string property for an URL. It takes in an a object of values and turns it into a query string.
   * @param {Object} obj - A one-level deep object that you want to turn into a query string. The key names will become the exact query string parameter names.
   * @return {string} - The query string portion of the URL made from the object that is passed in.
   **/
  toQueryString(obj) {
    const parts = [];
    Object.keys(obj).forEach((p) => {
      parts.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    });
    return parts.length > 0 ? parts.join('&') : '';
  },
};

export default api;
