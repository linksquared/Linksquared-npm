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
    const url = window.location.href;
    // Create a new URLSearchParams object with the URL string
    const params = new URLSearchParams(url.split("?")[1]);

    // Get the value of the "linksquared" parameter
    const linksquaredValue = params.get("linksquared");

    return linksquaredValue;
  }
}

// Export the LinksquaredDeviceDetails class
export default LinksquaredDeviceDetails;
