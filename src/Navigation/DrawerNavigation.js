import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SideMenu from "../Component/SideMenu";
import ProfileEdit from "../Screen/ProfileEdit";
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignOut from "../Screen/SignOut";
import Profile from "../Screen/ProfileScreen";
import Tabnavigation from '../Navigation/TabNavigation'
import Event from "../Screen/Event";
const Drawer = createDrawerNavigator();

const Drawernavigation = () => {

    return (
        <Drawer.Navigator
            drawerContent={(props) => <SideMenu {...props} />}
            initialRouteName={'Main'}
        >
            {/* <Drawer.Screen name="Main" component={Tabnavigation} /> */}
            <Drawer.Screen name='Profile' component={Profile} />
            <Drawer.Screen name="ProfileEdit" component={ProfileEdit} />
            <Drawer.Screen name="Event" component={Event} />
            {/* <Drawer.Screen name="SignOut" component={SignOut} /> */}
        </Drawer.Navigator>
    );
};


export default Drawernavigation;