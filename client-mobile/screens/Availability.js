import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AvailableTimeSlot from '../components/AvailableTimeSlot';
import { sortTimes } from '../utils/sort-dates-util';

const Availability = ({ navigation, route }) => {
    const userEmail = useSelector(state => state.userDetails.userObj.email);
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        setAvailableSlots(route.params.availableSlots);
    }, []);



    const availableSlotsJSX = sortTimes(Object.keys(availableSlots)).map(slot => {
        return (
            <AvailableTimeSlot
                key={slot}
                time={slot}
                tables={availableSlots[slot]}
                duration={route.params.duration}
                date={route.params.date}
                userEmail={userEmail}
                navigation={navigation}
            />
        );
    });

    return (
        <ScrollView>
            {availableSlotsJSX}
        </ScrollView>
    );
};

const styles = StyleSheet.create({

});

export default Availability;