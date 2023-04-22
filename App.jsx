import React from "react";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import StackNavigator from "./src/navigator/StackNavigator";
import { AuthProvider } from "./src/context/auth/";
import { TutoriasProvider } from "./src/context/tutorias";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    secondary: "#533971",
    tertiary: "#6C5585",
    error: "#f13a59",
  },

  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <TutoriasProvider>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <StackNavigator />
          </PaperProvider>
        </AuthProvider>
      </TutoriasProvider>
    </NavigationContainer>
  );
};

export default App;
