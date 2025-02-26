// App.js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ColorGuessingGame from "./ColorGuessingGame";
import { StoreProvider } from "./ColorGuessingGame/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ColorGuessingGame"
            component={ColorGuessingGame}
            options={{ title: "Color Guessing Game" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
