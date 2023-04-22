import React, { useContext, useEffect, useState } from "react";

import { Alert, Keyboard, ScrollView, View } from "react-native";

import { SelectList } from "react-native-dropdown-select-list";

import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

import { GlobalStyles } from "../theme";
import { useForm } from "../hooks";
import { TutoriasContext } from "../context/tutorias";
import { AuthContext } from "../context/auth";
import tutoApi from "../api/tutoApi";

const NuevaTutoriaScreen = ({ navigation }) => {
  const { status, materias, getMaterias, errorMessage, removeError } =
    useContext(TutoriasContext);

  const { usuario } = useContext(AuthContext);

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const materiaList = materias.map((materia) => {
    return { key: String(materia._id), value: String(materia.materia) };
  });

  const { nombre, cupo, descripcion, onChange } = useForm({
    nombre: "",
    cupo: "",
    descripcion: "",
  });

  const [selectedMateria, setSelectedMateria] = useState("");

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Login incorrecto", errorMessage, [
      {
        text: "Ok",
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  useEffect(() => {
    getMaterias();
  }, []);

  const createTutoria = async () => {
    Keyboard.dismiss();

    if (
      nombre.length === 0 ||
      cupo.length === 0 ||
      selectedMateria.length === 0 ||
      descripcion.length === 0 ||
      usuario.uid.length === 0
    ) {
      return;
    }

    if (cupo > 20) {
      Alert.alert("Cupo incorrecto", "El cupo no puede ser mayor a 20", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    setIsLoading(true);
    const body = {
      nombre,
      materia: selectedMateria,
      tutor: usuario.uid,
      cupo,
      descripcion,
    };

    const tutoria = await tutoApi
      .post("/tutorias", body)
      .finally(() => setIsLoading(false));

    if (tutoria.status !== 200) {
      Alert.alert("Error", "Ha ocurrido un error al crear la tutoria", [
        { text: "Ok" },
      ]);
    }

    Alert.alert("Tutoria creada", "La tutoria se ha creado correctamente", [
      { text: "Ok" },
    ]);
    navigation.navigate("Tutorias Propias");
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <Text style={GlobalStyles.title} variant="headlineSmall">
          Crear Tutoria
        </Text>
        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Nombre"}
          placeholder={"Ingrese el nombre de la tutoria"}
          keyboardType={"default"}
          left={<TextInput.Icon icon="card-text-outline" />}
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
          label={"Cupo"}
          placeholder={"Ingrese el cupo de la tutoria"}
          keyboardType={"numeric"}
          left={<TextInput.Icon icon="account-group" />}
          right={<TextInput.Icon icon="dice-d20" />}
          onChangeText={(value) => onChange(value, "cupo")}
          value={cupo}
          maxLength={2}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        {status !== "loading" && (
          <View style={{ ...GlobalStyles.inputField, marginVertical: 12 }}>
            <SelectList
              setSelected={setSelectedMateria}
              data={materiaList}
              placeholder="Seleccione una materia"
              search={false}
            />
          </View>
        )}

        <TextInput
          mode={"outlined"}
          style={GlobalStyles.inputField}
          selectionColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.secondary}
          label={"Descripcion"}
          placeholder={"Ingrese una descripcion"}
          keyboardType={"default"}
          left={<TextInput.Icon icon="card-text-outline" />}
          onChangeText={(value) => onChange(value, "descripcion")}
          value={descripcion}
          autoCapitalize={"words"}
          autoCorrect={false}
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
            onPress={createTutoria}
            loading={isLoading}
          >
            <Text style={GlobalStyles.buttonText}>Crear Tutoria</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default NuevaTutoriaScreen;
