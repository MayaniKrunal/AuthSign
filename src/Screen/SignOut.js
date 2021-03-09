import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import auth from '@react-native-firebase/auth';
import DrawerHeader from "../Component/DrawerHeader";
import { DrawerActions } from '@react-navigation/native';
const SignOut = ({ navigation }) => {


    auth().signOut().then(() => {
        console.log(' signed out!');
        navigation.navigate('Signin')
    })

    useEffect(() => {

        auth().signOut().then(() => {
            console.log(' signed out!');
            navigation.navigate('Signin')
        })
    }, []);
    return (
        <View>
            <Text>Sign Out Screen</Text>
        </View>
    );
}

export default SignOut;