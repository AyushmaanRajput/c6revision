import React, { useState } from "react";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/auth/action";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export const Login = () => {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    dispatch(loginUser(formData, toast, navigate));
  }
  return (
    <Box
      w="min(30rem,100%)"
      p={4}
      border="1px solid #3333"
      borderRadius={"lg"}
      mt={20}
      mx="auto"
    >
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
          />
          <FormHelperText>Create a secure password</FormHelperText>
        </FormControl>
        <Button colorScheme="orange" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};
