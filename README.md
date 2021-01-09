# Mobile Flashcards

This project is a submission to the [React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019).

It is an **Android** app where you can create decks of flashcards:

- Create the deck
- Add some cards
- Have fun with your quiz!

## Platforms

This project is build on top of the [Material Design](https://material.io/) specification and meant to be run on **Android** devices **only**.

It was tested on the following platforms:

- [x] Android Device (API Level 28)
- [x] Android Emulator (API Level 29)

## Development

### Installing React Native

You will need [React Native](https://reactnative.dev/) and [Android Studio](https://developer.android.com/studio) to run this application.

For instructions on how to do this, please read through React Native's environment setup guide:

- Head to [Setting up the development environment](https://reactnative.dev/docs/environment-setup)
- Select the "React Native CLI Quickstart" tab.
- Follow the setup instructions

### Installing Dependencies

You will need to run the following command in order to install the project's dependencies before running other commands:

```bash
npm install
# or yarn
```

### Running in Development Mode

To start the project simply run:

```bash
npm start
# or yarn start
```

This will install the app on your Android device or emulator.

It may take some minutes to install the first time.

### Running Tests

```bash
npm test
# or yarn test
```

This will start jest, which will run tests.

## Theming

The app will use a dark or light theme based on your device settings.

## Technologies

### React

Builds the view layer of the app.

### React Navigation

Handles routing between screens.

### Redux

Store's the app's data and acts as it's single source of truth. Is also responsible for predictable state changes through actions.

### Redux Saga

A Redux middleware that will handle async actions as well as complex actions, acting as a process manager.

> [https://redux-saga.js.org/](https://redux-saga.js.org/)

## Licence

This project is provided under the [MIT License](./LICENSE.md).
