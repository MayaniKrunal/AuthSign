import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Image } from "react-native";
import Header from "../Component/Header";
import { Colors } from "../Utils";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from "react-native-gesture-handler";

const database = firebase.app().database('https://authsigninsignout-default-rtdb.firebaseio.com');
const Home = ({ navigation }) => {
    const [item, setItem] = useState(null);
    const id = auth().currentUser.uid;
    console.log(id);
    database.ref(`/users/${id}`)
        .once('value')
        .then(res => {
            // console.log('User data new: ', res);
        });
    { item && console.log(item); }
    return (
        <>
            <Header hedertitle='Home' />
            <View style={styles.subcontainer}>
                <Text>Home</Text>

            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        ImagePicker.openPicker({
                            width: 300,
                            height: 400,
                            cropping: true
                        }).then(image => {
                            setItem(image);
                        })
                    }}
                >
                    <Text>hello</Text>
                </TouchableOpacity>

                {/* <Image
                    style={{
                        width: 90,
                        height: 90,
                        // resizeMode: 'contain',
                        borderRadius: 90 / 2,
                        overflow: 'hidden'
                    }}
                    source={{ uri: item.sourceURL }}
                /> */}
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
        // justifyContent: 'space-around',
        // flexDirection: 'row'
    }
})
export default Home;