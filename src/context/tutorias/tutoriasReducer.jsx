const tutoriasInicialState = {
  status: "loading",
  errorMessage: "",
  tutoriasDisponibles: [],
  tutoriasInscritas: [],
  tutoriasPropias: [],
  materias: [],
  urlsTutoriaById: [],
};

const tutoriasReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };
    case "error":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload.errorMessage,
        tutoriasDisponibles: [],
        tutoriasInscritas: [],
        tutoriasPropias: [],
      };
    case "removeError":
      return {
        ...state,
        status: "success",
        errorMessage: "",
      };
    case "resetState":
      return {
        ...tutoriasInicialState,
      };

    case "success-getTutoriasDisponibles":
      return {
        ...state,
        status: "success",
        tutoriasDisponibles: action.payload.tutoriasDisponibles,
      };

    case "success-getTutoriasInscritas":
      return {
        ...state,
        status: "success",
        tutoriasInscritas: action.payload.tutoriasInscritas,
      };
    case "success-getTutoriasPropias":
      return {
        ...state,
        status: "success",
        tutoriasPropias: action.payload.tutoriasPropias,
      };
    case "success-getMaterias":
      return {
        ...state,
        status: "success",
        materias: action.payload.materias,
      };

    default:
      return state;
  }
};

export { tutoriasReducer };
