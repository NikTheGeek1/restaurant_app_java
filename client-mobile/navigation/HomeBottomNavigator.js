import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserBookingsNavigator from './UserBookingsNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigator = props => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Your bookings" component={UserBookingsNavigator} />
        </Tab.Navigator>
    );
};


export default BottomNavigator;