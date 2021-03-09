import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../Utils";
const RadioButton = ({ onPress, value }) => {

    const RadioData = [
        { id: 1, name: 'Male', title: 'Male' },
        { id: 2, name: 'Female', title: 'Female' },
        { id: 3, name: 'Other', title: 'Other' },
    ];
    return (
        <View style={styles.subcontainer}>
            {
                RadioData.map((item, index) => {
                    return (
                        <View style={styles.buttonContainer}
                            key={index}

                        >
                            <Text style={styles.textcontainer}>{item.name}</Text>
                            <TouchableOpacity
                                style={[styles.circle, { marginLeft: 5, marginRight: 20 }]}
                                onPress={() => {
                                    { onPress && onPress(item.title) }
                                }}
                            >
                                <View
                                    style={value === item.title ? styles.checkedCircle : styles.circle}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </View >
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.creem
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#8c8c8c',
    },
    subcontainer: {
        marginVertical: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    textcontainer: {
        color: Colors.creem
    }
})

export default RadioButton;