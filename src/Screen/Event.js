import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DrawerHeader from "../Component/DrawerHeader";
import { DrawerActions } from '@react-navigation/native';

const Event = ({ navigation }) => {
    return (
        <View>
            <DrawerHeader hedertitle='Profile'
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <Text>Event Screen</Text>
        </View>
    );
}

export default Event;