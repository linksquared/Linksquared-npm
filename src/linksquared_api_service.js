// Import the helper class for making API requests
import LinksquaredAPIServiceHelper from "./linksquared_api_service_helper";
import LinksquaredContext from "./linksquared_context";

// Define the Linksquared API service class
class LinksquaredAPIService {
  // Define endpoint paths as static properties
  static ENDPOINTS = {
    AUTHENTICATE: "/authenticate",
    PAYLOAD: "/data_for_device",
    CREATE_EVENT: "/event",
    CREATE_LINK: "/create_link",
    USER_ATTRIBUTES: "/visitor_attributes",
    PAYLOAD_FOR_DEVICE_AND_PATH: "/data_for_device_and_path",
    NOTIFICATIONS_FOR_DEVICE: "/notifications_for_device",
    MARK_NOTIFICATION_AS_READ: "/mark_notification_as_read",
    NOTIFICATIONS_TO_DISPLAY_AUTOMATICALLY:
      "/notifications_to_display_automatically",
    NUMBER_OF_UNREAD_MESSAGES: "/number_of_unread_notifications",
  };

  // Constructor to initialize the API service helper
  constructor() {
    this.apiService = new LinksquaredAPIServiceHelper();
  }

  // Method to authenticate a device
  authenticateDevice(details, response, error) {
    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.AUTHENTICATE,
      details,
      response,
      error
    );
  }

  // Method to fetch payload for a device
  payloadForDevice(details, response, error) {
    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.PAYLOAD,
      details,
      response,
      error
    );
  }

  // Method to fetch payload for a device and path
  payloadForDeviceAndPath(details, path, response, error) {
    const dataToSend = { ...details, path };
    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.PAYLOAD_FOR_DEVICE_AND_PATH,
      dataToSend,
      response,
      error
    );
  }

  // Method to create an event
  createEvent(event, createdAt, path, engagementTime, response, error) {
    const data = { event };
    if (path) data.path = path;
    if (engagementTime) data.engagement_time = engagementTime;

    const isoDate = new Date(createdAt).toISOString();
    data.created_at = isoDate;

    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.CREATE_EVENT,
      data,
      response,
      error
    );
  }

  // Method to create a link
  createLink(title, subtitle, imageUrl, data, response, error) {
    const dataToSend = {};
    if (title) dataToSend.title = title;
    if (subtitle) dataToSend.subtitle = subtitle;
    if (imageUrl) dataToSend.image_url = imageUrl;
    if (data) dataToSend.data = JSON.stringify(data);

    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.CREATE_LINK,
      dataToSend,
      response,
      error
    );
  }

  // Method to set attributes
  setUserAttributes(response, error) {
    const dataToSend = {};
    dataToSend.sdk_identifier = LinksquaredContext.USER_IDENTIFIER;
    if (LinksquaredContext.USER_ATTRIBUTES) {
      dataToSend.sdk_attributes = LinksquaredContext.USER_ATTRIBUTES;
    }

    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.USER_ATTRIBUTES,
      dataToSend,
      response,
      error
    );
  }

  messagesForDevice(page, response, error) {
    const dataToSend = { page: page };

    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.NOTIFICATIONS_FOR_DEVICE,
      dataToSend,
      response,
      error
    );
  }

  markMessageAsViewed(message, response, error) {
    const dataToSend = { id: message.id };
    this.apiService.POST(
      LinksquaredAPIService.ENDPOINTS.MARK_NOTIFICATION_AS_READ,
      dataToSend,
      response,
      error
    );
  }

  messagesForAutomaticDisplay(response, error) {
    this.apiService.GET(
      LinksquaredAPIService.ENDPOINTS.NOTIFICATIONS_TO_DISPLAY_AUTOMATICALLY,
      null,
      response,
      error
    );
  }

  numberOfUnreadMessages(response, error) {
    this.apiService.GET(
      LinksquaredAPIService.ENDPOINTS.NUMBER_OF_UNREAD_MESSAGES,
      null,
      response,
      error
    );
  }
}

// Export the LinksquaredAPIService class
export default LinksquaredAPIService;
