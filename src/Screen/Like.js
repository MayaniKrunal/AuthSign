import React, { useState } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../Component/Header";
import { DrawerActions } from '@react-navigation/native';
const Data = [
    { index: 0, name: 'Profile' },
    { index: 1, name: 'Search' },
    { index: 2, name: 'like' }
]

const Like = ({ navigation }) => {

    const [colorIndex, setcolorIndex] = useState(0);

    return (
        <>
            <Header hedertitle='Profile' />

            <View>
                <Text> Like Screen </Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

})

export default Like;