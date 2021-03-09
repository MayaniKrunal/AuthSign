import React, { useState } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import DrawerHeader from "../Component/Header";
import Profile from "../Screen/ProfileScreen";
import Search from "../Screen/SearchScreen";
import Event from "../Screen/Event";
import { Colors } from "../Utils";
import auth from '@react-native-firebase/auth';

const Data = [

    { index: 0, name: 'Profile', title: 'Profile' },
    { index: 1, name: 'ProfileEdit', title: 'Edit' },
    { index: 2, name: 'Event', title: 'Event' },
];

const SideMenu = ({ navigation }) => {

    const [colorIndex, setcolorIndex] = useState(0);


    const SignOut = () => {
        auth().signOut().then(() => {
            console.log(' signed out!');
            navigation.navigate('Signin')
        })
    }
    return (
        <>
            {/* <DrawerHeader /> */}
            <View style={{ justifyContent: 'space-between', flex: 1, backgroundColor: Colors.blue }}>
                <View>
                    {Data.map((item, index) =>
                        <View
                            key={index}
                            style={[styles.buttonViewContainer]}
                        >
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setcolorIndex(item.index);
                                    navigation.navigate(item.name)
                                }}
                            >
                                <Text style={{ color: colorIndex === index ? Colors.creem : Colors.white }} >{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View
                    style={[styles.buttonViewContainer, { backgroundColor: '#ebd19d', marginHorizontal: 10, marginBottom: 10 }]}
                >
                    <TouchableOpacity
                        onPress={SignOut}
                    >
                        <Text style={{ color: Colors.blue, alignSelf: 'center' }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    buttonViewContainer: {
        // backgroundColor: '#ebd19d',
        marginVertical: 2,
        paddingVertical: 10,
        paddingLeft: 10
    }
});

export default SideMenu;