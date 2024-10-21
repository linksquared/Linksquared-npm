import LinksquaredManager from "./linksquared_manager.js";

/**
 * Entry point for the Linksquared SDK.
 * Provides methods to initialize and interact with the SDK.
 */
class Linksquared {
  /**
   * Creates an instance of the Linksquared SDK.
   * @param {string} APIKey - The API key for authentication.
   * @param {Function} linkHandlingCallback - Callback function to handle Linksquared data.
   */
  constructor(APIKey, linkHandlingCallback) {
    this.manager = new LinksquaredManager(APIKey, linkHandlingCallback);
  }

  /**
   * Starts the Linksquared SDK by authenticating with the API.
   * Optionally takes a callback that is called upon successful authentication.
   * @param {Function} [succesfullAuthenticatedCallback=null] - Callback to invoke on successful authentication.
   */
  start(succesfullAuthenticatedCallback = null) {
    this.manager.authenticate(succesfullAuthenticatedCallback);
  }

  /**
   * Creates a link with the Linksquared API.
   * @param {string} title - The title of the link.
   * @param {string} subtitle - The subtitle of the link.
   * @param {string} imageURL - The URL of the image associated with the link.
   * @param {Object} data - Additional data for the link.
   * @param {Function} success - Success callback for creating the link.
   * @param {Function} error - Error callback for creating the link.
   */
  createLink(title, subtitle, imageURL, data, success, error) {
    this.manager.createLink(title, subtitle, imageURL, data, success, error);
  }

  /**
   * Retrieves the user identifier from the manager.
   * @returns {string|null} The user identifier.
   */
  userIdentifier() {
    return this.manager.userIdentifier();
  }

  /**
   * Retrieves the user attributes from the manager.
   * @returns {Object|null} The user attributes.
   */
  userAttributes() {
    return this.manager.userAttributes();
  }

  /**
   * Sets the user identifier in the manager.
   * @param {string} identifier - The user identifier to set.
   * @returns {void}
   */
  setUserIdentifier(identifier) {
    this.manager.setUserIdentifier(identifier);
  }

  /**
   * Sets the user attributes in the manager.
   * @param {Object} attributes - A dictionary of user attributes to set.
   * @returns {void}
   */
  setUserAttributes(attributes) {
    this.manager.setUserAttributes(attributes);
  }

  /**
   * Checks if the SDK is authenticated.
   *
   * This method returns the authentication status of the SDK. It will return true if the
   * SDK is currently authenticated, and false otherwise.
   *
   * @returns {boolean} - The authentication status of the manager.
   */
  authenticated() {
    return this.manager.authenticated;
  }
  /**
   * Displays the messages list using the manager.
   * This method triggers the display of the messages list in the UI.
   * @returns {void}
   */
  showMessagesList() {
    this.manager.showMessagesList();
  }

  /**
   * Retrieves messages for a specific page using the manager.
   * @param {number} page - The page number to retrieve messages from.
   * @param {Function} response - Callback to handle the retrieved messages.
   * @param {Function} error - Callback to handle any errors during retrieval.
   * @returns {void}
   */
  getMessages(page, response, error) {
    this.manager.getMessages(page, response, error);
  }

  /**
   * Retrieves the number of unread messages using the manager.
   * @param {Function} response - Callback to handle the count of unread messages.
   * @param {Function} error - Callback to handle any errors during retrieval.
   * @returns {void}
   */
  getNumberOfUnreadMessages(response, error) {
    this.manager.getNumberOfUnreadMessages(response, error);
  }
}

export default Linksquared;
