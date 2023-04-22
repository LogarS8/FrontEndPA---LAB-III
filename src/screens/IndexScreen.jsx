import React from "react";

import { ScrollView, View } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";

import { TutoriasLogo } from "../components";
import { GlobalStyles } from "../theme";

const IndexScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <TutoriasLogo />
        <Divider style={GlobalStyles.divider} />
        <View style={GlobalStyles.buttonContainer}>
          <Button
            style={{
              ...GlobalStyles.button,
              backgroundColor: theme.colors.secondary,
              width: "100%",
            }}
            onPress={() => navigation.navigate("Iniciar sesión")}
          >
            <Text style={GlobalStyles.buttonText}>Iniciar sesión</Text>
          </Button>
          <Button
            style={{
              ...GlobalStyles.button,
              backgroundColor: theme.colors.tertiary,
              width: "100%",
            }}
            onPress={() => navigation.navigate("Registrarse")}
          >
            <Text style={GlobalStyles.buttonText}>Crear una nueva cuenta</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default IndexScreen;
