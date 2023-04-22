import React, { useContext, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { Avatar, Card } from "react-native-paper";

import { TutoriasContext } from "../context/tutorias";
import { GlobalStyles } from "../theme";
import { useTheme, Text, Button, Divider, List } from "react-native-paper";
import tutoApi from "../api/tutoApi";
import { AuthContext } from "../context/auth";
import { Loading } from "../components";

const InicioScreen = ({ navigation }) => {
  const {
    status,
    tutoriasDisponibles,
    getTutoriasDisponibles,
    removeError,
    errorMessage,
  } = useContext(TutoriasContext);

  const { usuario } = useContext(AuthContext);
  const theme = useTheme();

  useEffect(() => {
    getTutoriasDisponibles();
  }, []);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert("Error al obtener las tutorias", errorMessage, [
      { text: "OK", onPress: () => removeError() },
    ]);
  }, [errorMessage]);



  const handleInscribirse = async ({ _id }) => {
    try {
      await tutoApi.put(`/tutorias/alumno/agregar/${_id}`, {
        alumno: usuario.uid,
      });

      Alert.alert("Inscripcion", "Se ha inscrito a la tutoria");

      getTutoriasDisponibles();
    } catch (error) {
      console.log(error);

      Alert.alert("Inscripcion", "Error al inscribirse a la tutoria");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <Text style={GlobalStyles.title} variant="titleLarge">
          Tus Tutorias Creadas
        </Text>
        <List.Section>
          <View style={GlobalStyles.row}>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate("Tutorias Propias")}
              style={{
                ...GlobalStyles.button,
                backgroundColor: theme.colors.secondary,
                flex: 1,
              }}
              icon={"eye"}
            >
              <Text
                variant={"bodySmall"}
                style={{
                  ...GlobalStyles.buttonText,
                  color: theme.colors.primary,
                  fontSize: 10,
                }}
              >
                Ver Tutorias Creadas
              </Text>
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate("Nueva Tutoria")}
              style={{
                ...GlobalStyles.button,
                backgroundColor: theme.colors.secondary,
                flex: 1,
              }}
              icon={"folder-plus"}
            >
              <Text
                variant={"bodySmall"}
                style={{ color: theme.colors.primary, fontSize: 10 }}
              >
                Crear Tutoria
              </Text>
            </Button>
          </View>
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />
        <Text style={GlobalStyles.title} variant="titleLarge">
          Tus Tutorias Inscritas
        </Text>
        <List.Section>
          <View style={GlobalStyles.row}>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate("Tutorias Inscritas")}
              style={{
                ...GlobalStyles.button,
                backgroundColor: theme.colors.secondary,
                flex: 1,
              }}
              icon={"eye"}
            >
              <Text
                variant={"bodySmall"}
                style={{ ...GlobalStyles.buttonText, fontSize: 10 }}
              >
                Ver Tutorias Inscritas
              </Text>
            </Button>
          </View>
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />
        <Text style={GlobalStyles.title} variant="titleLarge">
          Tutorias Disponibles
        </Text>
        <List.Section>
          <ScrollView style={{ maxHeight: 300 }}>
            {status === "loading" && <Loading color={theme.colors.error} />}

            {status === "error" && (
              <Text variant="bodySmall">Error al obtener las tutorias</Text>
            )}

            {status === "success" &&
              tutoriasDisponibles &&
              tutoriasDisponibles.map((tutoria, index) => (
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
                      subtitle={
                        tutoria.tutor.nombre + " " + tutoria.tutor.apellido
                      }
                      left={(props) => (
                        <Avatar.Icon icon={"account"} {...props} />
                      )}
                    />
                    <Text variant="bodyMedium">
                      Materia: {tutoria.materia.materia}
                    </Text>
                    <Text variant="bodyMedium">
                      Descipcion: {tutoria.descripcion}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{
                        color: theme.colors.secondary,
                        fontWeight: "bold",
                      }}
                    >
                      Cupo: {tutoria.cupo}
                    </Text>
                    <Divider style={{ marginVertical: 10 }} />
                    <Card.Actions>
                      <Button
                        mode="contained-tonal"
                        onPress={() => {
                          Alert.alert(
                            "Inscripcion",
                            "¿Desea inscribirse a esta tutoria?",
                            [
                              {
                                text: "OK",
                                onPress: () =>
                                  handleInscribirse({
                                    _id: tutoria._id,
                                  }),
                              },
                              { text: "Cancelar", onPress: () => {} },
                            ]
                          );
                        }}
                        style={{
                          ...GlobalStyles.button,
                          backgroundColor: theme.colors.secondary,
                          width: "100%",
                        }}
                        icon={"plus"}
                      >
                        <Text
                          variant={"bodySmall"}
                          style={{ color: theme.colors.primary }}
                        >
                          Inscribirse
                        </Text>
                      </Button>
                    </Card.Actions>
                  </Card.Content>
                </Card>
              ))}
            {status === "success" && tutoriasDisponibles.length === 0 && (
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
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default InicioScreen;
