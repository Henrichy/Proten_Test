# Shipment App

## Overview

The Shipment App is a mobile application designed to manage and track shipments. It provides functionalities for searching, filtering, and viewing shipment statuses, as well as navigation between different sections of the app.

## Features

- **User Authentication**: Users can log in and access their personal shipment data.
- **Search Functionality**: Search for shipments using a search bar with focus styling.
- **Filter Options**: Apply various filters to view shipments based on their status.
- **Status Tracking**: View the current status of shipments with a custom component.
- **Navigation**: Seamless navigation between different sections of the app, including profile and shipment details.
- **Pull-to-Refresh**: Refresh the data and reset the state with a pull-to-refresh gesture.
- **Bottom Sheets**: Use bottom sheets for filters and additional options.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/shipment-app.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd shipment-app
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Start the Development Server**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

5. **Run the Application**

   For iOS:
   ```bash
   npx react-native run-ios
   ```

   For Android:
   ```bash
   npx react-native run-android
   ```

## Usage

- **Profile Tab**: Logs out the user and navigates to the first page.
- **Search**: Type in the search bar to filter shipment data.
- **Filter**: Use the filter button to apply different status filters to the shipment list.
- **Pull-to-Refresh**: Pull down on the list to refresh the shipment data.

## File Structure

- `src/navigation/AppNavigator.tsx`: Contains navigation setup.
- `src/utils/storageUtils.ts`: Utility functions for storage management.
- `src/components/Status.tsx`: Component to display shipment status.
- `src/screens/FirstPage.tsx`: The first page of the app.
- `src/screens/SecondPage.tsx`: The main screen with search, filters, and shipment status.

## Technologies Used

- React Native
- TypeScript
- Bottom Sheet (react-native-bottom-sheet)
- Navigation (React Navigation)
- Buttom Tab

## Contributing

1. **Fork the Repository**: Create your own fork of the repository.
2. **Create a Feature Branch**: 

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**:

   ```bash
   git add .
   git commit -m "Add a descriptive commit message"
   ```

4. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**: Open a pull request from your feature branch to the main repository.

## Contact

For any questions or support, please contact:

- Email: henrynzekwe25@gmail.com
