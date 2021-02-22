import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import COLOURS from '../constants/COLOURS';

import { countItems } from '../utils/receipts-utils';

const CustomerPastReceipt = ({ route }) => {
    console.log(route.params, 'OrderDetails.js', 'line: ', '12');
    const menuItemsJSX = [];
    const orderCounter = countItems(route.params.order);
    for (const item in orderCounter) {
        const qty = orderCounter[item];
        menuItemsJSX.push(
            <View style={styles.itemContainer} key={item}>
                <Text style={styles.itemText}>{item} x{qty}</Text>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            {menuItemsJSX}
            <View style={styles.totalTextContainer}>
                <Text style={styles.totalText} >Total: £{route.params.totalCost}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: "center" },
    itemContainer: {
        backgroundColor: COLOURS.gray3,
        flexDirection: "column",
        width: 200,
        justifyContent: 'center',
        marginBottom: 2
    },
    itemText: {},
    qtyText: {},
    menuTitle: { fontSize: 25 },
    menuTitleContainer: {},
    totalText: {textAlign: "left"},
    totalTextContainer: { borderTopColor: COLOURS.gray1, borderTopWidth: 2, width: 200 }
});
export default CustomerPastReceipt;