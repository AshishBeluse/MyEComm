# MyEComm

## Setup Instructions

1. Clone the repository.
2. Run `npm install`.
3. Start the app with `npm run android` or `npm run ios`.

## Features

- Login/Registration
- Product Catalog
- Cart Management
- Proof of Delivery (camera integration)
- Theme and Language Selection

## Testing

Run `npm test` to execute unit tests.

## Known Limitations

- Camera integration is Android-only.
- Minimal error handling for storage constraints.

## Architecture Decisions

- State Management
  1. Redux:Used to manage the global state, ensuring consistent state across different screens, especially for user login and cart data.
  2. Local State: React’s `useState` and `useReducer` were used for localized state management in UI components.
- API Integration
  1.  Fake Store API & DummyJSON: the calling is shown and the dummy data is created to show in the app.
- Authentication
  1.  Regex implemented: used Regex for login and signup screens as currently there is active API used.
- Native Modules
  1.  Camera Access:instead of using third-party React Native libraries, we implemented a native module for camera access using Android code, ensuring better performance and error handling.
- Testing
  1.  Unit Testing: unit done on Android.
