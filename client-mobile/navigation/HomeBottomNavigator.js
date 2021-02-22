import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserBookingsNavigator from './UserBookingsNavigator';
import COLOURS from '../constants/COLOURS';
import AddBookingNavigator from './AddBookingNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigator = props => {
    return (
        <Tab.Navigator tabBarOptions={{ labelStyle: { fontSize: 20, color: COLOURS.primary, fontWeight: "700" } }}>
            <Tab.Screen
                name="Your bookings"
                component={UserBookingsNavigator}
            />
            <Tab.Screen
                name="Make reservation"
                component={AddBookingNavigator}
            />
        </Tab.Navigator>
    );
};


export default BottomNavigator;