import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, } from "react-native";
import DrawerHeader from "../Component/DrawerHeader";
import { DrawerActions } from '@react-navigation/native';
import Textinput from "../Component/Textinput";
import { Colors } from '../Utils';
import RadioButton from "../Component/RadioButton";
import Button from "../Component/Button";
import { decrypt, } from 'react-native-simple-encryption';
import { Context as Authcontext } from "../context/Authcontext";
import { connect, useDispatch, useSelector } from 'react-redux';
import { UserGetData } from "../Action/AuthAction";
const Profile = ({ navigation }) => {

    // const { state, getUserData, } = useContext(Authcontext);
    const [radioButton, setradioButton] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [time, settime] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.GetData)

    const Inputdata = [
        { id: 1, label: 'Name', placeholder: 'Enter the name', value: name, secureTextEntry: false, editable: false },
        { id: 2, label: 'Email', placeholder: 'Enter the email', value: email, secureTextEntry: false, editable: false },
        { id: 3, label: 'Password', placeholder: 'Enter the passwod', value: password, secureTextEntry: true, editable: false }
    ];

    useEffect(() => {
        if (data && data.length !== 0) {
            setName(data.name);
            setEmail(data.email);
            setradioButton(data.gender);
            setPassword(decrypt('@123', data.password));
        } else {
            dispatch(UserGetData());
        }
    }, [data]);
    setTimeout(() => {
        settime(true);
    }, 900);
    return (
        <>
            <DrawerHeader hedertitle='Profile'
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
});

export default Profile;