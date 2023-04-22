import React, { useContext, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";

import { TutoriasContext } from "../context/tutorias";
import { GlobalStyles } from "../theme";
import tutoApi from "../api/tutoApi";
import { AuthContext } from "../context/auth";
import { Loading } from "../components";

const TutoriasInscritasScreen = ({ navigation }) => {
  const {
    status,
    tutoriasInscritas,
    getTutoriasDisponibles,
    getTutoriasInscritas,
    removeError,
    errorMessage,
  } = useContext(TutoriasContext);
  const { usuario } = useContext(AuthContext);

  const theme = useTheme();

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Error al obtener las tutorias", errorMessage, [
      { text: "OK", onPress: () => removeError() },
    ]);
  }, [errorMessage]);

  useEffect(() => {
    getTutoriasInscritas();
  }, []);

  const handleDesinscribirse = async ({ _id }) => {
    try {
      await tutoApi.put(`/tutorias/alumno/eliminar/${_id}`, {
        alumno: usuario.uid || "",
      });
      Alert.alert("Inscripcion", "Se ha desinscrito de la tutoria");
      getTutoriasInscritas();
      getTutoriasDisponibles();
    } catch (error) {
      console.log(error);
      Alert.alert("Inscripcion", "Error al inscribirse a la tutoria");
    }
  };

  const handleAbrirTutoria = (tutoria) => {
    navigation.navigate("Tutoria", { tutoria });
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        {status === "loading" && <Loading color={theme.colors.error} />}

        {status === "error" && (
          <Text variant="bodySmall">Error al obtener las tutorias</Text>
        )}

        {status === "success" &&
          tutoriasInscritas.length > 0 &&
          tutoriasInscritas.map((tutoria, index) => (
            <Card
              key={index}
              style={{
                marginVertical: 5,
                marginHorizontal: 5,
                borderRadius: 5,
              }}
            >
              <Card.Content>
                <Card.Title
                  title={tutoria.nombre}
                  subtitle={tutoria.tutor.nombre + " " + tutoria.tutor.apellido}
                  left={(props) => <Avatar.Icon icon={"account"} {...props} />}
                />
                <Text variant="bodyMedium">
                  Materia: {tutoria.materia.materia}
                </Text>
                <Text variant="bodyMedium">
                  Descipcion: {tutoria.descripcion}
                </Text>
                <Divider style={{ marginVertical: 10 }} />
                <Card.Actions>
                  <View style={GlobalStyles.buttonContainer}>
                    <Button
                      mode="contained-tonal"
                      onPress={() => handleAbrirTutoria(tutoria)}
                      style={{
                        ...GlobalStyles.button,
                        backgroundColor: theme.colors.secondary,
                        width: "100%",
                      }}
                      icon={"open-in-new"}
                    >
                      <Text
                        variant={"labelSmall"}
                        style={{ color: theme.colors.primary }}
                      >
                        Abrir Tutoria
                      </Text>
                    </Button>
                    <Button
                      mode="contained-tonal"
                      onPress={() => {
                        Alert.alert(
                          "Desinscribirse",
                          "¿Está seguro que desea desinscribirse de la tutoria?",
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () => handleDesinscribirse(tutoria),
                            },
                          ]
                        );
                      }}
                      style={{
                        ...GlobalStyles.button,
                        backgroundColor: theme.colors.tertiary,
                        width: "100%",
                      }}
                      icon={"delete"}
                    >
                      <Text
                        variant={"labelSmall"}
                        style={{ color: theme.colors.primary }}
                      >
                        Desinscribirse
                      </Text>
                    </Button>
                  </View>
                </Card.Actions>
              </Card.Content>
            </Card>
          ))}
        {status === "success" && tutoriasInscritas.length === 0 && (
          <Text
            variant="bodySmall"
            style={{
              textAlign: "center",
              borderWidth: 0.5,
              borderColor: theme.colors.error,
              margin: 10,
            }}
          >
            No hay tutorias disponibles
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default TutoriasInscritasScreen;
