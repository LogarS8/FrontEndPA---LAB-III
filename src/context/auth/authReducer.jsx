const authReducer = (state, action) => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        usuario: null,
        status: "not-authenticated",
        token: null,
        errorMessage: action.payload,
      };

    case "removeError":
      return {
        ...state,
        errorMessage: "",
      };

    case "signUp":
      return {
        ...state,
        errorMessage: "",
        status: "authenticated",
        token: action.payload.token,
        usuario: action.payload.usuario,
      };

    case "logout":
      return {
        ...state,
        status: "not-authenticated",
        token: null,
        usuario: null,
      };
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        token: null,
        usuario: null,
      };

    default:
      return state;
  }
};

export { authReducer };
