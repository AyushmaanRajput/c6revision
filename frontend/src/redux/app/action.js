import {
  GETBLOGS_ERROR,
  GETBLOGS_LOADING,
  GETBLOGS_SUCCESS,
  ADDBLOG_ERROR,
  ADDBLOG_LOADING,
  ADDBLOG_SUCCESS,
  DELETEBLOG_LOADING,
  DELETEBLOG_SUCCESS,
  DELETEBLOG_ERROR,
} from "./actionTypes";
import axios from "axios";

export const getBlogs = (token, params, toast) => async (dispatch) => {
  try {
    dispatch({ type: GETBLOGS_LOADING });
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GETBLOGS_SUCCESS, payload: res.data.blogs });
  } catch (err) {
    dispatch({ type: GETBLOGS_ERROR });
    console.log(err);
    if (err.response.status === 404) {
      toast({
        title: err.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Something went wrong",
      description: "Couldn't fetch Blogs",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const addBlog = (token, blog, toast, onClose) => async (dispatch) => {
  try {
    dispatch({ type: ADDBLOG_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/blogs`,
      blog,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ADDBLOG_SUCCESS, payload: res.data.blog });
    toast({
      title: "Blog added successfully",
      description: "your blog was added successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    onClose();
  } catch (err) {
    dispatch({ type: ADDBLOG_ERROR });
    console.log(err);
    toast({
      title: "Something went wrong",
      description: "Couldn't add Blog",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    onClose();
  }
};

export const deleteBlog = (token, id, toast) => async (dispatch) => {
  try {
    dispatch({ type: DELETEBLOG_LOADING });
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETEBLOG_SUCCESS, payload: res.data.blog._id });
    dispatch(getBlogs(token, {}, toast));
    toast({
      title: "Blog deleted successfully",
      description: "your blog was deleted successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: DELETEBLOG_ERROR });
    console.log(err);
    toast({
      title: "Something went wrong",
      description: "Couldn't delete Blog",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const addLike = (token, id, toast) => async (dispatch) => {
  try {
    let res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/blogs/${id}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getBlogs(token, {}, toast));
    toast({
      title: "Blog Liked",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    console.log(err);
    toast({
      title: "Something went wrong",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const addComment = (token, obj, id, toast) => async (dispatch) => {
  try {
    let res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/blogs/${id}/comment`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getBlogs(token, {}, toast));
    toast({
      title: "Add your comment",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    console.log(err);
    toast({
      title: "Something went wrong",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
