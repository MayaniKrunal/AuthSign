/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import StackNavigation from "./src/Navigation/StackNavigation";
import { SafeAreaView } from "react-native";
import { Provider as Authprovider } from './src/context/Authcontext';
const App = () => {

  return (
    <>
      <StackNavigation />
    </>
  );
};
export default
  () => {
    return (
      <Authprovider>
        <App />
      </Authprovider>
    );
  };
