import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Image } from "react-native";
import AuthButton from "../Component/Button";
import Textinput from "../Component/Textinput";
import RadioButton from "../Component/RadioButton";
import { Icons, Colors } from "../Utils";
import firestore from '@react-native-firebase/firestore';
import { encrypt, decrypt } from 'react-native-simple-encryption';
import { Context as Authcontext } from "../context/Authcontext";


const SignUp = ({ navigation }) => {
    const { state, SignUp } = useContext(Authcontext);
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const [confirmpassword, setconfirmpassword] = useState(null);
    const [radioButton, setradioButton] = useState(null);
    const [loading, setloading] = useState(false);
    const [indexValue, setindexValue] = useState(null);
    const [ErrMsg, setErrMsg] = useState(null);
    const Email_validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const Pass_validation = /^.*(?=.{8,64})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.:?]).*$/;
    const db = firestore().collection("Users");
    const nameHandle = (name) => {
        setindexValue(0);
        setname(name);
        setErrMsg(null)
        if (name.length === 0) {
            setErrMsg('Name is Require!');
        }
    };
    const emailHandle = (email) => {
        setemail(email);
        setindexValue(1);
        setErrMsg(null)
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
    const confirmpasswordHandle = (password) => {
        setconfirmpassword(password)
        setindexValue(3);
        if (password.length === 0) {
            setErrMsg('Confirm Password is Require!');
        } else if (password.length < 8) {
            setErrMsg('Confirm Password must be 8 characters!');
        } else if (Pass_validation.test(password) === false) {
            setErrMsg('Confirm Passwrod in Enter Uppercase Lowercase Special charcter and Number')
        } else if (password.length > 7 && Pass_validation.test(password) === true) {
            setErrMsg(null)
        }
    }


    const inputData = [
        { index: 1, title: 'Name', placeholderlabel: 'Enter name', value: name, onChangeText: nameHandle, secureTextEntry: false },
        { index: 2, title: 'Email', placeholderlabel: 'Enter email', value: email, onChangeText: emailHandle, secureTextEntry: false },
        { index: 3, title: 'Password', placeholderlabel: 'Enter password', value: password, onChangeText: passwordHandle, secureTextEntry: true },
        { index: 4, title: 'Confirm Password', placeholderlabel: 'Enter confirm password', value: confirmpassword, onChangeText: confirmpasswordHandle, secureTextEntry: true },
    ];


    const valigationform = () => {

        if (email !== null && name !== null && password !== null && confirmpassword !== null && radioButton !== null) {
            if (password === confirmpassword) {
                let object = {
                    name: name,
                    email: email,
                    password: encrypt('@123', password),
                    gender: radioButton
                };
                SignUp({ object }, () => navigation.navigate('TabNav'))
            } else {
                setindexValue(3);
                setErrMsg('password is not match !!');
            }
        } else {
            console.log('fill all information');
        }
    }
    return (
        <ImageBackground
            source={require('../../Assets/Images/background.jpg')}
            style={{ flex: 1, resizeMode: "cover" }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.subcontainer}>
                    <Image
                        source={Icons.logo}
                        style={styles.imagecontainer}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    {inputData.map((item, index) => {
                        return (
                            <View
                                key={index}
                            >
                                <Textinput
                                    label={item.title}
                                    placeholder={item.placeholderlabel}
                                    value={item.value}
                                    onChangeText={item.onChangeText}
                                    secureTextEntry={item.secureTextEntry}
                                />
                                {index === indexValue && ErrMsg && <Text style={styles.errMsgcontainer}>{ErrMsg} </Text>}

                            </View>
                        )
                    })
                    }
                    <View style={{ marginLeft: 20 }}>
                        <RadioButton
                            value={radioButton}
                            onPress={(value) => setradioButton(value)}
                        />
                    </View>
                    <AuthButton title='Sigin Up'
                        visible={loading}
                        onPress={valigationform}
                    />
                    {state.signupErrMsg && <Text style={styles.errMsgcontainer}>{state.signupErrMsg} </Text>}
                    <Text onPress={() => navigation.navigate('Signin')}> Sign In</Text>

                </View>

            </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({

    imagecontainer: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        tintColor: Colors.creem,
    },
    subcontainer: {
        flex: 0.5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    errMsgcontainer: {
        color: Colors.creem,
        marginHorizontal: 25,
    },
    textcontainer: {
        color: '#C6AA73'
    }
})
export default SignUp;