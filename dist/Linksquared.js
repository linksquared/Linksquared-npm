/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Linksquared"] = factory();
	else
		root["Linksquared"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared.js */ \"./src/linksquared.js\");\n// Import the Linksquared class from linksquared.js\n\n\n// Re-export the Linksquared class to make it available to users of your library\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_linksquared_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack://Linksquared/./src/index.js?");

/***/ }),

/***/ "./src/linksquared.js":
/*!****************************!*\
  !*** ./src/linksquared.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared_manager.js */ \"./src/linksquared_manager.js\");\n\n\n/**\n * Entry point for the Linksquared SDK.\n * Provides methods to initialize and interact with the SDK.\n */\nclass Linksquared {\n  /**\n   * Creates an instance of the Linksquared SDK.\n   * @param {string} APIKey - The API key for authentication.\n   * @param {Function} linkHandlingCallback - Callback function to handle Linksquared data.\n   */\n  constructor(APIKey, linkHandlingCallback) {\n    this.manager = new _linksquared_manager_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](APIKey, linkHandlingCallback);\n  }\n\n  /**\n   * Starts the Linksquared SDK by authenticating with the API.\n   */\n  start() {\n    this.manager.authenticate();\n  }\n\n  /**\n   * Creates a link with the Linksquared API.\n   * @param {string} title - The title of the link.\n   * @param {string} subtitle - The subtitle of the link.\n   * @param {string} imageURL - The URL of the image associated with the link.\n   * @param {Object} data - Additional data for the link.\n   * @param {Function} success - Success callback for creating the link.\n   * @param {Function} error - Error callback for creating the link.\n   */\n  createLink(title, subtitle, imageURL, data, success, error) {\n    this.manager.createLink(title, subtitle, imageURL, data, success, error);\n  }\n\n  /**\n   * Retrieves the user identifier from the manager.\n   * @returns {string|null} The user identifier.\n   */\n  userIdentifier() {\n    return this.manager.userIdentifier();\n  }\n\n  /**\n   * Retrieves the user attributes from the manager.\n   * @returns {Object|null} The user attributes.\n   */\n  userAttributes() {\n    return this.manager.userAttributes();\n  }\n\n  /**\n   * Sets the user identifier in the manager.\n   * @param {string} identifier - The user identifier to set.\n   * @returns {void}\n   */\n  setUserIdentifier(identifier) {\n    this.manager.setUserIdentifier(identifier);\n  }\n\n  /**\n   * Sets the user attributes in the manager.\n   * @param {Object} attributes - A dictionary of user attributes to set.\n   * @returns {void}\n   */\n  setUserAttributes(attributes) {\n    this.manager.setUserAttributes(attributes);\n  }\n\n  /**\n   * Checks if the SDK is authenticated.\n   *\n   * This method returns the authentication status of the SDK. It will return true if the\n   * SDK is currently authenticated, and false otherwise.\n   *\n   * @returns {boolean} - The authentication status of the manager.\n   */\n  authenticated() {\n    return this.manager.authenticated;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Linksquared);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared.js?");

/***/ }),

