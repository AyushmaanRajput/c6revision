import {
  GETBLOGS_ERROR,
  GETBLOGS_LOADING,
  GETBLOGS_SUCCESS,
  ADDBLOG_ERROR,
  ADDBLOG_LOADING,
  ADDBLOG_SUCCESS,
  DELETEBLOG_ERROR,
  DELETEBLOG_LOADING,
  DELETEBLOG_SUCCESS,
  ADDCOMMENT_ERROR,
  ADDCOMMENT_LOADING,
  ADDCOMMENT_SUCCESS,
  ADDLIKE_ERROR,
  ADDLIKE_LOADING,
  ADDLIKE_SUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  blogs: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GETBLOGS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GETBLOGS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GETBLOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        blogs: action.payload,
      };
    case ADDBLOG_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ADDBLOG_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case ADDBLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        blogs: [...state.blogs, action.payload],
      };
    case DELETEBLOG_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case DELETEBLOG_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case DELETEBLOG_SUCCESS:
      let newBlogs = [...state.blogs].filter((el) => el.id != action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        blogs: newBlogs,
      };
    default:
      return state;
  }
};
