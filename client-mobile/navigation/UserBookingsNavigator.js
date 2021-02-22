import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserBookings from '../screens/UserBookings';
import OrderDetails from '../screens/OrderDetails';
const Stack = createStackNavigator();
const Navigator = props => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Bookings" component={UserBookings} />
            <Stack.Screen name="Order details" component={OrderDetails} />
        </Stack.Navigator>
    );
};

export default Navigator;