/***/ "./src/linksquared_api_service.js":
/*!****************************************!*\
  !*** ./src/linksquared_api_service.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_api_service_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared_api_service_helper */ \"./src/linksquared_api_service_helper.js\");\n/* harmony import */ var _linksquared_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linksquared_context */ \"./src/linksquared_context.js\");\n// Import the helper class for making API requests\n\n\n\n// Define the Linksquared API service class\nclass LinksquaredAPIService {\n  // Define endpoint paths as static properties\n  static ENDPOINTS = {\n    AUTHENTICATE: \"/authenticate\",\n    PAYLOAD: \"/data_for_device\",\n    CREATE_EVENT: \"/event\",\n    CREATE_LINK: \"/create_link\",\n    USER_ATTRIBUTES: \"/visitor_attributes\",\n    PAYLOAD_FOR_DEVICE_AND_PATH: \"/data_for_device_and_path\",\n  };\n\n  // Constructor to initialize the API service helper\n  constructor() {\n    this.apiService = new _linksquared_api_service_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  // Method to authenticate a device\n  authenticateDevice(details, response, error) {\n    this.apiService.POST(\n      LinksquaredAPIService.ENDPOINTS.AUTHENTICATE,\n      details,\n      response,\n      error\n    );\n  }\n\n  // Method to fetch payload for a device\n  payloadForDevice(details, response, error) {\n    this.apiService.POST(\n      LinksquaredAPIService.ENDPOINTS.PAYLOAD,\n      details,\n      response,\n      error\n    );\n  }\n\n  // Method to fetch payload for a device and path\n  payloadForDeviceAndPath(details, path, response, error) {\n    const dataToSend = { ...details, path };\n    this.apiService.POST(\n      LinksquaredAPIService.ENDPOINTS.PAYLOAD_FOR_DEVICE_AND_PATH,\n      dataToSend,\n      response,\n      error\n    );\n  }\n\n  // Method to create an event\n  createEvent(event, createdAt, path, engagementTime, response, error) {\n    const data = { event };\n    if (path) data.path = path;\n    if (engagementTime) data.engagement_time = engagementTime;\n\n    const isoDate = new Date(createdAt).toISOString();\n    data.created_at = isoDate;\n\n    this.apiService.POST(\n      LinksquaredAPIService.ENDPOINTS.CREATE_EVENT,\n      data,\n      response,\n      error\n    );\n  }\n\n  // Method to create a link\n  createLink(title, subtitle, imageUrl, data, response, error) {\n    const dataToSend = {};\n    if (title) dataToSend.title = title;\n    if (subtitle) dataToSend.subtitle = subtitle;\n    if (imageUrl) dataToSend.image_url = imageUrl;\n    if (data) dataToSend.data = JSON.stringify(data);\n\n    console.log(\"dataToSend \", dataToSend);\n\n    this.apiService.POST(\n      LinksquaredAPIService.ENDPOINTS.CREATE_LINK,\n      dataToSend,\n      response,\n      error\n    );\n  }\n\n  // Method to set attributes\n  setUserAttributes(response, error) {\n    const dataToSend = {};\n    dataToSend.sdk_identifier = _linksquared_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].USER_IDENTIFIER;\n    if (_linksquared_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].USER_ATTRIBUTES) {\n      dataToSend.sdk_attributes = _linksquared_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].USER_ATTRIBUTES;\n    }\n\n    this.apiService.POST(\n      LinksquaredAPIService.ENDPOINTS.USER_ATTRIBUTES,\n      dataToSend,\n      response,\n      error\n    );\n  }\n}\n\n// Export the LinksquaredAPIService class\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksquaredAPIService);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared_api_service.js?");

/***/ }),

