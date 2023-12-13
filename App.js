import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

//import SignInScreen from './screens/SignInScreen';
import ReservationList from './screens/ReservationList';
import SearchStackNavContainer from './components/SearchStackNavContainer';

//import CheckoutScreen from '../screens/CheckoutScreen';

//to obtain instance of navigation stack
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          component={SearchStackNavContainer}
          name="Cars"
          options={{
            headerShown:false,
            headerStyle: { backgroundColor: '#18ffa1' },
            headerTintColor: '#112e3a',
            tabBarIcon: ({ focused }) => (
              <FontAwesome name="car" size={25} color="#112e3a" />
            ),
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'black',
          }}
        ></Tab.Screen>
        <Tab.Screen
          component={ReservationList}
          name="Your Reservations"
          options={{
            headerStyle: { backgroundColor: '#18ffa1' },
            headerTintColor: '#112e3a',
            tabBarIcon: ({ focused }) => (
              <FontAwesome name="ticket" size={25} color="#112e3a" />
            ),
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'black',
          }}
          
        ></Tab.Screen>
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
