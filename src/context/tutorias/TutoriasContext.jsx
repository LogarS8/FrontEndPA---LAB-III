import { createContext, useReducer } from "react";
import tutoApi from "../../api/tutoApi";
import { tutoriasReducer } from "./tutoriasReducer";

const TutoriasContext = createContext({});

const tutoriasInicialState = {
  status: "loading",
  errorMessage: "",
  tutoriasDisponibles: [],
  tutoriasInscritas: [],
  tutoriasPropias: [],
  materias: [],
};

const TutoriasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tutoriasReducer, tutoriasInicialState);

  const getTutoriasDisponibles = async () => {
    dispatch({ type: "loading" });
    try {
      const tutoriasDisponibles = await tutoApi.get(
        "/tutorias/obtener/disponibles/"
      );
      if (tutoriasDisponibles.status !== 200) {
        return dispatch({
          type: "error",
          payload: {
            errorMessage: tutoriasDisponibles.data.msg,
          },
        });
      }

      dispatch({
        type: "success-getTutoriasDisponibles",
        payload: {
          tutoriasDisponibles: tutoriasDisponibles.data,
        },
      });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  const getTutoriasInscritas = async () => {
    dispatch({ type: "loading" });
    try {
      const tutoriasInscritas = await tutoApi.get(
        "/tutorias/obtener/inscritas/"
      );
      if (tutoriasInscritas.status !== 200) {
        return dispatch({
          type: "error",
          payload: {
            errorMessage: tutoriasInscritas.data.msg,
          },
        });
      }

      dispatch({
        type: "success-getTutoriasInscritas",
        payload: {
          tutoriasInscritas: tutoriasInscritas.data,
        },
      });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  const getTutoriasPropias = async () => {
    dispatch({ type: "loading" });
    try {
      const tutoriasPropias = await tutoApi.get("/tutorias/obtener/propias/");
      if (tutoriasPropias.status !== 200) {
        return dispatch({
          type: "error",
          payload: {
            errorMessage: tutoriasPropias.data.msg,
          },
        });
      }

      dispatch({
        type: "success-getTutoriasPropias",
        payload: {
          tutoriasPropias: tutoriasPropias.data,
        },
      });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  const getMaterias = async () => {
    dispatch({ type: "loading" });
    try {
      const materias = await tutoApi.get("/materias");
      if (materias.status !== 200) {
        return dispatch({
          type: "error",
          payload: {
            errorMessage: materias.data.msg,
          },
        });
      }

      dispatch({
        type: "success-getMaterias",
        payload: {
          materias: materias.data.materias,
        },
      });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  const resetState = () => {
    dispatch({ type: "resetState" });
  };

  return (
    <TutoriasContext.Provider
      value={{
        ...state,
        getTutoriasDisponibles,
        getTutoriasInscritas,
        getTutoriasPropias,
        getMaterias,
        removeError,
        resetState,
      }}
    >
      {children}
    </TutoriasContext.Provider>
  );
};

export { TutoriasContext, TutoriasProvider };
