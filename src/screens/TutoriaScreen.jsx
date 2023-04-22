import React from "react";

import { View } from "react-native";
import TutoriaBottomNav from "../navigator/BottomNavigation";

const TutoriaScreen = ({ route }) => {
  const { tutoria } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <TutoriaBottomNav tutoria={tutoria} />
    </View>
  );
};

export default TutoriaScreen;
