import React from "react";

import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { GlobalStyles } from "../theme";
const AjustesScreen = ({ route }) => {
  const theme = useTheme();
  const { tutoria } = route.params;
  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <Text style={GlobalStyles.title} variant="headlineSmall">
          Ajustes de{" "}
          <Text style={{ fontWeight: "bold" }}>{tutoria.nombre}</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default AjustesScreen;
