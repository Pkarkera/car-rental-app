About the Car Rental App:

Database link:
https://console.firebase.google.com/u/2/project/rentalapp-e00cc/firestore/data/~2FListings~2FCkBfZDmRdqgnqRTgZu4F

Authentication Link:
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

Dependencies used:

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

