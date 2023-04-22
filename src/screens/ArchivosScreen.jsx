import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Alert, Linking, ScrollView, View } from "react-native";
import Sha1 from "crypto-js/sha1";

import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Text,
  useTheme,
} from "react-native-paper";

import { GlobalStyles } from "../theme";

import tutoApi from "../api/tutoApi";
import axios from "axios";

const ArchivosScreen = ({ route }) => {
  const theme = useTheme();
  const { _id, nombre } = route.params.tutoria;

  const [urls, setUrls] = useState({});

  useEffect(() => {
    const getURLs = async (id) => {
      try {
        const resp = await tutoApi.get(`/tutorias/${id}`);
        return resp.data.urls;
      } catch (error) {
        console.log(error);
      }
    };

    getURLs(_id).then((urls) => {
      setUrls(urls);
    });
  }, []);

  // [{"_id": "64413011534c34ec1667bd8a", "public_id": "Tutoripolis/image/nggqqyxfrr1uxhbwrwb9", "tipo": "image", "url": "https://res.cloudinary.com/dchphczrm/image/upload/v1681993736/Tutoripolis/image/nggqqyxfrr1uxhbwrwb9.jpg"}, {"_id": "64413321534c34ec1667be1d", "public_id": "Tutoripolis/image/ogrz3cmmcpnnt2ztpw5o", "tipo": "image", "url": "https://res.cloudinary.com/dchphczrm/image/upload/v1681994520/Tutoripolis/image/ogrz3cmmcpnnt2ztpw5o.jpg"}]

  const handlePress = (link) => {
    Linking.openURL(link).then();
  };

  const handleUpload = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      const apiKey = "859575849421427";
      const apiSecret = "Q4j6A69Uu4Zd1-Sr7LfswIKu9iU";
      const cloudName = "dchphczrm";
      const ts = Math.round(new Date().getTime() / 1000);

      const signature = `${Sha1(`timestamp=${ts}${apiSecret}`)}`;
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();

      formData.append("file", {
        uri: resultado.uri,
        type: resultado.mimeType,
        name: resultado.name,
      });
      formData.append("timestamp", ts);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      await axios.post(url, formData).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error al subir el archivo", JSON.stringify(error));
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={{ backgroundColor: theme.colors.primary, width: "95%" }}
      >
        <Text style={GlobalStyles.title} variant="titleLarge">
          Archivos de <Text style={{ fontWeight: "bold" }}>{nombre}</Text>
        </Text>

        <List.Section>
          <ScrollView style={{ maxHeight: 250 }}>
            {urls.length > 0 &&
              urls.map((url, index) => (
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
                      title={url.public_id.split("/")[2]}
                      left={(props) => <Avatar.Icon icon={"file"} {...props} />}
                    />
                    <Text variant="bodyMedium">
                      Tipo:{" "}
                      <Text
                        style={{ fontWeight: "bold" }}
                      >{`${url.tipo}`}</Text>
                    </Text>

                    <Text variant="bodyMedium">
                      ID:{" "}
                      <Text style={{ fontWeight: "bold" }}>{`${url._id}`}</Text>
                    </Text>
                    <Text variant="bodyMedium">
                      URL:{" "}
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: theme.colors.secondary,
                        }}
                        onPress={() => handlePress(url.url)}
                      >{`${url.url.substring(27)}`}</Text>
                    </Text>
                  </Card.Content>
                </Card>
              ))}
          </ScrollView>
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />
        <Text style={GlobalStyles.title} variant="titleLarge">
          Agregar Archivos
        </Text>
        <View style={GlobalStyles.buttonContainer}>
          <Button
            style={{
              ...GlobalStyles.button,
              backgroundColor: "#4c60af",
            }}
            mode="contained-tonal"
            onPress={handleUpload}
            icon={"upload"}
          >
            <Text style={GlobalStyles.buttonText}>Subir Archivo</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArchivosScreen;
