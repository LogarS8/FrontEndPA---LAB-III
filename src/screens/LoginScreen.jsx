import React, { useContext, useEffect, useState } from "react";

import { Alert, Keyboard, ScrollView, View } from "react-native";

import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

import { AuthContext } from "../context/auth";
import { AuthLogo } from "../components";
import { GlobalStyles } from "../theme";
import { useForm } from "../hooks";
import { Loading } from "../components";

const LoginScreen = ({ navigation }) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const { correo, password, onChange } = useForm({
    correo: "",
    password: "",
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Login incorrecto", errorMessage, [
      {
        text: "Ok",
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    Keyboard.dismiss();

    if (correo.length === 0 || password.length === 0) {
      Alert.alert("Login incorrecto", "Todos los campos son obligatorios", [
        {
          text: "Ok",
        },
      ]);
      return;
    }
    setIsLoading(true);
    signIn({ correo, password });
    if (isLoading) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading color={theme.colors.secondary} />;
  }

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <AuthLogo />
        <Text style={GlobalStyles.title} variant="headlineSmall">
          Iniciar sesión
        </Text>

        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Correo"}
          placeholder={"Ingrese su correo"}
          keyboardType={"email-address"}
          left={<TextInput.Icon icon="email" />}
          onChangeText={(value) => onChange(value, "correo")}
          value={correo}
          autoCapitalize={"none"}
          autoCorrect={false}
          onSubmitEditing={onLogin}
        />

        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Contraseña"}
          placeholder={"Ingrese su contraseña"}
          keyboardType={"default"}
          left={<TextInput.Icon icon="lock" />}
          onChangeText={(value) => onChange(value, "password")}
          value={password}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry
          onSubmitEditing={onLogin}
        />
        <Divider style={GlobalStyles.divider} />
        <View style={GlobalStyles.buttonContainer}>
          <Button
            mode="contained-tonal"
            style={{
              ...GlobalStyles.button,
              backgroundColor: theme.colors.secondary,
              width: "100%",
            }}
            onPress={onLogin}
          >
            <Text style={GlobalStyles.buttonText}>Iniciar sesión</Text>
          </Button>
          <Button
            mode="contained-tonal"
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

export default LoginScreen;
