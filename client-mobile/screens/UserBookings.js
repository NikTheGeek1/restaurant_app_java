import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { getBookingsForCustomer } from '../services/booking-services';
import CustomerPastBooking from '../components/CustomerPastBooking';
import { sortBookingByDate } from '../utils/sort-dates-util';

const UserBookings = ({ navigation, route}) => {
    const user = useSelector(state => state.userDetails.userObj);
    const [myBookings, setMyBookings] = useState([]);
    
    useEffect(() => {
        getBookingsForCustomer(user.id, sucRes => setMyBookings(sucRes));
        const unsubscribe = navigation.addListener('focus', () => {
            getBookingsForCustomer(user.id, sucRes => setMyBookings(sucRes));
        });

        return unsubscribe;
      }, [navigation, myBookings]);

    const bookingsJSX = sortBookingByDate(myBookings, 'desc').map(booking => {
        return (
            <CustomerPastBooking key={booking.id} booking={booking} setMyBookings={setMyBookings} navigation={navigation}/>
        );
    });

    return (
        <ScrollView style={styles.container}>
            {bookingsJSX}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bookingContainer: {
        width: "80%",
        backgroundColor: "red",
        alignSelf: "center",
        height: 150
    }
});

export default UserBookings;