import React, { useContext, useEffect, useState } from "react";

import {
  View,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";

import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

import { AuthContext } from "../context/auth";
import { useForm } from "../hooks";

import { GlobalStyles } from "../theme";
import { Loading } from "../components";

const RegisterScreen = ({ navigation }) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext);
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const { nombre, apellido, correo, telefono, password, rol, onChange } =
    useForm({
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      password: "",
      rol: "USER_ROLE",
    });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Registro incorrecto", errorMessage, [
      {
        text: "Ok",
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();
    if (
      nombre.length === 0 ||
      apellido.length === 0 ||
      correo.length === 0 ||
      telefono.length === 0 ||
      password.length === 0
    ) {
      Alert.alert("Registro incorrecto", "Todos los campos son obligatorios", [
        {
          text: "Ok",
        },
      ]);
      return;
    }
    setIsLoading(true); // Deshab// ilitar temporalmente el botón

    signUp({
      nombre,
      apellido,
      correo,
      telefono,
      password,
      rol,
    }).finally(() => {
      setIsLoading(false); // Volver a habilitar el botón después de la respuesta de signUp
    });
  };

  if (isLoading) {
    return <Loading color={theme.colors.secondary} />;
  }

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <Text style={GlobalStyles.title} variant="headlineSmall">
          Registro
        </Text>

        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Nombre"}
          placeholder={"Ingrese su nombre"}
          keyboardType={"default"}
          left={<TextInput.Icon icon="account" />}
          onChangeText={(value) => onChange(value, "nombre")}
          value={nombre}
          autoCapitalize={"words"}
          autoCorrect={false}
        />

        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Apellido"}
          placeholder={"Ingrese su apellido"}
          keyboardType={"default"}
          left={<TextInput.Icon icon="account" />}
          onChangeText={(value) => onChange(value, "apellido")}
          value={apellido}
          autoCapitalize={"words"}
          autoCorrect={false}
        />

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
        />

        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Telefono"}
          placeholder={"Ingrese su telefono"}
          keyboardType={"phone-pad"}
          left={<TextInput.Icon icon="phone" />}
          onChangeText={(value) => onChange(value, "telefono")}
          value={telefono}
          autoCapitalize={"none"}
          autoCorrect={false}
          maxLength={10}
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
            onPress={onRegister}
            loading={isLoading}
          >
            <Text style={GlobalStyles.buttonText}>Registrarse</Text>
          </Button>

          <Button
            mode="contained-tonal"
            style={{
              ...GlobalStyles.button,
              backgroundColor: theme.colors.tertiary,
              width: "100%",
            }}
            onPress={() => navigation.navigate("Iniciar sesión")}
            loading={isLoading}
          >
            <Text style={GlobalStyles.buttonText}>¿Ya tienes cuenta?</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
