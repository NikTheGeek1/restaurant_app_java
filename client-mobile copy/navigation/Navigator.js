import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import { useSelector } from 'react-redux';
import HomeBottomNavigator from '../navigation/HomeBottomNavigator';

const Stack = createStackNavigator();
const Navigator = props => {
    const isUserLoggedIn = useSelector(state => state.userDetails.isLoggedIn);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isUserLoggedIn ? (
                    <>
                        <Stack.Screen name="Welcome" component={HomeBottomNavigator} />
                    </>
                ) : (
                        <Stack.Screen name="SignIn" component={SignIn} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;