import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../Component/Header";
import { DrawerActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { connect, useDispatch, useSelector } from 'react-redux';
import { USER_DATA } from "../Action/type";

// import { useSelector, useDispatch } from 'react-redux';
const Data = [
    { index: 0, name: 'Profile' },
    { index: 1, name: 'Search' },
    { index: 2, name: 'like' }
]

const Like = ({ navigation }) => {

    const [colorIndex, setcolorIndex] = useState(0);
    const data = useSelector(state => state.user.userdata)
    console.log(data);
    return (
        <>
            <Header hedertitle='Like' />
            <View>
                <Text> Like Screen </Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

})
export default Like;