import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserBookings from '../components/UserBookings';

const Stack = createStackNavigator();
const Navigator = props => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Bookings" component={UserBookings} />
        </Stack.Navigator>
    );
};

export default Navigator;