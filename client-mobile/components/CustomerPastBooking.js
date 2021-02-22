import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { removeBooking } from '../services/booking-services';
import peopleNumIcon from '../static/images/people-number.png';
import tableNumIcon from '../static/images/table-number.png';
import durationIcon from '../static/images/durations.png';
import COLOURS from '../constants/COLOURS';
import { useEffect } from 'react';
import { useState } from 'react';

const CustomerPastBooking = ({ booking, navigation, setMyBookings }) => {
    const [isDone, setIsDone] = useState(false);
    useEffect(() => {
        setIsDone(booking.status === "DONE");
    }, [booking]);

    const onClickBooking = () => {
        if (!isDone) {
            removeBooking(booking.id, sucRes => setMyBookings([]), sucErr => console.log(sucErr));
        } else {
            navigation.navigate("Order details", booking.receipt);
        }
    };

    let stylesPending = "PENDING";
    if (isDone) {
        stylesPending = "DONE";
    }

    return (
        <View style={{...styles.container, ...styles['container'+stylesPending]}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{booking.date}</Text>
                <Text style={styles.title}>{booking.time.slice(0, 5)}</Text>
            </View>
            <View style={styles.bodyIcons}>
                <Image source={tableNumIcon} alt="table-icon" style={styles.icon} />
                <Image source={peopleNumIcon} alt="people-icon" style={styles.icon} />
                <Image source={durationIcon} alt="duration-icon" style={styles.icon} />
            </View>
            <View style={styles.bodyProperties}>
                <Text style={styles.bookingProperty}>{booking.tableNum}</Text>
                <Text style={styles.bookingProperty}>{booking.numOfPeople}</Text>
                <Text style={styles.bookingProperty}>{booking.duration}</Text>
            </View>
            <TouchableOpacity style={styles.seeDetailsContainer} onPress={onClickBooking}>
                {isDone ? <Text style={styles.seeDetails} >DETAILS</Text> : <Text style={styles.removeBooking}>CANCEL</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        width: "70%",
        alignSelf: "center",
        height: 200,
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: .3,
        shadowOffset: {width: 4, height: 2}
    },
    containerDONE: {
        backgroundColor: COLOURS.gray2,
    },
    containerPENDING: {
        backgroundColor: COLOURS.secondary,
    },
    titleContainer: { justifyContent: "center", alignItems: "center", paddingBottom: 10 },
    title: { color: COLOURS.gray1, fontSize: 20, fontWeight: "800" },
    bodyIcons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: COLOURS.gray3,
        borderTopWidth: 2,
        paddingTop: 15
    },
    icon: {
        width: 40,
        height: 40
    },
    bodyProperties: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: COLOURS.gray3,
        borderBottomWidth: 2
    },
    bookingProperty: { color: COLOURS.gray1, fontSize: 30},
    removeBooking: {fontSize: 20, color: "white", fontWeight: "800"},
    seeDetailsContainer: {height: 40, flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"},
    seeDetails: {fontSize: 20, color: "white", fontWeight: "800"}

});

export default CustomerPastBooking;