import LinksquaredAPIService from "./linksquared_api_service.js";
import LinksquaredEventsManager from "./linksquared_events_manager.js";
import LinksquaredContext from "./linksquared_context.js";
import LinksquaredDeviceDetails from "./linksquared_device_details.js";
import LinksquaredUIHelper from "./linksquared_ui_helper.js";

/**
 * Manages interactions with the Linksquared API and event handling.
 */
class LinksquaredManager {
  /**
   * Creates an instance of LinksquaredManager.
   * @param {string} APIKey - The API key for authentication.
   * @param {Function} linkHandlingCallback - Callback function to handle Linksquared data.
   */
  constructor(APIKey, linkHandlingCallback) {
    LinksquaredContext.API_KEY = APIKey;

    this.linkHandlingCallback = linkHandlingCallback;
    this.service = new LinksquaredAPIService();
    this.eventsManager = new LinksquaredEventsManager();
    this.authenticated = false;
    this.shouldUpdateIdentifiers = false;
    this.uiHelper = new LinksquaredUIHelper();
    this.receivedData = [];
  }

  // MARK: Methods

  /**
   * Authenticates with the Linksquared API.
   */
  authenticate(succesfullAuthenticatedCallback) {
    let details = LinksquaredDeviceDetails.currentDetails();

    const self = this;
    this.service.authenticateDevice(
      details,
      /**
       * Success callback for authentication.
       * @param {Object} response - The authentication response.
       */
      (response) => {
        let linksquaredID = response.linksquared;
        let identifier = response.sdk_identifier;
        let attributes = response.sdk_attributes;

        console.log("authenticate response: ", response);

        LinksquaredContext.setLinksquaredIDCookie(linksquaredID);

        if (!self.shouldUpdateIdentifiers) {
          LinksquaredContext.USER_ATTRIBUTES = identifier;
          LinksquaredContext.USER_IDENTIFIER = attributes;
        }

        self.authenticated = true;

        if (succesfullAuthenticatedCallback) {
          succesfullAuthenticatedCallback();
        }
        self.#handleFetchData();
        self.#updateUserAttributesIfNeeded();
        self.eventsManager.flushEvents();
      },
      /**
       * Error callback for authentication.
       * @param {Object} error - The authentication error.
       */
      (error) => {
        console.log(error);
        console.log("Linksquared - wrong credentials, the SDK will NOT work!");
      }
    );
  }

  /**
   * Sets the user identifier.
   * @param {string} identifier - The user identifier.
   */
  setUserIdentifier(identifier) {
    LinksquaredContext.USER_IDENTIFIER = identifier;

    if (!this.authenticated) {
      this.shouldUpdateIdentifiers = true;
    }

    this.#updateUserAttributesIfNeeded();
  }

  /**
   * Sets the user attributes.
   * @param {Object} attributes - A dictionary of user attributes.
   */
  setUserAttributes(attributes) {
    LinksquaredContext.USER_ATTRIBUTES = attributes;

    if (!this.authenticated) {
      this.shouldUpdateIdentifiers = true;
    }

    this.#updateUserAttributesIfNeeded();
  }

  /**
   * Retrieves the user identifier from the LinksquaredContext.
   * @returns {string|null} The user identifier. Null if not authenticated.
   */
  userIdentifier() {
    return LinksquaredContext.USER_IDENTIFIER;
  }

  /**
   * Retrieves the user attributes from the LinksquaredContext.
   * @returns {Object|null} The user attributes. Null if not authenticated.
   */
  userAttributes() {
    return LinksquaredContext.USER_ATTRIBUTES;
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
    if (!this.authenticated) {
      error("The linksquared SDK is not yet initialized, try again later!");
    }

    this.service.createLink(
      title,
      subtitle,
      imageURL,
      data,
      /**
       * Success callback for creating the link.
       * @param {Object} response - The response from creating the link.
       */
      (response) => {
        if (response.link) {
          success(response.link);
          return;
        }

        error(
          "You must configure the redirect rules in the Web interface first"
        );
      },
      error
    );
  }

  showMessagesList() {
    this.uiHelper.showMessagesList();
  }

  getMessages(page, response, error) {
    this.service.messagesForDevice(page, response, error);
  }

  getNumberOfUnreadMessages(response, error) {
    this.service.numberOfUnreadMessages(response, error);
  }

  /**
   * Returns all the received data.
   * @returns {Array} Array of all received data objects.
   */
  getAllReceivedData() {
    return this.receivedData;
  }

  markMessageAsRead(message, response, error) {
    this.service.markMessageAsViewed(message, response, error);
  }

  // MARK: Private

  #displayAutomaticMessages() {
    this.service.messagesForAutomaticDisplay(
      (response) => {
        const notifications = response.notifications;
        notifications.forEach((item) => {
          this.uiHelper.openPage(item);
        });
      },
      (error) => {
        console.log("Linksquared -- could not get automatic notifications!");
      }
    );
  }

  /**
   * Handles fetching data from Linksquared API.
   * Determines whether to fetch data for the current device or a specific path.
   * @private
   */
  #handleFetchData() {
    const linksquaredValue = LinksquaredDeviceDetails.getLinksquaredPath();
    if (linksquaredValue) {
      this.#handleLinksquaredValue(linksquaredValue);
    } else {
      this.#handleDataForDevice();
    }

    this.#displayAutomaticMessages();
  }

  /**
   * Handles fetching data for a specific path from Linksquared API.
   * @param {string} path - The path for which to fetch data.
   * @private
   */
  #handleLinksquaredValue(path) {
    let details = LinksquaredDeviceDetails.currentDetails();

    this.service.payloadForDeviceAndPath(
      details,
      path,
      /**
       * Success callback for fetching data for a specific path.
       * @param {Object} response - The response data.
       */
      (response) => {
        this.#handleDataReceived(response.data);
      },
      /**
       * Error callback for fetching data for a specific path.
       * @param {Object} error - The error object.
       */
      (error) => {
        console.log("Linksquared -- could not fetch data!");
      }
    );
  }

  /**
   * Handles fetching data for the current device from Linksquared API.
   * @private
   */
  #handleDataForDevice() {
    let details = LinksquaredDeviceDetails.currentDetails();
    const self = this;

    this.service.payloadForDevice(
      details,
      /**
       * Success callback for fetching data for the current device.
       * @param {Object} response - The response data.
       */
      (response) => {
        self.#handleDataReceived(response.data);
      },
      /**
       * Error callback for fetching data for the current device.
       * @param {Object} error - The error object.
       */
      (error) => {
        console.log("Linksquared -- could not fetch data!");
      }
    );
  }

  /**
   * Handles received data from Linksquared API.
   * @param {Object} data - The received data.
   * @private
   */
  #handleDataReceived(data) {
    if (data) {
      this.receivedData.push(data);
      this.linkHandlingCallback(data);
    }
  }

  #updateUserAttributesIfNeeded() {
    if (!this.authenticated) {
      return;
    }

    const self = this;
    this.service.setUserAttributes(
      (response) => {
        self.shouldUpdateIdentifiers = false;
      },
      /**
       * Error callback for fetching data for the current device.
       * @param {Object} error - The error object.
       */
      (error) => {
        console.log("Linksquared -- could not set identifiers!");
      }
    );
  }
}

export default LinksquaredManager;
