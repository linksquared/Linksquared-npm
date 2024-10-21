# Linksquared SDK Documentation

## Overview

The Linksquared SDK is a JavaScript module designed to integrate with the Linksquared API, providing functionality for creating and managing links, handling user information, and managing authentication. This documentation covers the main methods and usage of the SDK.

## Installation

To install the Linksquared SDK, use the following command to add it as a dependency to your project:

```bash
npm install linksquared --save
```

This will add the Linksquared SDK to your dependencies in package.json.

After installation, you can include the SDK in your project:

```javascript
import Linksquared from "linksquared";
```

## Documentation

### Constructor

```javascript
constructor(APIKey, linkHandlingCallback);
```

Creates a new instance of the Linksquared SDK.

- **APIKey** (string): Your API key provided by Linksquared for authentication.
- **linkHandlingCallback** (Function): A callback function that handles the data received from Linksquared.

#### Example

```javascript
const APIKey = "your-api-key-here";
const handleLinkData = (data) => {
  console.log("Link data received:", data);
};

const linksquared = new Linksquared(APIKey, handleLinkData);
```

## Methods

### start()

Initializes and starts the Linksquared SDK by authenticating with the provided API key.

- **succesfullAuthenticatedCallback** (Function, optional): Callback to invoke on successful authentication.

#### Example

```javascript
linksquared.start();
```

### createLink(title, subtitle, imageURL, data, success, error)

Creates a new link using the Linksquared API.

- **title** (string): The title of the link.
- **subtitle** (Function): The subtitle of the link.
- **imageURL** (string): The URL of the image associated with the link.
- **data** (Object): Additional data to be included with the link.
- **success** (Function): A callback function to be invoked upon successful creation of the link.
- **error** (Function): A callback function to be invoked if there is an error in creating the link.

#### Example

```javascript
const linkData = {
  description: "This is a sample link",
  category: "Demo",
};

linksquared.createLink(
  "Sample Link",
  "This is a subtitle",
  "https://example.com/image.jpg",
  linkData,
  (response) => {
    console.log("Link created successfully:", response);
  },
  (err) => {
    console.error("Error creating link:", err);
  }
);
```

### userIdentifier()

Retrieves the current user identifier.

- **Returns** (string|null): The user identifier if set, otherwise null.

#### Example

```javascript
const userId = linksquared.userIdentifier();
console.log("Current user ID:", userId);
```

### userAttributes()

Retrieves the current user attributes.

- **Returns** (Object|null): A dictionary of user attributes if set, otherwise null.

#### Example

```javascript
const userAttributes = linksquared.userAttributes();
console.log("User attributes:", userAttributes);
```

### setUserIdentifier(identifier)

Sets the user identifier.

- **identifier** (string): The user identifier to set.

#### Example

```javascript
linksquared.setUserIdentifier("user-12345");
```

### setUserAttributes(attributes)

Sets the user attributes.

- **attributes** (Object): A dictionary of user attributes to set.

#### Example

```javascript
const attributes = {
  name: "John Doe",
  email: "john.doe@example.com",
};

linksquared.setUserAttributes(attributes);
```

### authenticated()

Checks if the SDK is currently authenticated.

- **Returns** (boolean): true if authenticated, false otherwise.

#### Example

```javascript
const isAuthenticated = linksquared.authenticated();
console.log("Is authenticated:", isAuthenticated);
```

### showMessagesList()

Displays the messages list using the manager.

#### Example

```javascript
linksquared.showMessagesList();
```

### getMessages(page, response, error)

Retrieves messages for a specific page using the manager.

- **page** (number): The page number to retrieve messages from.
- **response** (Function): Callback to handle the retrieved messages.
- **error** (Function): Callback to handle any errors during retrieval.

#### Example

```javascript
linksquared.getMessages(
  1,
  (messages) => {
    console.log("Retrieved messages:", messages);
  },
  (err) => {
    console.error("Error retrieving messages:", err);
  }
);
```

### getNumberOfUnreadMessages(response, error)

Retrieves the number of unread messages using the manager.

- **response** (Function): Callback to handle the count of unread messages.
- **error** (Function): Callback to handle any errors during retrieval.

#### Example

```javascript
linksquared.getNumberOfUnreadMessages(
  (count) => {
    console.log("Number of unread messages:", count);
  },
  (err) => {
    console.error("Error retrieving unread messages count:", err);
  }
);
```

## Usage Example

```javascript
import Linksquared from "linksquared";

const APIKey = "your-api-key";
const linksquared = new Linksquared(APIKey, (data) => {
  console.log("Link data:", data);
});

linksquared.start();

if (linksquared.authenticated()) {
  linksquared.createLink(
    "Sample Link",
    "Subtitle",
    "https://example.com/image.jpg",
    { foo: "bar" },
    (response) => console.log("Link created:", response),
    (error) => console.error("Error:", error)
  );
}

linksquared.setUserIdentifier("user-123");
linksquared.setUserAttributes({ name: "John Doe", age: 30 });

console.log("User ID:", linksquared.userIdentifier());
console.log("User Attributes:", linksquared.userAttributes());
```
