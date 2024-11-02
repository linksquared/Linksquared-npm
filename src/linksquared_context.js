// Import the LinksquaredDeviceDetails module
import LinksquaredDeviceDetails from "./linksquared_device_details";

// Define the LinksquaredContext class
class LinksquaredContext {
  // Static properties to store API key and Linksquared ID
  /**
   * The API key used for authentication.
   * @type {string|null}
   */
  static API_KEY = null;

  /**
   * Indicates whether the application is running in a test environment.
   * @type {boolean}
   */
  static testEnvironment = false;

  static get LINKSQUARED_ID() {
    return LinksquaredDeviceDetails.getValue("linksquared");
  }

  /**
   * Set Linksquared ID cookie.
   * @param {string} id - Linksquared ID to be stored in the cookie.
   */
  static setLinksquaredIDCookie(id) {
    LinksquaredDeviceDetails.setValue("linksquared", id);
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
