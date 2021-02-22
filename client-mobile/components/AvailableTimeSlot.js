import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import COLOURS from '../constants/COLOURS';
import { addBookingForCustomer } from '../services/booking-services';

const AvailableTimeSlot = ({ tables, time, duration, date, userEmail, navigation }) => {
    const [selectedTable, setSelectedTable] = useState();
    const [selectedNumberOfPeople, setSelectedNumberOfPeople] = useState();
    const dateA = new Date("2021-02-02 9:00:00");
    console.log(dateA, 'sort-dates-util.js', 'line: ', '4');
    const bookHandler = () => {
        if (!selectedTable || !selectedNumberOfPeople) return;
        const booking = { numOfPeople: selectedNumberOfPeople, tableNum: selectedTable, duration: duration, date: date, time: time, status: "PENDING" };
        addBookingForCustomer(booking, userEmail, 
            resSuc => navigation.navigate("Bookings"),
            recError => console.log(recError));
            navigation.navigate("Pick reservation date and duration");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{time}</Text>
            <View style={styles.availableTables}>
                <Text style={styles.titleText}>Pick a table: </Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedTable(value)}
                    items={tables.map(table => ({ label: String(table), value: String(table) }))}
                />
            </View>
            <View style={styles.numberOfPeople}>
                <Text style={styles.titleText}>Number of people: </Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedNumberOfPeople(value)}
                    items={[...Array(8).keys()].map(num => ({ label: String(num + 1), value: String(num + 1) }))}
                />
            </View>
            <Button title="Book" onPress={bookHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        width: 300,
        alignSelf: "center",
        flexDirection: "column",
        backgroundColor: COLOURS.secondary,
        borderRadius: 2,
        shadowColor: "black",
        shadowOpacity: .3,
        shadowOffset: {width: 4, height: 2
        }
    }, 

    titleText: {
        fontSize: 16
    },

    availableTables: {
        flex: 1,
        flexDirection: "row" 
    },
    numberOfPeople: {
        flex: 1,
        flexDirection: "row"
    },

    time: {fontSize: 25, alignSelf:"center"}
});

export default AvailableTimeSlot;