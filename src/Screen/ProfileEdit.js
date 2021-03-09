import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, } from "react-native";
import DrawerHeader from "../Component/DrawerHeader";
import { DrawerActions } from '@react-navigation/native';
import Textinput from "../Component/Textinput";
import { Colors } from '../Utils';
import RadioButton from "../Component/RadioButton";
import Button from "../Component/Button";
import { decrypt, encrypt } from 'react-native-simple-encryption';
import { Context as Authcontext } from "../context/Authcontext";

const ProfileEdit = ({ navigation, route }) => {

    const [indexValue, setindexValue] = useState(null);
    const { state, getUserData, updateUserDate } = useContext(Authcontext);
    const [radioButton, setradioButton] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [ErrMsg, setErrMsg] = useState(null);
    const Email_validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    const Pass_validation = /^.*(?=.{8,64})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.:?]).*$/;

    const handleData = () => {
        if (email !== null && name !== null && password !== null && radioButton !== null) {
            let object = {
                name: name,
                email: email,
                password: encrypt('@123', password),
                gender: radioButton
            };
            () => navigation.navigate('Profile');
            updateUserDate({ object }, () => navigation.navigate('Profile'))
        } else {
            console.log('fill all information');
        }


    }
    useEffect(() => {
        if (state.UserData !== undefined) {
            setName(state.UserData.name);
            setEmail(state.UserData.email);
            setradioButton(state.UserData.gender);
            setPassword(decrypt('@123', state.UserData.password));
        } else {
            getUserData();
        }
    }, [])


    const nameHandle = (name) => {

        setName(name)
        setindexValue(0);
        setErrMsg(null)
        if (name.length === 0) {
            setErrMsg('Name is Require!');
        }
    }

    const emailHandle = (email) => {
        setEmail(email)
        setindexValue(1);
        if (email.length === 0) {
            setErrMsg('Email is Require!');
        }
        else if (Email_validation.test(email) === false) {
            setErrMsg('Email is not valid!')
        } else if (Email_validation.test(email) === true && email.length !== 0) {
            setErrMsg(null);
        }
    }
    const passwordHandle = (password) => {
        console.log(password);
        setPassword(password);
        setindexValue(2);
        if (password.length === 0) {
            setErrMsg('Password is Require!');
        } else if (password.length < 8) {
            setErrMsg('Password must be 8 characters!');
        } else if (Pass_validation.test(password) === false) {
            setErrMsg('Passwrod in Enter Uppercase Lowercase Special charcter and Number')
        } else if (password.length > 7 && Pass_validation.test(password) === true) {
            setErrMsg(null)
        }
    }
    return (
        <>
            <DrawerHeader hedertitle='Profile'
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <View style={{ backgroundColor: Colors.blue, flex: 1 }} >
                <View style={{ flex: 1 }}>
                    <Text>Profile</Text>
                </View>
                <View style={{ flex: 3 }}>

                    <Textinput

                        label='Name'
                        placeholder='Enter the name'
                        value={name}
                        onChangeText={(value) => nameHandle(value)}
                    />
                    {0 === indexValue && ErrMsg && <Text style={styles.errMsgcontainer}>{ErrMsg} </Text>}
                    <Textinput

                        label='Email'
                        placeholder='Enter the Email'
                        value={email}
                        onChangeText={(value) => emailHandle(value)}
                    />
                    {1 === indexValue && ErrMsg && <Text style={styles.errMsgcontainer}>{ErrMsg} </Text>}
                    <Textinput

                        label='Password'
                        placeholder='Enter the Password'
                        value={password}
                        onChangeText={(value) => passwordHandle(value)}
                        secureTextEntry={true}
                    />
                    {2 === indexValue && ErrMsg && <Text style={styles.errMsgcontainer}>{ErrMsg} </Text>}
                    <RadioButton
                        value={radioButton}
                        onPress={(value) => setradioButton(value)}
                        onChangeText={(value) => setradioButton(value)}
                    />
                    <Button
                        title='Update'
                        onPress={handleData}
                    />
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    errMsgcontainer: {
        color: Colors.creem,
        marginHorizontal: 25,
    },
});

export default ProfileEdit;
