import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getBookingsForCustomer } from '../services/booking-services';

const UserBookings = props => {
    const user = useSelector(state => state.userDetails.userObj);
    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {
        getBookingsForCustomer(user.id, sucRes => setMyBookings(sucRes));
    }, []);

    const bookingsJSX = myBookings.map(booking => {
        return (
            <View key={booking.id}>
                <Text>
                    {booking.date}
                </Text>
            </View>
        );
    });

    return (
        <View>
            {bookingsJSX}
        </View>
    );
};

const styles = StyleSheet.create({

});

export default UserBookings;