/***/ "./src/linksquared_api_service_helper.js":
/*!***********************************************!*\
  !*** ./src/linksquared_api_service_helper.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared_context */ \"./src/linksquared_context.js\");\n\n\n/**\n * Helper class for making API requests to Linksquared service.\n */\nclass LinksquaredAPIServiceHelper {\n  // Endpoint URL for the Linksquared API\n  static ENDPOINT = \"https://sdk.sqd.link/api/v1/sdk\";\n\n  /**\n   * Constructor for LinksquaredAPIServiceHelper.\n   * @param {string} APIKey - API key for accessing the Linksquared API.\n   */\n  constructor(APIKey) {\n    this.APIKey = APIKey;\n  }\n\n  /**\n   * Perform a POST request to the Linksquared API.\n   * @param {string} path - API endpoint path.\n   * @param {Object} data - Data to be sent in the request body.\n   * @param {Function} success - Success callback function.\n   * @param {Function} error - Error callback function.\n   */\n  POST(path, data, success, error) {\n    const headers = this.buildHeaders();\n    const endpoint = LinksquaredAPIServiceHelper.ENDPOINT + path;\n\n    const xhr = new XMLHttpRequest();\n    xhr.open(\"POST\", endpoint, true);\n\n    // Set request headers\n    for (const key in headers) {\n      xhr.setRequestHeader(key, headers[key]);\n    }\n\n    xhr.onreadystatechange = function () {\n      if (xhr.readyState === XMLHttpRequest.DONE) {\n        if (xhr.status >= 200 && xhr.status < 300) {\n          const response = xhr.responseText;\n          success(JSON.parse(response));\n        } else {\n          error(xhr.statusText);\n        }\n      }\n    };\n\n    xhr.send(JSON.stringify(data));\n  }\n\n  /**\n   * Build request headers for the API request.\n   * @returns {Object} - Request headers.\n   */\n  buildHeaders() {\n    const headers = {};\n    headers[\"Content-Type\"] = \"application/json\";\n    headers[\"PLATFORM\"] = \"web\";\n\n    // Get identifier\n    const { protocol, hostname, port } = window.location;\n    const portPart = port ? `:${port}` : \"\";\n    const fullURL = `${protocol}//${hostname}${portPart}`;\n\n    // Add domain identifier header\n    if (window && window.location) {\n      headers[\"IDENTIFIER\"] = fullURL;\n    }\n\n    // Add Linksquared ID header\n    if (_linksquared_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].LINKSQUARED_ID) {\n      headers[\"LINKSQUARED\"] = _linksquared_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].LINKSQUARED_ID;\n    }\n\n    // Add API key header\n    if (_linksquared_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].API_KEY) {\n      headers[\"PROJECT_KEY\"] = _linksquared_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].API_KEY;\n    }\n\n    return headers;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksquaredAPIServiceHelper);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared_api_service_helper.js?");

/***/ }),

/***/ "./src/linksquared_context.js":
/*!************************************!*\
  !*** ./src/linksquared_context.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_device_details__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared_device_details */ \"./src/linksquared_device_details.js\");\n// Import the LinksquaredDeviceDetails module\n\n\n// Define the LinksquaredContext class\nclass LinksquaredContext {\n  // Static properties to store API key and Linksquared ID\n  static API_KEY = null;\n\n  static get LINKSQUARED_ID() {\n    return _linksquared_device_details__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCookieValue(\"linksquared\");\n  }\n\n  /**\n   * Set Linksquared ID cookie.\n   * @param {string} id - Linksquared ID to be stored in the cookie.\n   */\n  static setLinksquaredIDCookie(id) {\n    _linksquared_device_details__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setCookie(\"linksquared\", id);\n  }\n\n  /**\n   * Static property to store the user identifier.\n   * @type {string|null}\n   */\n  static USER_IDENTIFIER = null;\n\n  /**\n   * Static property to store the user attributes.\n   * @type {Object|null}\n   */\n  static USER_ATTRIBUTES = null;\n}\n\n// Export the LinksquaredContext class\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksquaredContext);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared_context.js?");

/***/ }),

