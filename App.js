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
import { Provider as StoreProvider } from 'react-redux'
import store from "./src/Store/index";
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
      <StoreProvider store={store}>
        <Authprovider>
          <App />
        </Authprovider>
      </StoreProvider>
    );
  };
