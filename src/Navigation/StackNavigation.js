import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from "../Screen/SignIn";
import SignUp from "../Screen/SiginUp";
import Tabnavigation from '../Navigation/TabNavigation'
import DrawerNavigation from "../Navigation/DrawerNavigation";
import { TouchableOpacity, Text } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import SignOut from '../Screen/SignOut';
const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <>

            <NavigationContainer>

                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,

                    }}
                >

                    <Stack.Screen name="Signin" component={SignIn} />
                    <Stack.Screen name='TabNav' component={Tabnavigation} />
                    <Stack.Screen name='SignOut' component={SignOut} />
                    <Stack.Screen name='SignUp' component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default StackNavigation;
