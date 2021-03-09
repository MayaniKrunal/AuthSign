import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, } from "react-native";
import DrawerHeader from "../Component/DrawerHeader";
import { DrawerActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Textinput from "../Component/Textinput";
import { Colors } from '../Utils';
import RadioButton from "../Component/RadioButton";
import Button from "../Component/Button";
import { decrypt, encrypt } from 'react-native-simple-encryption';
import { Context as Authcontext } from "../context/Authcontext";
import { set } from "react-native-reanimated";

const Profile = ({ navigation, route }) => {
    const [indexValue, setindexValue] = useState(null);
    const { state, getUserData, updateUserDate } = useContext(Authcontext);
    const [radioButton, setradioButton] = useState(null);
    const [email, setemail] = useState(null);
    const [name, setname] = useState(null);
    const [password, setpassword] = useState(null);
    const [ErrMsg, setErrMsg] = useState(null);
    const Email_validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    const Pass_validation = /^.*(?=.{8,64})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.:?]).*$/;

    const handleData = () => {
        // () => navigation.navigate('ProfileEdit')
        console.log('Button Press !');
        if (email !== null && name !== null && password !== null && radioButton !== null) {
            let object = {
                name: name,
                email: email,
                password: encrypt('@123', password),
                gender: radioButton
            };
            updateUserDate({ object }, () => navigation.navigate('TabNav'))
            // SignUp({ object }, () => navigation.navigate('TabNav')
        } else {
            console.log('fill all information');
        }

    }
    useEffect(() => {
        getUserData();

        if (state.UserData !== undefined) {
            setname(state.UserData.name);
            setemail(state.UserData.email);
            setradioButton(state.UserData.gender);
            setpassword(decrypt('@123', state.UserData.password));
        }

    }, [])
    let object = {
        name: name,
        email: email,
        password: password
    };
    // console.log(object);


    const namehandle = (name) => {
        setname(name);
        setindexValue(0);
        setErrMsg(null)
        if (name.length === 0) {
            setErrMsg('Name is Require!');
        }
    }
    const emailHandle = (email) => {
        setemail(email);
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
        setpassword(password);
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
                        onChangeText={(value) => namehandle(value)}
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

export default Profile;