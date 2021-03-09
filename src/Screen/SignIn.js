import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity } from "react-native";
import AuthButton from "../Component/Button";
import Textinput from "../Component/Textinput";
import auth from '@react-native-firebase/auth';
import { Colors, Icons } from "../Utils";
import { encrypt, decrypt } from 'react-native-simple-encryption';
import { Context as Authcontext } from "../context/Authcontext";
export default SignIn = ({ navigation }) => {
    const { state, SignIn, AutoSign } = useContext(Authcontext);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const [loading, setloading] = useState(false);
    const [EmailErrmsg, setEmailErrmsg] = useState(null);
    const [PasswordErrMsg, setpasswordErrMsg] = useState(null);
    const [ErrMsg, setErrMsg] = useState(null);
    const Email_validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const Pass_validation = /^.*(?=.{8,64})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.:?]).*$/;


    useEffect(() => {
        var user = auth().currentUser;
        if (user !== null) {
            // console.log('user is :', user)
            navigation.navigate('TabNav')
            // setErrMsg(null);
        }
    }, [])

    const valigationform = () => {
        if (email !== null && password !== null) {
            SignIn({ email, password }, () => navigation.navigate('TabNav'))
            // setloading(true);
            // auth().signInWithEmailAndPassword(email, encrypt('@123', password))
            //     .then((res) => {
            //         console.log(res.user.uid);
            //         console.log(' signed in!');
            //         setErrMsg(null);
            //         navigation.navigate('TabNav')
            //         setloading(false);
            //     })
            //     .catch((error) => {
            // setloading(false);
            //         setErrMsg('Email address and password is worng!');
            //     });
        }
    }
    const emailHandle = (email) => {
        setemail(email);
        if (email.length === 0) {
            setEmailErrmsg('Email is Require!');
        } else if (Email_validation.test(email) === false) {
            setEmailErrmsg('Email is not valid!')
        } else if (Email_validation.test(email) === true && email.length !== 0) {
            setEmailErrmsg(null);
        }
    }

    const passwordHandle = (password) => {
        setpassword(password);
        if (password.length === 0) {
            setpasswordErrMsg('Password is Require!');
        } else if (password.length < 8) {
            setpasswordErrMsg('Password must be 8 characters!');
        } else if (Pass_validation.test(password) === false) {
            setpasswordErrMsg('Passwrod in Enter Uppercase Lowercase Special charcter and Number')
        } else if (password.length > 7 && Pass_validation.test(password) === true) {
            setpasswordErrMsg(null)
        }
    }
    return (
        <ImageBackground
            source={require('../../Assets/Images/background.jpg')}
            style={{ flex: 1, resizeMode: "cover" }}
        >
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.subcontainer}>

                    <Image
                        source={Icons.logo}
                        style={styles.imagecontainer}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Textinput
                        label="Email"
                        placeholder="email"
                        value={email}
                        onChangeText={emailHandle}
                        secureTextEntry={false}
                    />
                    {EmailErrmsg && <Text style={styles.errMsgcontainer}>{EmailErrmsg} </Text>}
                    <Textinput
                        label="Password"
                        placeholder="password"
                        value={password}
                        onChangeText={passwordHandle}
                        secureTextEntry={true}
                        maxLength={64}
                    />
                    {PasswordErrMsg && <Text style={styles.errMsgcontainer}>{PasswordErrMsg} </Text>}
                    <AuthButton title='Sigin In'
                        visible={loading}
                        onPress={valigationform}
                    />
                    {ErrMsg && <Text style={[styles.errMsgcontainer, { alignSelf: 'center', marginBottom: 10 }]}>{ErrMsg} </Text>}

                    <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                        <Text>Don't have account? </Text>

                        <Text style={styles.textcontainer}
                            onPress={() => navigation.navigate('SignUp')}
                        >Create new account</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({

    imagecontainer: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        tintColor: Colors.creem,
    },
    subcontainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    errMsgcontainer: {
        color: Colors.creem,
        marginHorizontal: 20
    },
    textcontainer: {
        color: '#C6AA73'
    }
})
