// Import necessary modules
import LinksquaredAPIService from "./linksquared_api_service.js";
import LinksquaredDeviceDetails from "./linksquared_device_details.js";

/**
 * Represents an event.
 */
class Event {
  /**
   * Constructs an Event instance.
   * @param {string} type - The type of the event.
   * @param {number} createdAt - The timestamp when the event occurred.
   * @param {string|null} [path=null] - The path associated with the event.
   * @param {number|null} [engagementTime=null] - The engagement time for the event.
   */
  constructor(type, createdAt, path = null, engagementTime = null) {
    this.type = type;
    this.createdAt = createdAt;
    this.path = path;
    this.engagementTime = engagementTime;
  }
}

/**
 * Manages the storage of events.
 */
class EventsStorage {
  /**
   * Constructs an EventsStorage instance.
   * Loads events from localStorage or initializes as an empty array.
   */
  constructor() {
    this.events = JSON.parse(localStorage.getItem("linksquared-events")) || [];
  }

  /**
   * Get all stored events.
   * @returns {Array} All stored events.
   */
  getEvents() {
    return this.events;
  }

  /**
   * Store events to localStorage.
   */
  storeEventsLocally() {
    localStorage.setItem("linksquared-events", JSON.stringify(this.events));
  }

  /**
   * Store a single event.
   * @param {Event} event - The event to store.
   */
  storeEvent(event) {
    this.events.push(event);
    this.storeEventsLocally();
  }

  /**
   * Store multiple events.
   * @param {Array<Event>} events - Array of events to store.
   */
  storeEvents(events) {
    this.events.push(...events);
    this.storeEventsLocally();
  }

  /**
   * Delete an event by object reference.
   * @param {Event} eventToDelete - The event to delete.
   */
  deleteEvent(eventToDelete) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.storeEventsLocally();
  }

  /**
   * Get and remove all events.
   * @returns {Array} All stored events.
   */
  getAndRemoveAllEvents() {
    const eventsToReturn = this.events;
    this.events = [];
    this.storeEventsLocally();
    return eventsToReturn;
  }

  /**
   * Set timestamp to localStorage.
   * @param {number} timestamp - The timestamp to set.
   */
  setTimestamp(timestamp) {
    localStorage.setItem(
      "linksquared-events-timestamp",
      JSON.stringify(timestamp)
    );
  }

  /**
   * Get timestamp from localStorage.
   * @returns {number|null} The timestamp from localStorage.
   */
  getTimestamp() {
    const storedTimestamp = localStorage.getItem(
      "linksquared-events-timestamp"
    );
    return storedTimestamp ? JSON.parse(storedTimestamp) : null;
  }
}

/**
 * Manages events and their handling.
 */
class LinksquaredEventsManager {
  /**
   * Constructs a LinksquaredEventsManager instance.
   * Initializes Linksquared API service, EventsStorage, and lastTimestamp.
   */
  constructor() {
    this.service = new LinksquaredAPIService();
    this.eventsStorage = new EventsStorage();
    this.lastTimestamp = Date.now();

    const storedTimestamp = this.eventsStorage.getTimestamp();
    if (storedTimestamp) {
      this.setTimeSpent();
      this.lastTimestamp = storedTimestamp;
    }

    this.eventsStorage.setTimestamp(this.lastTimestamp);
    this.handleFocus();
  }

  /**
   * Flush events.
   */
  flushEvents() {
    this.flushEvents();
  }

  /**
   * Add event.
   * @param {string} type - The type of the event.
   */
  addEvent(type) {
    const event = new Event(
      type,
      Date.now(),
      LinksquaredDeviceDetails.getLinksquaredPath(),
      null
    );
    this.eventsStorage.storeEvent(event);
  }

  /**
   * Add event and flush.
   * @param {string} type - The type of the event.
   */
  addEventWithFlush(type) {
    this.addEvent(type);
    this.flushEvents();
  }

  /**
   * Handle focus event.
   * @private
   */
  handleFocus() {
    const self = this;
    window.addEventListener("focus", function () {
      self.setTimeSpent();
    });
  }

  /**
   * Set time spent on page.
   * @private
   */
  setTimeSpent() {
    const storedTimestamp = this.eventsStorage.getTimestamp();
    if (storedTimestamp) {
      const currentTimestamp = Date.now();
      const differenceInMilliseconds = Math.abs(
        currentTimestamp - this.lastTimestamp
      );
      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      this.setSecondsToEvents(differenceInSeconds);
      this.eventsStorage.setTimestamp(null);
    }
  }

  /**
   * Set seconds to events.
   * @param {number} seconds - The seconds to set.
   * @private
   */
  setSecondsToEvents(seconds) {
    const events = this.eventsStorage.getAndRemoveAllEvents();
    events.forEach((event) => {
      if (event.engagementTime == null) {
        event.engagementTime = seconds;
      }
    });
    this.eventsStorage.storeEvents(events);
  }

  /**
   * Flush events.
   * @private
   */
  flushEvents() {
    this.setPathIfNeeded();
    const events = this.eventsStorage.getEvents();
    events.forEach((event) => {
      this.sendAndDeleteEvent(event);
    });
  }

  /**
   * Set path if needed.
   * @private
   */
  setPathIfNeeded() {
    const path = LinksquaredDeviceDetails.getLinksquaredPath();
    if (!path) {
      return;
    }
    const events = this.eventsStorage.getAndRemoveAllEvents();
    events.forEach((event) => {
      if (event.path == null) {
        event.path = path;
      }
    });
    this.eventsStorage.storeEvents(events);
  }

  /**
   * Send and delete event.
   * @param {Event} event - The event to send and delete.
   * @private
   */
  sendAndDeleteEvent(event) {
    const self = this;
    this.service.createEvent(
      event.type,
      event.createdAt,
      event.path,
      event.engagementTime,
      (response) => {
        self.eventsStorage.deleteEvent(event);
      },
      (error) => {
        // Handle error if needed
      }
    );
  }
}

export default LinksquaredEventsManager;
