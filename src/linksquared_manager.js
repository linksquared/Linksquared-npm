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
   * @param {boolean} testEnvironment - Indicates if the environment is a test environment.
   * @param {Function} linkHandlingCallback - Callback function to handle Linksquared data.
   */
  constructor(APIKey, testEnvironment, linkHandlingCallback) {
    // Set API key and environment in the context
    LinksquaredContext.API_KEY = APIKey;
    LinksquaredContext.testEnvironment = testEnvironment;

    // Initialize callback for handling links
    this.linkHandlingCallback = linkHandlingCallback;
    // Initialize API service for making requests
    this.service = new LinksquaredAPIService();
    // Initialize event manager for handling events
    this.eventsManager = new LinksquaredEventsManager();
    // Authentication status
    this.authenticated = false;
    // Flag to determine if identifiers need updating
    this.shouldUpdateIdentifiers = false;
    // Initialize UI helper for UI interactions
    this.uiHelper = new LinksquaredUIHelper();
    // Array to store received data
    this.receivedData = [];
  }

  // MARK: Methods

  /**
   * Authenticates with the Linksquared API.
   * @param {Function} succesfullAuthenticatedCallback - Callback function invoked upon successful authentication.
   */
  authenticate(succesfullAuthenticatedCallback) {
    // Get the current device details
    let details = LinksquaredDeviceDetails.currentDetails();

    const self = this; // Preserve context for callbacks
    this.service.authenticateDevice(
      details,
      /**
       * Success callback for authentication.
       * @param {Object} response - The authentication response.
       */
      (response) => {
        // Extract relevant data from response
        let linksquaredID = response.linksquared;
        let identifier = response.sdk_identifier;
        let attributes = response.sdk_attributes;

        console.log("authenticate response: ", response);

        // Set Linksquared ID cookie for future use
        LinksquaredContext.setLinksquaredIDCookie(linksquaredID);

        // Update context attributes only if identifiers are not being updated
        if (!self.shouldUpdateIdentifiers) {
          LinksquaredContext.USER_ATTRIBUTES = identifier;
          LinksquaredContext.USER_IDENTIFIER = attributes;
        }

        // Mark as authenticated
        self.authenticated = true;

        // Call the success callback if provided
        if (succesfullAuthenticatedCallback) {
          succesfullAuthenticatedCallback();
        }

        // Handle data fetching and event flushing
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

    // Mark for identifier update if not authenticated
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

    // Mark for identifier update if not authenticated
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
    // Check if authenticated before creating a link
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

        // Error handling for link creation
        error(
          "You must configure the redirect rules in the Web interface first"
        );
      },
      error // Error callback for the service
    );
  }

  /**
   * Displays the messages list using the UI helper.
   */
  showMessagesList() {
    this.uiHelper.showMessagesList();
  }

  /**
   * Retrieves messages for the device.
   * @param {number} page - The page number for pagination.
   * @param {Function} response - Success callback for retrieving messages.
   * @param {Function} error - Error callback for retrieving messages.
   */
  getMessages(page, response, error) {
    this.service.messagesForDevice(page, response, error);
  }

  /**
   * Retrieves the number of unread messages.
   * @param {Function} response - Success callback for the number of unread messages.
   * @param {Function} error - Error callback for retrieving the count.
   */
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

  /**
   * Marks a message as read.
   * @param {Object} message - The message to mark as read.
   * @param {Function} response - Success callback for marking the message.
   * @param {Function} error - Error callback for marking the message.
   */
  markMessageAsRead(message, response, error) {
    this.service.markMessageAsViewed(message, response, error);
  }

  // MARK: Private

  /**
   * Displays automatic messages by fetching them from the service.
   * @private
   */
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
    // Check if a specific path is set
    if (linksquaredValue) {
      this.#handleLinksquaredValue(linksquaredValue);
    } else {
      this.#handleDataForDevice();
    }

    // Fetch automatic messages
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
    const self = this; // Preserve context for callbacks

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
      // Store received data and invoke callback
      this.receivedData.push(data);
      this.linkHandlingCallback(data);
    }
  }

  /**
   * Updates user attributes if authenticated.
   * @private
   */
  #updateUserAttributesIfNeeded() {
    if (!this.authenticated) {
      return; // Do nothing if not authenticated
    }

    const self = this; // Preserve context for callbacks
    this.service.setUserAttributes(
      (response) => {
        self.shouldUpdateIdentifiers = false; // Reset update flag
      },
      /**
       * Error callback for updating user attributes.
       * @param {Object} error - The error object.
       */
      (error) => {
        console.log("Linksquared -- could not set identifiers!");
      }
    );
  }
}

export default LinksquaredManager;
