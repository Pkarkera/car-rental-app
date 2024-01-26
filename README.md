# About the Car Rental App:

## Prerequisites
Before you get started with Car Rental App, make sure you have the following dependencies installed on your system:

### 1. Expo CLI
Expo CLI is a critical tool for developing and running React Native applications. If you don't already have it, you can install it with the following steps:

  a. First, ensure you have Node.js installed. If you don't have it, follow the next step.

#### Node.js: 
Download and install [Node.js](https://nodejs.org/en), which includes npm (Node Package Manager). You can download it from the official website: Node.js. Make sure you have at least Node.js version 14 or higher.

  b. Once Node.js is installed, open your terminal or command prompt and run the following command to install Expo CLI:
`npm install -g expo-cli`

### 2. Node.js

Node.js is a JavaScript runtime that is required for running the Expo CLI and the project itself. Make sure you have Node.js installed with at least version 14 or higher. If you don't have Node.js installed, you can download it from the official website: [Node.js](https://nodejs.org/en).

## Configuring Firebase

To use Firebase with Spendwise, you need to configure it with your own API keys. Follow these steps to set up Firebase:

   1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/u/0/).
   2. Once your project is created, obtain the configuration values required for Spendwise. These include the `apiKey`, `authDomain`, `projectId`, `storageBucket`, 
      `messagingSenderId`, 
      `appId` and `measurementId`.
   3. Update the `firebaseConfig` object in your code with your Firebase project's configuration. Open the file `config.js` in your project and replace the placeholder values with 
      your Firebase project's actual configuration.

 ```
  const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Getting Started

Now, let's get Car Rental App up and running on your local machine. Follow these steps:
  1. Clone the Repository: Start by cloning the Car Rental App repository to your local system.
     `https://github.com/Pkarkera/car-rental-app.git`
  2. Navigate to the Project Directory: Change your working directory to the Car Rental App project folder.
     
  3. Install Dependencies: Use npm to install the required project dependencies.
     `npm install`
  4. Run the App: After installing the dependencies and configuring React Native Reanimated, you can start the app using the Expo CLI.
     `expo start'
     
  5. View the App: After running the app, you will see a QR code and a list of options to run the app. To test Spendwise on your mobile device, follow these steps:

       a. Install the [Expo Go](https://expo.dev/client) app on your mobile device.
       b. Open Expo Go and tap on the "Scan QR Code" option.
       c. Use your mobile device's camera to scan the QR code displayed in the terminal.



## Database link:
https://console.firebase.google.com/u/2/project/rentalapp-e00cc/firestore/data/~2FListings~2FCkBfZDmRdqgnqRTgZu4F

## Authentication Link:
https://console.firebase.google.com/u/2/project/rentalapp-e00cc/authentication/users


In this app we have created the app with sign in screen, register screen, the main search screen and the reservation screen along with the payment form screen.

1. The SignInScreen page:

The SignInScreen page has the EmailId and Password fields that are required to use the application. We require proper email id and password with min 6 digits or number.

2. The RegisterScreen page:

The RegisterScreen page has the fields to enter the full name along with to setup the email and password. Once the user has regostered, the page gets redirected to the SignIn screen.

3. SearchScreen page:

The SearchScreen page has all the necessary code to store the data in the database along with the car details and provide an option to reserve the car.

4. ReservationList page:

The ReservationList page is the cart section which is named as Your Reservation on the app. Once the reserve now button is clicked the details are stored in the database with the Booking Status as "YELLOW". We need to click the Buy Now button to proceed for the payment.

5. PaymentForm page:

The PaymentForm page lets you proceed after clicking on the Buy Now button and in this page the user can add the card details and the proceed to checkout for renting the car. There is a alert message saying that car has been successfully booked.

6. SearchStackNavContainer page:

This page handles all the navigations in the app. We have stack screen that navigates to the name "register to rent a car" and "Cars found" that help navigate through the pages.

7. App.js page:

In this page we have tab screen with components "SearchStackNavContainer" and "Reservation List" that has navigation container to proceed with the cars data.

## Dependencies used:

"dependencies": {
    "@react-navigation/bottom-tabs": "^6.5.8",
    "@react-navigation/native-stack": "^6.9.13",
    "@react-navigation/stack": "^6.3.17",
    "@stripe/stripe-react-native": "^0.35.0",
    "expo": "~49.0.5",
    "expo-location": "~16.1.0",
    "expo-status-bar": "~1.6.0",
    "firebase": "^10.1.0",
    "react": "18.2.0",
    "react-native": "0.72.3",
    "react-native-gesture-handler": "~2.12.0",
    "react-native-maps": "1.7.1",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },

