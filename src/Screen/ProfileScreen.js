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

    let object = {
        name: name,
        email: email,
        password: password,
        gender: radioButton
    };
    const Inputdata = [
        { id: 1, label: 'Name', placeholder: 'Enter the name', value: name, secureTextEntry: false, editable: false },
        { id: 2, label: 'Email', placeholder: 'Enter the email', value: email, secureTextEntry: false, editable: false },
        { id: 3, label: 'Password', placeholder: 'Enter the passwod', value: password, secureTextEntry: true, editable: false }
    ];

    useEffect(() => {

        if (state.UserData !== undefined) {
            setname(state.UserData.name);
            setemail(state.UserData.email);
            setradioButton(state.UserData.gender);
            setpassword(decrypt('@123', state.UserData.password));
        } else {
            getUserData();
        }
    }, [state.UserData])
    console.log(state);
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
                    {Inputdata.map((item, index) => {
                        return (
                            < Textinput
                                key={index}
                                label={item.label}
                                placeholder={item.placeholder}
                                value={item.value}
                                editable={item.editable}
                                secureTextEntry={item.secureTextEntry}
                            />
                        )
                    }
                    )}
                    <RadioButton
                        value={radioButton}
                    // onPress={(value) => setradioButton(value)}
                    />
                    <Button
                        title='Edit'
                        onPress={() => navigation.navigate('ProfileEdit')}
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