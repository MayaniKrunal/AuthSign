import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

export default AuthButton = ({ title, onPress, visible }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.buttonContainer}
            >
                {visible ? <ActivityIndicator size={18} color="#283F41" /> : <Text style={styles.textcontainer}> {title} </Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 15
    },
    textcontainer: {
        fontSize: 18,
        alignSelf: 'center',
        color: '#fff',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#C6AA73',
        borderRadius: 8,
        marginHorizontal: 20,
        padding: 10,
    }
})
