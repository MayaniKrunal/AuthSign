import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default Textinput = ({ label, placeholder, secureTextEntry, value, onChangeText, maxLength, editable }) => {
    return (
        <View>
            <View style={styles.subcontainer}>
                <Text style={styles.textcontainer}>{label}:</Text>
                <TextInput
                    value={value}
                    style={styles.inputstyle}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    placeholderTextColor="#8c8c8c"
                    maxLength={maxLength}
                    autoCapitalize="none"
                    editable={editable}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    inputstyle: {
        borderWidth: 1,
        fontSize: 18,
        color: '#fff',
        borderColor: '#C6AA73',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,

    },
    subcontainer: {
        marginHorizontal: 15,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    textcontainer: {
        color: '#C6AA73'
    }

});