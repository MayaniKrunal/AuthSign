import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Header from "../Component/Header";
import { Colors } from "../Utils";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { encrypt, decrypt } from 'react-native-simple-encryption';
// import database from '@react-native-firebase/database';
// import { firebase } from '@react-native-firebase/database';
// const databaseRef = firebase.app().database('https://authsigninsignout-default-rtdb.firebaseio.com');

import { firebase } from '@react-native-firebase/database';
const database = firebase.app().database('https://authsigninsignout-default-rtdb.firebaseio.com');
const Home = ({ navigation }) => {
    const object = {
        name: 'Test',
        email: 'test@gmail.com',
        gender: 'male',
        pass: 'Test@123'
    }

    const id = auth().currentUser.uid;
    console.log(id);
    database.ref(`/users/${id}`)
        // .get(object)
        // .then(() => console.log('Data set.'));
        .once('value')
        .then(res => {
            console.log('User data new: ', res);
        });
    // .on('child_added', snapshot => {
    //     console.log('A new node has been added', snapshot.val());
    // });


    return (
        <>
            <Header hedertitle='Home' />
            <View style={styles.subcontainer}>
                <Text>Home</Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.blue,
    },
    subcontainer: {
        marginVertical: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})
export default Home;