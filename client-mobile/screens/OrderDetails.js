import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { removeBooking } from '../services/booking-services';
import peopleNumIcon from '../static/images/people-number.png';
import tableNumIcon from '../static/images/table-number.png';
import durationIcon from '../static/images/durations.png';
import COLOURS from '../constants/COLOURS';

import { countItems } from '../utils/receipts-utils';

const CustomerPastReceipt = ({ route }) => {
    console.log(route.params, 'OrderDetails.js', 'line: ', '12');
    const menuItemsJSX = [];
    const orderCounter = countItems(route.params.order);
    for (const item in orderCounter) {
        const qty = orderCounter[item];
        menuItemsJSX.push(
            <View key={item}>
                <Text>{item}</Text>
                <Text>{qty}</Text>
            </View>
        );
    }   

    return (
        <ScrollView>
            <Text>Menu Items</Text>
            {menuItemsJSX}
            <Text >Total: £{route.params.totalCost}</Text>
        </ScrollView>
    );
};

export default CustomerPastReceipt;