/***/ "./src/linksquared_device_details.js":
/*!*******************************************!*\
  !*** ./src/linksquared_device_details.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Define the LinksquaredDeviceDetails class\nclass LinksquaredDeviceDetails {\n  /**\n   * Get current device details.\n   * @returns {Object} - Object containing user agent, app version, and build.\n   */\n  static currentDetails() {\n    const userAgent = navigator.userAgent;\n\n    // Initialize return values object\n    const returnValues = {\n      user_agent: userAgent,\n      app_version: \"0\",\n      build: \"0\",\n    };\n\n    return returnValues;\n  }\n\n  /**\n   * Get the value of a cookie by name.\n   * @param {string} cookieName - Name of the cookie to retrieve.\n   * @returns {string|null} - Value of the cookie, or null if not found.\n   */\n  static getCookieValue(cookieName) {\n    const cookies = document.cookie.split(\";\"); // Split cookies into an array\n    for (let cookie of cookies) {\n      const [name, value] = cookie.trim().split(\"=\"); // Split each cookie into name and value\n      if (name === cookieName) {\n        return decodeURIComponent(value); // Return the decoded cookie value\n      }\n    }\n    return null; // Return null if the cookie is not found\n  }\n\n  /**\n   * Set a cookie with the given name and value.\n   * @param {string} cookieName - Name of the cookie to set.\n   * @param {string} cookieValue - Value to set for the cookie.\n   */\n  static setCookie(cookieName, cookieValue) {\n    // Set expiration date to a far-future date\n    const farFutureDate = new Date(\"9999-12-31\");\n    const expires = \"expires=\" + farFutureDate.toUTCString();\n\n    // Set the cookie\n    document.cookie =\n      cookieName +\n      \"=\" +\n      encodeURIComponent(cookieValue) +\n      \";\" +\n      expires +\n      \";path=/\";\n  }\n\n  /**\n   * Get the value of the \"linksquared\" parameter from the current URL.\n   * @returns {string|null} - Value of the \"linksquared\" parameter, or null if not found.\n   */\n  static getLinksquaredPath() {\n    const url = window.location.href;\n    // Create a new URLSearchParams object with the URL string\n    const params = new URLSearchParams(url.split(\"?\")[1]);\n\n    // Get the value of the \"linksquared\" parameter\n    const linksquaredValue = params.get(\"linksquared\");\n\n    return linksquaredValue;\n  }\n}\n\n// Export the LinksquaredDeviceDetails class\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksquaredDeviceDetails);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared_device_details.js?");

/***/ }),

