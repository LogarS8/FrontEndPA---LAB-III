import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ChatScreen from "../screens/ChatScreen";
import AjustesScreen from "../screens/AjustesScreen";
import ArchivosScreen from "../screens/ArchivosScreen";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const TutoriaBottomNav = ({ tutoria }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === "Chat"
              ? "comment"
              : route.name === "Archivos"
              ? "inbox"
              : "cog";

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6C5585",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: [{ display: "flex" }, null],
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} initialParams={{tutoria}} />
      <Tab.Screen
        name="Archivos"
        component={ArchivosScreen}
        initialParams={{tutoria}}
      />
      <Tab.Screen
        name="Ajustes"
        component={AjustesScreen}
        initialParams={{tutoria}}
      />
    </Tab.Navigator>
  );
};

export default TutoriaBottomNav;
