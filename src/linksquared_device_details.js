// Define the LinksquaredDeviceDetails class
class LinksquaredDeviceDetails {
  /**
   * Get current device details.
   * @returns {Object} - Object containing user agent, app version, and build.
   */
  static currentDetails() {
    const userAgent = navigator.userAgent;

    // Initialize return values object
    const returnValues = {
      user_agent: userAgent,
      app_version: "0",
      build: "0",
    };

    return returnValues;
  }

  /**
   * Get the value of a cookie by name.
   * @param {string} cookieName - Name of the cookie to retrieve.
   * @returns {string|null} - Value of the cookie, or null if not found.
   */
  static getCookieValue(cookieName) {
    const cookies = document.cookie.split(";"); // Split cookies into an array
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("="); // Split each cookie into name and value
      if (name === cookieName) {
        return decodeURIComponent(value); // Return the decoded cookie value
      }
    }
    return null; // Return null if the cookie is not found
  }

  /**
   * Set a cookie with the given name and value.
   * @param {string} cookieName - Name of the cookie to set.
   * @param {string} cookieValue - Value to set for the cookie.
   */
  static setCookie(cookieName, cookieValue) {
    // Set expiration date to a far-future date
    const farFutureDate = new Date("9999-12-31");
    const expires = "expires=" + farFutureDate.toUTCString();

    // Set the cookie
    document.cookie =
      cookieName +
      "=" +
      encodeURIComponent(cookieValue) +
      ";" +
      expires +
      ";path=/";
  }

  /**
   * Get the value of the "linksquared" parameter from the current URL.
   * @returns {string|null} - Value of the "linksquared" parameter, or null if not found.
   */
  static getLinksquaredPath() {
    let urlWithoutFragment = window.location.href.split("#")[0];

    // Remove the trailing slash if it exists
    if (urlWithoutFragment.endsWith("/")) {
      urlWithoutFragment = urlWithoutFragment.slice(0, -1);
    }

    // Create a URL object with the cleaned URL
    const url = new URL(urlWithoutFragment);

    // Use URLSearchParams to get the 'linksquared' parameter
    const linksquaredValue = url.searchParams.get("linksquared");

    // Decode the parameter value, if it exists
    const decodedLinksquaredValue = linksquaredValue
      ? decodeURIComponent(linksquaredValue)
      : null;

    return decodedLinksquaredValue;
  }
}

// Export the LinksquaredDeviceDetails class
export default LinksquaredDeviceDetails;