/***/ "./src/linksquared_events_manager.js":
/*!*******************************************!*\
  !*** ./src/linksquared_events_manager.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_api_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared_api_service.js */ \"./src/linksquared_api_service.js\");\n/* harmony import */ var _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linksquared_device_details.js */ \"./src/linksquared_device_details.js\");\n// Import necessary modules\n\n\n\n/**\n * Represents an event.\n */\nclass Event {\n  /**\n   * Constructs an Event instance.\n   * @param {string} type - The type of the event.\n   * @param {number} createdAt - The timestamp when the event occurred.\n   * @param {string|null} [path=null] - The path associated with the event.\n   * @param {number|null} [engagementTime=null] - The engagement time for the event.\n   */\n  constructor(type, createdAt, path = null, engagementTime = null) {\n    this.type = type;\n    this.createdAt = createdAt;\n    this.path = path;\n    this.engagementTime = engagementTime;\n  }\n}\n\n/**\n * Manages the storage of events.\n */\nclass EventsStorage {\n  /**\n   * Constructs an EventsStorage instance.\n   * Loads events from localStorage or initializes as an empty array.\n   */\n  constructor() {\n    this.events = JSON.parse(localStorage.getItem(\"linksquared-events\")) || [];\n  }\n\n  /**\n   * Get all stored events.\n   * @returns {Array} All stored events.\n   */\n  getEvents() {\n    return this.events;\n  }\n\n  /**\n   * Store events to localStorage.\n   */\n  storeEventsLocally() {\n    localStorage.setItem(\"linksquared-events\", JSON.stringify(this.events));\n  }\n\n  /**\n   * Store a single event.\n   * @param {Event} event - The event to store.\n   */\n  storeEvent(event) {\n    this.events.push(event);\n    this.storeEventsLocally();\n  }\n\n  /**\n   * Store multiple events.\n   * @param {Array<Event>} events - Array of events to store.\n   */\n  storeEvents(events) {\n    this.events.push(...events);\n    this.storeEventsLocally();\n  }\n\n  /**\n   * Delete an event by object reference.\n   * @param {Event} eventToDelete - The event to delete.\n   */\n  deleteEvent(eventToDelete) {\n    this.events = this.events.filter((event) => event !== eventToDelete);\n    this.storeEventsLocally();\n  }\n\n  /**\n   * Get and remove all events.\n   * @returns {Array} All stored events.\n   */\n  getAndRemoveAllEvents() {\n    const eventsToReturn = this.events;\n    this.events = [];\n    this.storeEventsLocally();\n    return eventsToReturn;\n  }\n\n  /**\n   * Set timestamp to localStorage.\n   * @param {number} timestamp - The timestamp to set.\n   */\n  setTimestamp(timestamp) {\n    localStorage.setItem(\n      \"linksquared-events-timestamp\",\n      JSON.stringify(timestamp)\n    );\n  }\n\n  /**\n   * Get timestamp from localStorage.\n   * @returns {number|null} The timestamp from localStorage.\n   */\n  getTimestamp() {\n    const storedTimestamp = localStorage.getItem(\n      \"linksquared-events-timestamp\"\n    );\n    return storedTimestamp ? JSON.parse(storedTimestamp) : null;\n  }\n}\n\n/**\n * Manages events and their handling.\n */\nclass LinksquaredEventsManager {\n  /**\n   * Constructs a LinksquaredEventsManager instance.\n   * Initializes Linksquared API service, EventsStorage, and lastTimestamp.\n   */\n  constructor() {\n    this.service = new _linksquared_api_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.eventsStorage = new EventsStorage();\n    this.lastTimestamp = Date.now();\n\n    const storedTimestamp = this.eventsStorage.getTimestamp();\n    if (storedTimestamp) {\n      this.setTimeSpent();\n      this.lastTimestamp = storedTimestamp;\n    }\n\n    this.eventsStorage.setTimestamp(this.lastTimestamp);\n    this.handleFocus();\n  }\n\n  /**\n   * Flush events.\n   */\n  flushEvents() {\n    this.flushEvents();\n  }\n\n  /**\n   * Add event.\n   * @param {string} type - The type of the event.\n   */\n  addEvent(type) {\n    const event = new Event(\n      type,\n      Date.now(),\n      _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getLinksquaredPath(),\n      null\n    );\n    this.eventsStorage.storeEvent(event);\n  }\n\n  /**\n   * Add event and flush.\n   * @param {string} type - The type of the event.\n   */\n  addEventWithFlush(type) {\n    this.addEvent(type);\n    this.flushEvents();\n  }\n\n  /**\n   * Handle focus event.\n   * @private\n   */\n  handleFocus() {\n    const self = this;\n    window.addEventListener(\"focus\", function () {\n      self.setTimeSpent();\n    });\n  }\n\n  /**\n   * Set time spent on page.\n   * @private\n   */\n  setTimeSpent() {\n    const storedTimestamp = this.eventsStorage.getTimestamp();\n    if (storedTimestamp) {\n      const currentTimestamp = Date.now();\n      const differenceInMilliseconds = Math.abs(\n        currentTimestamp - this.lastTimestamp\n      );\n      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);\n      this.setSecondsToEvents(differenceInSeconds);\n      this.eventsStorage.setTimestamp(null);\n    }\n  }\n\n  /**\n   * Set seconds to events.\n   * @param {number} seconds - The seconds to set.\n   * @private\n   */\n  setSecondsToEvents(seconds) {\n    const events = this.eventsStorage.getAndRemoveAllEvents();\n    events.forEach((event) => {\n      if (event.engagementTime == null) {\n        event.engagementTime = seconds;\n      }\n    });\n    this.eventsStorage.storeEvents(events);\n  }\n\n  /**\n   * Flush events.\n   * @private\n   */\n  flushEvents() {\n    this.setPathIfNeeded();\n    const events = this.eventsStorage.getEvents();\n    events.forEach((event) => {\n      this.sendAndDeleteEvent(event);\n    });\n  }\n\n  /**\n   * Set path if needed.\n   * @private\n   */\n  setPathIfNeeded() {\n    const path = _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getLinksquaredPath();\n    if (!path) {\n      return;\n    }\n    const events = this.eventsStorage.getAndRemoveAllEvents();\n    events.forEach((event) => {\n      if (event.path == null) {\n        event.path = path;\n      }\n    });\n    this.eventsStorage.storeEvents(events);\n  }\n\n  /**\n   * Send and delete event.\n   * @param {Event} event - The event to send and delete.\n   * @private\n   */\n  sendAndDeleteEvent(event) {\n    const self = this;\n    this.service.createEvent(\n      event.type,\n      event.createdAt,\n      event.path,\n      event.engagementTime,\n      (response) => {\n        self.eventsStorage.deleteEvent(event);\n      },\n      (error) => {\n        // Handle error if needed\n      }\n    );\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksquaredEventsManager);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared_events_manager.js?");

