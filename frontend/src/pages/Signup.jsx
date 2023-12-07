import React, { useState } from "react";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/auth/action";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export const Signup = () => {
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(createUser(formData, toast, navigate));
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
      <Heading>Signup</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  username: e.target.value,
                };
              })
            }
          />
          <FormHelperText>Type a unique username.</FormHelperText>
        </FormControl>
        <FormControl>
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
        <FormControl>
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
        <FormControl>
          <FormLabel>Profile Image (Optional)</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  avatar: e.target.value,
                };
              })
            }
          />
          <FormHelperText>Something where you look good!.</FormHelperText>
        </FormControl>
        <Button colorScheme="orange" type="submit">
          SignUp
        </Button>
      </form>
    </Box>
  );
};
