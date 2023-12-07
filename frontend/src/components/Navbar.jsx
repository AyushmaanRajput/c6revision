import React from "react";
import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = () => {
  const token = useSelector((store) => store.authReducer.isAuth);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  function logoutHandler() {
    localStorage.removeItem("token");
    navigate("/login");
    toast({
      title: "Logged OUt sucessfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: "logout" });
  }
  return (
    <Flex p={4} alignItems={"center"} justifyContent={"space-between"}>
      <Heading size="lg">Blog App</Heading>
      <Flex gap={4} alignItems={"center"}>
        <Link to="/blogs">Blogs</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/">
              <Button colorScheme="orange">SignUp</Button>
            </Link>
          </>
        ) : (
          <Button colorScheme="orange" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
