import { Routes, Route } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Blogs } from "../pages/Blogs";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/blogs"
        element={
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};
