import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import { useSocket } from "../hooks/useSocket";

import { GlobalStyles } from "../theme";

const ChatScreen = ({ route }) => {
  const theme = useTheme();

  const { tutoria } = route.params;

  const [mensaje, setMensaje] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaMensajes, setListaMensajes] = useState([]);
  const [loading, setLoading] = useState(false);

  const socketRef = useSocket(
    {
      connect: () => {
        console.log("Sockets online");
      },
      disconnect: () => {
        console.log("Sockets offline");
      },
      "recibir-mensajes": setListaMensajes,
      "usuarios-activos": setListaUsuarios,
      "mensaje-privado": (payload) => {
        console.log("Privado:", payload);
      },
    },
    tutoria.nombre
  );
  useEffect(() => {
    const setTimeOutMessage = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    setTimeOutMessage().then();
  }, [listaMensajes]);

  const handleEnviar = () => {
    if (mensaje.length === 0) {
      Alert.alert("Error", "El mensaje no puede estar vacío");
    }
    socketRef.current.emit("enviar-mensaje", { mensaje });
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <Text style={GlobalStyles.title} variant="headlineSmall">
          Chat de <Text style={{ fontWeight: "bold" }}>{tutoria.nombre}</Text>
        </Text>
        <View
          style={{
            ...GlobalStyles.formContainer,
          }}
        >
          <Text variant="titleMedium">
            Usuarios conectados:{" "}
            {
              listaUsuarios.filter((user) => user.sala === tutoria.nombre)
                .length
            }
          </Text>
          {listaUsuarios.length > 0 &&
            listaUsuarios
              .filter((user) => user.sala === tutoria.nombre)
              .map((usuario, i) => {
                return (
                  <View key={i}>
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "left",
                        color: theme.colors.secondary,
                        fontWeight: "bold",
                      }}
                      variant="titleMedium"
                    >
                      {usuario.nombre}
                    </Text>
                  </View>
                );
              })}
          <Divider style={GlobalStyles.divider} />
          <View
            style={{
              maxHeight: 300,
              overflow: "scroll",
              backgroundColor: "#dcccee",
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            {listaMensajes.length > 0 &&
              listaMensajes
                .filter((mensaje) => mensaje.sala === tutoria.nombre)
                .splice(0, 10)
                .map((mensaje, i) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                      }}
                      key={i}
                    >
                      <Text
                        style={{
                          width: "auto",
                          textAlign: "left",
                          color: theme.colors.tertiary,
                          marginVertical: 1,
                          flexShrink: 1,
                          marginRight: 5,
                        }}
                        variant="bodySmall"
                      >
                        {new Date(mensaje.fecha).toLocaleTimeString()}
                      </Text>
                      <Text
                        style={{
                          width: "auto",
                          textAlign: "left",
                          color: theme.colors.secondary,
                          marginVertical: 1,
                          flexShrink: 1,
                          marginRight: 5,
                        }}
                        variant="bodySmall"
                      >
                        {mensaje.nombre}:
                      </Text>
                      <Text
                        style={{
                          width: "auto",
                          textAlign: "left",
                          marginVertical: 1,
                          flexShrink: 1,
                        }}
                        variant="bodySmall"
                      >
                        {mensaje.mensaje}
                      </Text>
                    </View>
                  );
                })}
          </View>
          <Divider style={GlobalStyles.divider} />

          <TextInput
            mode={"outlined"}
            style={GlobalStyles.inputField}
            selectionColor={theme.colors.secondary}
            activeOutlineColor={theme.colors.secondary}
            label={"Mensaje"}
            placeholder={"Escribe tu mensaje"}
            keyboardType={"default"}
            left={<TextInput.Icon icon={"message"} />}
            onChangeText={setMensaje}
            value={mensaje}
            autoCapitalize={"none"}
            autoCorrect={false}
          />
          <Divider style={GlobalStyles.divider} />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              style={{
                ...GlobalStyles.button,
                backgroundColor: theme.colors.secondary,
                width: "100%",
              }}
              onPress={handleEnviar}
              disabled={loading}
              loading={loading}
            >
              <Text style={GlobalStyles.buttonText}>Enviar</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
