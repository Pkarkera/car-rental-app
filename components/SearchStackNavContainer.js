import React from 'react';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchScreen from '../screens/SearchScreen';

import { Button } from 'react-native';


// creating the default Tab and Stack objects
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStackNavContainer = ({navigation}) => {
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
        name="Register to rent a car"
        component={RegisterScreen}
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
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: '#18ffa1',
          },
          headerTintColor: '#112e3a',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Rent A Car');
              }}
              title="Logout"
              color="#112e3a"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavContainer;
