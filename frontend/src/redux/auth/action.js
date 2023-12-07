import {
  CREATEUSER_ERROR,
  CREATEUSER_LOADING,
  CREATEUSER_SUCCESS,
  LOGINUSER_ERROR,
  LOGINUSER_LOADING,
  LOGINUSER_SUCCESS,
} from "./acitonTypes";
import axios from "axios";

export const createUser = (userObj, toast, navigate) => async (dispatch) => {
  try {
    dispatch({ type: CREATEUSER_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/register`,
      userObj
    );
    dispatch({ type: CREATEUSER_SUCCESS });
    localStorage.setItem("token", res.data.token);
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    navigate("/login");
  } catch (err) {
    dispatch({ type: CREATEUSER_ERROR });
    console.log(err);
    toast({
      title: "Something went wrong",
      description: "Couldn't create your account.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const loginUser = (userObj, toast, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGINUSER_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/login`,
      userObj
    );
    dispatch({
      type: LOGINUSER_SUCCESS,
      payload: { token: res.data.token, user: res.data.user },
    });
    toast({
      title: "Logged In Successfully",
      description: "your login was successful",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    navigate("/blogs");
  } catch (err) {
    dispatch({ type: LOGINUSER_ERROR });
    console.log(err);
    toast({
      title: "Something went wrong",
      description: "Couldn't login to  your account.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
