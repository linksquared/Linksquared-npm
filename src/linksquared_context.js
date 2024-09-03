// Import the LinksquaredDeviceDetails module
import LinksquaredDeviceDetails from "./linksquared_device_details";

// Define the LinksquaredContext class
class LinksquaredContext {
  // Static properties to store API key and Linksquared ID
  static API_KEY = null;

  static get LINKSQUARED_ID() {
    return LinksquaredDeviceDetails.getCookieValue("linksquared");
  }

  /**
   * Set Linksquared ID cookie.
   * @param {string} id - Linksquared ID to be stored in the cookie.
   */
  static setLinksquaredIDCookie(id) {
    LinksquaredDeviceDetails.setCookie("linksquared", id);
  }

  /**
   * Static property to store the user identifier.
   * @type {string|null}
   */
  static USER_IDENTIFIER = null;

  /**
   * Static property to store the user attributes.
   * @type {Object|null}
   */
  static USER_ATTRIBUTES = null;
}

// Export the LinksquaredContext class
export default LinksquaredContext;
