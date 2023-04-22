import React from "react";
import { Image, View } from "react-native";

const AuthLogo = () => {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 30,
        borderRadius: 100,
      }}
    >
      <Image
        source={require("../assets/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper.png")}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </View>
  );
};

export { AuthLogo };
