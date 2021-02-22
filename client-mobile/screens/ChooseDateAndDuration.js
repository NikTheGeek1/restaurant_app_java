import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import RangeSlider from 'rn-range-slider';
import Thumb from '../components/Thumb';
import Rail from '../components/Rail';
import RailSelected from '../components/RailSelected';
import Label from '../components/Label';
import Notch from '../components/Notch';
import COLOURS from '../constants/COLOURS';
import { getAvailableBookingsGivenDateAndDuration } from '../services/booking-services';

const ChooseDateAndDuration = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState(30);

    const changeDateHandler = (event, selectedDate) => {
        setDate(selectedDate);
    };



    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value + "m"} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback(high => {
        setDuration(high);
    }, []);

    const selectDateAndDurationHandler = () => {
        // get the bookings and send them to availability tab. There 
        // display them on the screen each will be a form with its details and 
        // its own reservation button
        const dateISO = date.toISOString().slice(0, 10);
        getAvailableBookingsGivenDateAndDuration(dateISO, duration,
            sucRes => navigation.navigate("Availability", { availableSlots: sucRes, duration: duration, date: dateISO })
            );
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateTitle}>Date</Text>
                <DatePicker
                    testID="dateTimePicker"
                    style={styles.datePicker}
                    value={date}
                    is24Hour={true}
                    mode="date"
                    display="spinner"
                    onChange={(event, dateEvent) => changeDateHandler(event, dateEvent)}
                />
            </View>
            <View style={styles.durationContainer}>
                <Text style={styles.durationTitle}>Reservation duration: {duration}m</Text>
                <RangeSlider
                    style={styles.slider}
                    disableRange={true}
                    min={30}
                    high={duration}
                    max={120}
                    step={30}
                    floatingLabel
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={(high) => handleValueChange(high)}
                />
            </View>
            <Button style={styles.selectButton} title="SELECT" onPress={selectDateAndDurationHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-around' },
    dateContainer: {},
    dateTitle: { textAlign: "center", fontSize: 25, color: COLOURS.primary, marginBottom: 40 },
    durationContainer: {},
    durationTitle: { textAlign: "center", fontSize: 25, color: COLOURS.primary, marginBottom: 40 },
    slider: { width: "60%", alignSelf: "center" }
});

export default ChooseDateAndDuration;