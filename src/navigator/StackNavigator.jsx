import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/auth";
import { Image, View } from "react-native";
import IndexScreen from "../screens/IndexScreen";
import InicioScreen from "../screens/InicioScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TutoriasInscritasScreen from "../screens/TutoriasInscritasScreen";
import TutoriasPropiasScreen from "../screens/TutoriasPropiasScreen";
import NuevaTutoriaScreen from "../screens/NuevaTutoriaScreen";
import TutoriaScreen from "../screens/TutoriaScreen";
import { Button, Text, useTheme } from "react-native-paper";
import { GlobalStyles } from "../theme";
import { Loading } from "../components";

const Logo = require("../assets/logo.jpg");

const Stack = createStackNavigator();
createBottomTabNavigator();

const LogoTitle = ({ title }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Image
      source={Logo}
      style={{ width: 40, height: 40, borderRadius: 50 }}
      resizeMode="contain"
    />
    <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
      {title}
    </Text>
  </View>
);

const BtnLogOut = ({ logOut, theme }) => {
  return (
    <Button
      onPress={logOut}
      mode="text"
      style={{
        ...GlobalStyles.button,
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary,
      }}
    >
      <Text style={{ ...GlobalStyles.buttonText, fontSize: 10 }}>
        Cerrar sesión
      </Text>
    </Button>
  );
};

const StackNavigator = () => {
  const { status, logOut } = useContext(AuthContext);
  const theme = useTheme();

  if (status === "checking") return <Loading color={theme.colors.secondary} />;

  return (
    <Stack.Navigator
      initialRouteName={status !== "authenticated" ? "Index" : "Inicio"}
      screenOptions={{
        cardStyle: { backgroundColor: "white" },
        headerStyle: { backgroundColor: theme.colors.secondary },
        headerTintColor: "white",
      }}
    >
      {status === "authenticated" && (
        <>
          <Stack.Screen
            name="Inicio"
            component={InicioScreen}
            options={{
              headerRight: () => <BtnLogOut logOut={logOut} theme={theme} />,
              headerTitle: () => <LogoTitle title={"Inicio"} />,
            }}
          />
          <Stack.Screen
            name="Tutorias Inscritas"
            component={TutoriasInscritasScreen}
            options={{
              headerRight: () => <BtnLogOut logOut={logOut} theme={theme} />,
              headerTitle: () => <LogoTitle title={"Tutorias Inscritas"} />,
            }}
          />
          <Stack.Screen
            name="Tutorias Propias"
            component={TutoriasPropiasScreen}
            options={{
              headerRight: () => <BtnLogOut logOut={logOut} theme={theme} />,
              headerTitle: () => <LogoTitle title={"Tutorias Propias"} />,
            }}
          />
          <Stack.Screen
            name="Nueva Tutoria"
            component={NuevaTutoriaScreen}
            options={{
              headerRight: () => <BtnLogOut logOut={logOut} theme={theme} />,
              headerTitle: () => <LogoTitle title={"Nueva Tutoria"} />,
            }}
          />
          <Stack.Screen
            name="Tutoria"
            component={TutoriaScreen}
            options={{
              headerRight: () => <BtnLogOut logOut={logOut} theme={theme} />,
              headerTitle: () => <LogoTitle title={"Tutoria"} />,
            }}
          />
        </>
      )}
      {status === "not-authenticated" && (
        <>
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={{
              headerTitle: () => <LogoTitle title={"Tutoripolis"} />,
            }}
          />
          <Stack.Screen
            name="Iniciar sesión"
            component={LoginScreen}
            options={{
              headerTitle: () => <LogoTitle title={"Iniciar sesión"} />,
            }}
          />
          <Stack.Screen
            name="Registrarse"
            component={RegisterScreen}
            options={{
              headerTitle: () => <LogoTitle title={"Registrarse"} />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
