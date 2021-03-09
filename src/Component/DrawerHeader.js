import React from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, Icons } from "../Utils";
import ProfileEdit from "../Screen/ProfileEdit";

const DrawerHeader = ({ hedertitle, onPress, onPressedit }) => {
    return (
        <View style={styles.mainContanier}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Image
                        source={Icons.list}
                        style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: Colors.creem }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.textcontainer}>{hedertitle}</Text>
            </View>
            {onPressedit && <View>
                <TouchableOpacity onPress={onPressedit} >
                    <Text style={styles.textcontainer} >Edit</Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
}
const styles = StyleSheet.create({
    mainContanier: {
        backgroundColor: Colors.blue,
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    textcontainer: {
        fontSize: 15,
        color: Colors.creem
    },
});
export default DrawerHeader;