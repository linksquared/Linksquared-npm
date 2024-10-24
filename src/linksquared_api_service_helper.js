import LinksquaredContext from "./linksquared_context";

/**
 * Helper class for making API requests to Linksquared service.
 */
class LinksquaredAPIServiceHelper {
  // Endpoint URL for the Linksquared API
  static ENDPOINT = "https://sdk.sqd.link/api/v1/sdk";
  // static ENDPOINT = "http://sdk.lvh.me:3000/api/v1/sdk";

  /**
   * Constructor for LinksquaredAPIServiceHelper.
   * @param {string} APIKey - API key for accessing the Linksquared API.
   */
  constructor(APIKey) {
    this.APIKey = APIKey;
  }

  /**
   * Perform a POST request to the Linksquared API.
   * @param {string} path - API endpoint path.
   * @param {Object} data - Data to be sent in the request body.
   * @param {Function} success - Success callback function.
   * @param {Function} error - Error callback function.
   */
  POST(path, data, success, error) {
    const headers = this.buildHeaders();
    const endpoint = LinksquaredAPIServiceHelper.ENDPOINT + path;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, true);

    // Set request headers
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = xhr.responseText;
          success(JSON.parse(response));
        } else {
          error(xhr.statusText);
        }
      }
    };

    xhr.send(JSON.stringify(data));
  }

  GET(path, data, success, error) {
    const headers = this.buildHeaders();
    const endpoint = LinksquaredAPIServiceHelper.ENDPOINT + path;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);

    // Set request headers
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = xhr.responseText;
          success(JSON.parse(response));
        } else {
          error(xhr.statusText);
        }
      }
    };

    xhr.send(JSON.stringify(data));
  }

  /**
   * Build request headers for the API request.
   * @returns {Object} - Request headers.
   */
  buildHeaders() {
    const headers = {};
    headers["Content-Type"] = "application/json";
    headers["PLATFORM"] = "web";

    // Get identifier
    const { protocol, hostname, port } = window.location;
    const portPart = port ? `:${port}` : "";
    const fullURL = `${protocol}//${hostname}${portPart}`;

    // Add domain identifier header
    if (window && window.location) {
      headers["IDENTIFIER"] = fullURL;
    }

    // Add Linksquared ID header
    if (LinksquaredContext.LINKSQUARED_ID) {
      headers["LINKSQUARED"] = LinksquaredContext.LINKSQUARED_ID;
    }

    // Add API key header
    if (LinksquaredContext.API_KEY) {
      if (LinksquaredContext.testEnvironment) {
        headers["PROJECT_KEY"] = "test_" + LinksquaredContext.API_KEY;
      } else {
        headers["PROJECT_KEY"] = LinksquaredContext.API_KEY;
      }
    }

    return headers;
  }
}

export default LinksquaredAPIServiceHelper;
