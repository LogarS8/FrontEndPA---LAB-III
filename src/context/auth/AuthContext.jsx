import React, { createContext, useContext, useEffect, useReducer } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import tutoApi from "../../api/tutoApi";
import { authReducer } from "./authReducer";
import { Alert } from "react-native";
import { TutoriasContext } from "../tutorias";

const authInicialState = {
  status: "checking",
  token: null,
  usuario: null,
  errorMessage: "",
};
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  const { resetState } = useContext(TutoriasContext);

  useEffect(() => {
    checkToken().then();
  }, []);

  const checkToken = async () => {
    const oldToken = await AsyncStorage.getItem("token");

    if (!oldToken) {
      return dispatch({ type: "notAuthenticated" });
    }

    const { status, data } = await tutoApi.get("/usuarios/token");

    if (status === 401) {
      await AsyncStorage.removeItem("token");
      return dispatch({ type: "notAuthenticated" });
    }

    if (status !== 200) return dispatch({ type: "notAuthenticated" });

    await AsyncStorage.setItem("token", data.token);

    dispatch({
      type: "signUp",
      payload: {
        token: data.token,
        usuario: data.usuario,
      },
    });
  };
  const signIn = async ({ correo, password }) => {
    try {
      const { data, status } = await tutoApi.post("/usuarios/login", {
        correo,
        password,
      });

      if (status !== 200) {
        Alert.alert(
          "Error",
          "No se pudo iniciar sesión, revise la información",
          [
            {
              text: "Aceptar",
            },
          ]
        );

        return dispatch({
          type: "notAuthenticated",
        });
      }

      dispatch({
        type: "signUp",
        payload: {
          token: data.token,
          usuario: data.usuario,
        },
      });
      await AsyncStorage.setItem("token", data.token);

      Alert.alert(
        "Bienvenido",
        "Bienvenido a Tutoripolis, " +
          data.usuario.nombre +
          " " +
          data.usuario.apellido +
          " , es un placer tenerte de vuelta",
        [
          {
            text: "Iniciar",
          },
        ]
      );
    } catch (error) {
      dispatch({
        type: "addError",
        payload: error.response.data.errors[0].msg || "Revise la información",
      });
    }
  };
  const signUp = async ({
    nombre,
    apellido,
    correo,
    password,
    telefono,
    rol,
  }) => {
    try {
      const { data, status } = await tutoApi.post("/usuarios", {
        nombre,
        apellido,
        correo,
        password,
        telefono,
        rol,
      });

      dispatch({
        type: "signUp",
        payload: {
          token: data.token,
          usuario: data.usuario,
        },
      });
      await AsyncStorage.setItem("token", data.token);
      Alert.alert(
        "Bienvenido",
        "Bienvenido a Tutoripolis, " +
          data.usuario.nombre +
          " " +
          data.usuario.apellido +
          " , es un placer tenerte de vuelta",
        [
          {
            text: "Iniciar",
          },
        ]
      );
    } catch (error) {
      dispatch({
        type: "addError",
        payload: error.response.data.errors[0].msg || "Revise la información",
      });
    }
  };

  const logOut = async () => {
    const removeToken = async () => {
      await AsyncStorage.removeItem("token").then(() => {
        dispatch({ type: "logout" });
      });
    };

    Alert.alert("Cerrar sesión", "¿Está seguro que desea cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Aceptar",
        onPress: () => {
          resetState();
          removeToken();
        },
      },
    ]);
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
