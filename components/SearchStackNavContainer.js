import React from 'react';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SearchScreen from '../screens/SearchScreen';

// creating the default Tab and Stack objects
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStackNavContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rent A Car"
        component={SignInScreen}
        options={{
          headerStyle: {
            backgroundColor: '#18ffa1',
          },
          headerTintColor: '#112e3a',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Cars Found"
        component={SearchScreen}
        options={{
          headerStyle: {
            backgroundColor: '#18ffa1',
          },
          headerTintColor: '#112e3a',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavContainer;
