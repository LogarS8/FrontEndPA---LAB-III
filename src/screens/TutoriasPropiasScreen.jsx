import React, { useContext, useEffect } from "react";
import { View, Alert, ScrollView, Linking } from "react-native";
import { Avatar, Card } from "react-native-paper";

import { TutoriasContext } from "../context/tutorias";
import { GlobalStyles } from "../theme";
import { useTheme, Text, Button, Divider } from "react-native-paper";
import { Loading } from "../components/Loading";

const TutoriasPropiasScreen = ({ navigation }) => {
  const {
    status,
    tutoriasPropias,
    getTutoriasPropias,
    removeError,
    errorMessage,
  } = useContext(TutoriasContext);
  const theme = useTheme();

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Error al obtener las tutorias", errorMessage, [
      { text: "OK", onPress: () => removeError() },
    ]);
  }, [errorMessage]);

  useEffect(() => {
    getTutoriasPropias();
  }, []);

  const handlePress = (link) => {
    Linking.openURL(link).then();
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
          <Text
            variant="bodySmall"
            style={{
              textAlign: "center",
              borderWidth: 0.5,
              borderColor: theme.colors.error,
              margin: 10,
            }}
          >
            Error al obtener las tutorias
          </Text>
        )}

        {status === "success" &&
          tutoriasPropias.length > 0 &&
          tutoriasPropias.map((tutoria, index) => (
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
                  left={(props) => (
                    <Avatar.Icon icon={"file-document"} {...props} />
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
                <ScrollView style={{ maxHeight: 100, marginBottom: 5 }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.secondary,
                      fontWeight: "bold",
                    }}
                  >
                    Alumnos:
                  </Text>
                  {tutoria.alumnos.length > 0 ? (
                    tutoria.alumnos.map((alumno, index) => (
                      <Text variant="bodyMedium" key={index}>
                        {alumno.nombre} {alumno.apellido}
                      </Text>
                    ))
                  ) : (
                    <Text variant="bodySmall">No hay alumnos</Text>
                  )}
                </ScrollView>
                <ScrollView style={{ maxHeight: 100, marginBottom: 5 }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.secondary,
                      fontWeight: "bold",
                    }}
                  >
                    URLs:
                  </Text>
                  {tutoria.urls.length > 0 ? (
                    tutoria.urls.map((url, index) => (
                      <Text
                        variant="bodyMedium"
                        key={index}
                        onPress={() => handlePress(url.url)}
                        style={{ color: theme.colors.secondary }}
                      >
                        Archivo {index + 1}: "{url.url.substring(0, 20)}..."
                      </Text>
                    ))
                  ) : (
                    <Text variant="bodySmall">No hay tutores</Text>
                  )}
                </ScrollView>

                <Divider style={{ marginVertical: 10 }} />
                <Card.Actions>
                  <Button
                    mode="contained-tonal"
                    onPress={() => handleAbrirTutoria(tutoria)}
                    style={{
                      ...GlobalStyles.button,
                      backgroundColor: theme.colors.secondary,
                      width: "100%",
                    }}
                    icon={"file-document-edit"}
                  >
                    <Text
                      variant={"bodySmall"}
                      style={{ color: theme.colors.primary }}
                    >
                      Abrir Tutoria
                    </Text>
                  </Button>
                </Card.Actions>
              </Card.Content>
            </Card>
          ))}
        {status === "success" && tutoriasPropias.length === 0 && (
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

export default TutoriasPropiasScreen;
