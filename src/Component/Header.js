import React from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { Colors } from "../Utils";
const Header = ({ hedertitle, }) => {
    return (
        <View style={styles.mainContanier}>
            <Text style={styles.textcontainer}>{hedertitle}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContanier: {
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 11,
        paddingHorizontal: 10
    },
    textcontainer: {
        fontSize: 15,
        color: Colors.creem
    },
});
export default Header;