/***/ }),

/***/ "./src/linksquared_manager.js":
/*!************************************!*\
  !*** ./src/linksquared_manager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linksquared_api_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linksquared_api_service.js */ \"./src/linksquared_api_service.js\");\n/* harmony import */ var _linksquared_events_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linksquared_events_manager.js */ \"./src/linksquared_events_manager.js\");\n/* harmony import */ var _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linksquared_context.js */ \"./src/linksquared_context.js\");\n/* harmony import */ var _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./linksquared_device_details.js */ \"./src/linksquared_device_details.js\");\n\n\n\n\n\n/**\n * Manages interactions with the Linksquared API and event handling.\n */\nclass LinksquaredManager {\n  /**\n   * Creates an instance of LinksquaredManager.\n   * @param {string} APIKey - The API key for authentication.\n   * @param {Function} linkHandlingCallback - Callback function to handle Linksquared data.\n   */\n  constructor(APIKey, linkHandlingCallback) {\n    _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].API_KEY = APIKey;\n\n    this.linkHandlingCallback = linkHandlingCallback;\n    this.service = new _linksquared_api_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.eventsManager = new _linksquared_events_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    this.authenticated = false;\n    this.shouldUpdateIdentifiers = false;\n  }\n\n  // MARK: Methods\n\n  /**\n   * Authenticates with the Linksquared API.\n   */\n  authenticate() {\n    let details = _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].currentDetails();\n\n    const self = this;\n    this.service.authenticateDevice(\n      details,\n      /**\n       * Success callback for authentication.\n       * @param {Object} response - The authentication response.\n       */\n      (response) => {\n        console.log(\"resp\", response);\n        let linksquaredID = response.linksquared;\n        let identifier = response.sdk_identifier;\n        let attributes = response.sdk_attributes;\n\n        _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setLinksquaredIDCookie(linksquaredID);\n\n        if (!self.shouldUpdateIdentifiers) {\n          _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].USER_ATTRIBUTES = identifier;\n          _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].USER_IDENTIFIER = attributes;\n        }\n\n        self.authenticated = true;\n\n        self.#handleFetchData();\n        self.#updateUserAttributesIfNeeded();\n        self.eventsManager.flushEvents();\n      },\n      /**\n       * Error callback for authentication.\n       * @param {Object} error - The authentication error.\n       */\n      (error) => {\n        console.log(error);\n        console.log(\"Linksquared - wrong credentials, the SDK will NOT work!\");\n      }\n    );\n  }\n\n  /**\n   * Sets the user identifier.\n   * @param {string} identifier - The user identifier.\n   */\n  setUserIdentifier(identifier) {\n    _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].USER_IDENTIFIER = identifier;\n\n    if (!this.authenticated) {\n      this.shouldUpdateIdentifiers = true;\n    }\n\n    this.#updateUserAttributesIfNeeded();\n  }\n\n  /**\n   * Sets the user attributes.\n   * @param {Object} attributes - A dictionary of user attributes.\n   */\n  setUserAttributes(attributes) {\n    _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].USER_ATTRIBUTES = attributes;\n\n    if (!this.authenticated) {\n      this.shouldUpdateIdentifiers = true;\n    }\n\n    this.#updateUserAttributesIfNeeded();\n  }\n\n  /**\n   * Retrieves the user identifier from the LinksquaredContext.\n   * @returns {string|null} The user identifier. Null if not authenticated.\n   */\n  userIdentifier() {\n    return _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].USER_IDENTIFIER;\n  }\n\n  /**\n   * Retrieves the user attributes from the LinksquaredContext.\n   * @returns {Object|null} The user attributes. Null if not authenticated.\n   */\n  userAttributes() {\n    return _linksquared_context_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].USER_ATTRIBUTES;\n  }\n\n  /**\n   * Creates a link with the Linksquared API.\n   * @param {string} title - The title of the link.\n   * @param {string} subtitle - The subtitle of the link.\n   * @param {string} imageURL - The URL of the image associated with the link.\n   * @param {Object} data - Additional data for the link.\n   * @param {Function} success - Success callback for creating the link.\n   * @param {Function} error - Error callback for creating the link.\n   */\n  createLink(title, subtitle, imageURL, data, success, error) {\n    if (!this.authenticated) {\n      error(\"The linksquared SDK is not yet initialized, try again later!\");\n    }\n\n    this.service.createLink(\n      title,\n      subtitle,\n      imageURL,\n      data,\n      /**\n       * Success callback for creating the link.\n       * @param {Object} response - The response from creating the link.\n       */\n      (response) => {\n        if (response.link) {\n          success(response.link);\n          return;\n        }\n\n        error(\n          \"You must configure the redirect rules in the Web interface first\"\n        );\n      },\n      error\n    );\n  }\n\n  // MARK: Private\n\n  /**\n   * Handles fetching data from Linksquared API.\n   * Determines whether to fetch data for the current device or a specific path.\n   * @private\n   */\n  #handleFetchData() {\n    const linksquaredValue = _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getLinksquaredPath();\n    if (linksquaredValue) {\n      this.#handleLinksquaredValue(linksquaredValue);\n    } else {\n      this.#handleDataForDevice();\n    }\n  }\n\n  /**\n   * Handles fetching data for a specific path from Linksquared API.\n   * @param {string} path - The path for which to fetch data.\n   * @private\n   */\n  #handleLinksquaredValue(path) {\n    let details = _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].currentDetails();\n    console.log(\"path\", path);\n\n    this.service.payloadForDeviceAndPath(\n      details,\n      path,\n      /**\n       * Success callback for fetching data for a specific path.\n       * @param {Object} response - The response data.\n       */\n      (response) => {\n        this.#handleDataReceived(response.data);\n      },\n      /**\n       * Error callback for fetching data for a specific path.\n       * @param {Object} error - The error object.\n       */\n      (error) => {\n        console.log(\"Linksquared -- could not fetch data!\");\n      }\n    );\n  }\n\n  /**\n   * Handles fetching data for the current device from Linksquared API.\n   * @private\n   */\n  #handleDataForDevice() {\n    let details = _linksquared_device_details_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].currentDetails();\n    const self = this;\n\n    this.service.payloadForDevice(\n      details,\n      /**\n       * Success callback for fetching data for the current device.\n       * @param {Object} response - The response data.\n       */\n      (response) => {\n        self.#handleDataReceived(response.data);\n      },\n      /**\n       * Error callback for fetching data for the current device.\n       * @param {Object} error - The error object.\n       */\n      (error) => {\n        console.log(\"Linksquared -- could not fetch data!\");\n      }\n    );\n  }\n\n  /**\n   * Handles received data from Linksquared API.\n   * @param {Object} data - The received data.\n   * @private\n   */\n  #handleDataReceived(data) {\n    console.log(\"data received\", data);\n    if (data) {\n      this.linkHandlingCallback(data);\n    }\n  }\n\n  #updateUserAttributesIfNeeded() {\n    if (!this.authenticated) {\n      return;\n    }\n\n    const self = this;\n    this.service.setUserAttributes(\n      (response) => {\n        self.shouldUpdateIdentifiers = false;\n      },\n      /**\n       * Error callback for fetching data for the current device.\n       * @param {Object} error - The error object.\n       */\n      (error) => {\n        console.log(\"Linksquared -- could not set identifiers!\");\n      }\n    );\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksquaredManager);\n\n\n//# sourceURL=webpack://Linksquared/./src/linksquared_manager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});