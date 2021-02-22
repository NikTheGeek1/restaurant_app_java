import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseDateAndDuration from '../screens/ChooseDateAndDuration';
import Availability from '../screens/Availability';

const Stack = createStackNavigator();
const Navigator = props => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Pick reservation date and duration" component={ChooseDateAndDuration} />
            <Stack.Screen name="Availability" component={Availability}  
            options={({ route }) => ({ title: route.params.date + " "+ route.params.duration +"m" })}/>
        </Stack.Navigator>
    );
};

export default Navigator;