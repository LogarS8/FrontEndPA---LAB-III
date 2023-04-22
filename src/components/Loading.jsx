import React from "react";
import { Text, View } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";

const Loading = ({ color }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cargando...</Text>
      <Divider style={{ marginVertical: 10 }} />
      <ActivityIndicator
        animating={true}
        color={color}
        size="large"
        style={{ marginVertical: 10 }}
      />
    </View>
  );
};

export { Loading };
