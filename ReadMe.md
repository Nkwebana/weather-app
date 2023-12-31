# Weather App

This is a React Native application called Weather App that allows users to get weather information for different locations. The app utilizes various libraries and tools to achieve the desired functionality.

## Features

Get current weather information for a specific location
View detailed weather information including temperature, humidity, wind speed, and description
Switch between different locations to view their weather information
User-friendly interface with smooth navigation and appealing design

## Technologies Used

The Weather App is built using the following technologies:

- React Native: A JavaScript framework for building mobile applications
- Context: React's built-in state management tool, used to manage application-level state
- React Query: A library for managing and caching server state in React applications
- Fetch API: Used for integrating with external weather APIs to fetch weather data
- Styled Components: A CSS-in-JS library for styling React components
- React Navigation: A routing and navigation library for React Native applications
- Jest: A JavaScript testing framework for unit testing
- Esri API: A geocoding service used for reverse geocoding to save device location as a favorite

## Installation

To run the Weather App on your local machine, follow these steps:

- Clone the repository: git clone <https://github.com/Nkwebana/weather-app>
- Navigate to the project directory: cd weather-app
- Install the dependencies: `yarn`
- Start the development server: `yarn start`
- Use the preferred method to run the app on an iOS or Android emulator or device:

To run iOS: `yarn ios`

## Usage

Once the Weather App is running on your device, you can perform the following actions:

- Get your current locations weather information
- Enter a location in the search bar
- Tap a location from the suggestions

## Below is a list of extras that I added:

- Fetch a list of locations based off users search input
- Fetch weather information for user selected location (Location auto suggest)
- Add locations to favorite locations
- Persisting favorite locations between sessions (Hydrating app sandbox)
- View a list of favorite locations
- Tap on a favorite location to view its weather

## Testing

Unit tests are implemented in the Weather App using the Jest testing framework. As of now, there is one unit test available for the button component.This unit test takes into account code coverage. However, considering the usage of TypeScript, the type system already helps in ensuring the correctness of the code, which reduces the need for unit tests in some cases. We can discuss whether additional tests are necessary based on the specific requirements and complexity of the application.

To run the unit tests, use the following command: `yarn test`

The Weather App showcases my ability to build a React Native application using various tools and libraries efficiently. By utilizing Context for state management, React Query and Fetch API for API integration, Styled Components for styling, React Navigation for navigation, and Jest for unit tests, I have followed a lean approach, incorporating only the necessary dependencies. The application offers a user-friendly experience for fetching and displaying weather information for different locations.

If you have any questions or need further assistance, feel free to contact me.

Thank you for using the Weather App!
