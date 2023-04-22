import React from "react";
import { Image, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { GlobalStyles } from "../theme";

const TutoriasLogo = () => {
  const Image1 = require("../assets/d16e6ca5-9fb6-4b25-a24f-3843962cb86b.jpeg");
  const Image2 = require("../assets/01eef2a8-1d87-4529-946f-016d86b6369c.jpg");
  return (
    <View style={GlobalStyles.formContainer}>
      <Text variant="headlineSmall">¿Qué es Tutoripolis?</Text>
      <Divider style={GlobalStyles.divider} />
      <Text variant="bodyMedium">
        ¿Qué son las tutorías, cómo se puede interactuar en nuestro sistema?
      </Text>
      <Image
        source={Image1}
        style={{
          width: "100%",
          height: 155,
          borderRadius: 20,
          marginVertical: 10,
        }}
      />
      <Image
        source={Image2}
        style={{
          width: "100%",
          height: 155,
          borderRadius: 20,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export { TutoriasLogo };
