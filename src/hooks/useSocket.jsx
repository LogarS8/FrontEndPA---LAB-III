import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const serverUrl = new URL(
   "https://tutoripolisbackend-production.up.railway.app/"
  // "http://192.168.100.9:8080/"
);

export const useSocket = (eventHandlers = {}, sala = "global") => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const conectarSocket = async () => {
      const token = await AsyncStorage.getItem("token");
      socketRef.current = io(serverUrl.toString(), {
        extraHeaders: {
          "x-token": token,
        },
        query: {
          sala,
        },
      });

      setSocket(socketRef.current);
    };

    conectarSocket().then();
  }, []);

  useEffect(() => {
    if (socket) {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    }

    return () => {
      if (socket) {
        Object.entries(eventHandlers).forEach(([event, handler]) => {
          socket.off(event, handler);
        });
      }
    };
  }, [socket, eventHandlers]);

  return socketRef;
};
