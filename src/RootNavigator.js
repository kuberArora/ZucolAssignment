import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";
import Dashboard from "./Dashboard";

import Main from "./Main";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Dashboard" component={Dashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;