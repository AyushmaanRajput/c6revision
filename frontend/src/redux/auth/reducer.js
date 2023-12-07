import {
  CREATEUSER_ERROR,
  CREATEUSER_LOADING,
  CREATEUSER_SUCCESS,
  LOGINUSER_ERROR,
  LOGINUSER_LOADING,
  LOGINUSER_SUCCESS,
} from "./acitonTypes";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: null,
  loggedInUser: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case CREATEUSER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case CREATEUSER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case CREATEUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case LOGINUSER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case LOGINUSER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case LOGINUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFinite: false,
        isAuth: true,
        token: action.payload.token,
        loggedInUser: action.payload.user,
      };
    case "logout":
      return {
        ...initState,
      };
    default:
      return state;
  }
};
