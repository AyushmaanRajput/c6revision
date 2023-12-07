import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { addBlog } from "../redux/app/action";
export const AddBlog = ({ onClose }) => {
  let [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token") ||
    "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(addBlog(token, formData, toast, onClose));
  }
  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
          />
          <FormHelperText>Type a unique title for you blog</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select a category for you blog"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  category: e.target.value,
                };
              })
            }
          >
            <option value="Business">Business</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
          </Select>
          <FormHelperText>
            It describe the genre your blog belongs to.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea
            placeholder="Describe your blog"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  content: e.target.value,
                };
              })
            }
          />
          <FormHelperText>Describe you blog in details.</FormHelperText>
        </FormControl>
        <Button colorScheme="orange" type="submit">
          Add Blog
        </Button>
      </form>
    </Box>
  );
};
