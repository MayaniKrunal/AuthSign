import React from "react";
import { Image, StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from "../Screen/ProfileScreen";
import Search from "../Screen/SearchScreen";
import Home from "../Screen/Home";
import DrawerNavigation from "../Navigation/DrawerNavigation";
import { Colors, Icons, Images } from "../Utils";
import ProfileEdit from "../Screen/ProfileEdit";
import SignOut from "../Screen/SignOut";
import Event from "../Screen/Event";
import Like from "../Screen/Like";

const Tab = createBottomTabNavigator();

export default Tabnavigation = () => {


    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors.blue }} />
            <Tab.Navigator

                tabBarOptions={{
                    style: {
                        backgroundColor: Colors.blue
                    },
                    activeTintColor: Colors.creem,
                    inactiveTintColor: Colors.white,
                }}
            >
                <Tab.Screen name="Home" component={Home}

                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <Image source={Icons.home}
                                    style={[styles.imageContainer, { tintColor: color }]}
                                />
                            );

                        }
                    }}
                />
                <Tab.Screen name="Search" component={Search}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <Image source={Icons.search}
                                    style={[styles.imageContainer, { tintColor: color }]}
                                />
                            );
                        }
                    }}
                />
                <Tab.Screen name="Like" component={Like}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <Image source={Icons.like}
                                    style={[styles.imageContainer, { tintColor: color }]}
                                />
                            );
                        }
                    }}
                />
                <Tab.Screen name="Profile" component={DrawerNavigation}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <Image source={Icons.profile}
                                    style={[styles.imageContainer, { tintColor: color }]}
                                />
                            );
                        }
                    }}
                />
            </Tab.Navigator >
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
    }
})