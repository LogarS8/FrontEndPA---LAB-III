import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tutoApi = axios.create({
   baseURL: "https://tutoripolisbackend-production.up.railway.app/api",
  // baseURL: "http://192.168.100.9:8080/api",
});

tutoApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers["x-token"] = token;
  }

  return config;
});

export default tutoApi;
