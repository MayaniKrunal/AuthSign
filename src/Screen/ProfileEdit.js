import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image,ActivityIndicator } from "react-native";
import DrawerHeader from "../Component/DrawerHeader";
import { DrawerActions } from '@react-navigation/native';
import Textinput from "../Component/Textinput";
import { Colors, Icons } from "../Utils";
import RadioButton from "../Component/RadioButton";
import Button from "../Component/Button";
import { decrypt, encrypt } from 'react-native-simple-encryption';
import { Context as Authcontext } from "../context/Authcontext";
import { usergetdata, UserGetData } from "../Action/AuthAction";
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

const ProfileEdit = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.user.GetData)


    const [time, settime] = useState(false);
    const [indexValue, setindexValue] = useState(null);
    // const { state, getUserData, updateUserDate } = useContext(Authcontext);
    const [radioButton, setradioButton] = useState(data.gender);
    const [email, setEmail] = useState(data.email);
    const [name, setName] = useState(data.name);
    const [password, setPassword] = useState(decrypt('@123', data.password));
    const [ErrMsg, setErrMsg] = useState(null);
    const Email_validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    const Pass_validation = /^.*(?=.{8,64})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.:?]).*$/;
    const id = auth().currentUser.uid;
    const handleData = () => {
        if (email !== null && name !== null && password !== null && radioButton !== null) {
            let object = {
                uid: id,
                name: name,
                email: email,
                password: encrypt('@123', password),
                gender: radioButton
            };
            dispatch(usergetdata(object, () => navigation.navigate('Profile')));

            // updateUserDate({ object }, () => navigation.navigate('Profile'))
        } else {
            console.log('fill all information');
        }


    }

    useEffect(() => {
        if (data === undefined) {
            dispatch(UserGetData());
        }
            settime(false);
    }, [data]);

console.log(data);
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
    setTimeout(() => {
        settime(true);
    }, 500);
    return (
        <>
            <DrawerHeader hedertitle='Edit'
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <View style={{ backgroundColor: Colors.blue, flex: 1 }} >
                {time === false
                    ?
                    <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }} >
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                    :
                    <>   
                    <View style={styles.logoview}>
                        <Image
                            source={Icons.logo}
                            style={styles.imagecontainer}
                        />
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
                 </>
                }
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    errMsgcontainer: {
        color: Colors.creem,
        marginHorizontal: 25,
    },
    logoview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imagecontainer: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        tintColor: Colors.creem,
    },
});

export default ProfileEdit;
