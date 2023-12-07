import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { UserBlogs } from "../components/UserBlogs";
import { Toolbar } from "../components/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../redux/app/action";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddBlog } from "../components/AddBlog";

export const Blogs = () => {
  let [search, setSearch] = useState("");
  let [category, setCategory] = useState("");
  let [order, setOrder] = useState("");

  let { isLoading, isError, blogs } = useSelector((store) => store.appReducer);
  let token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token") ||
    "";

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    let config = {
      title: search,
      category: category,
      sort: "date",
      order: order,
    };
    dispatch(getBlogs(token, config, toast));
  }, [search, category, order]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box p={4}>
      <Flex mt={8}>
        <Button onClick={onOpen} colorScheme="orange">
          Create Blog
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Blog Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddBlog onClose={onClose}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <Divider my={15}/>
      <Toolbar
        setSearch={setSearch}
        setOrder={setOrder}
        setCategory={setCategory}
      />
      <Heading>Your Blogs</Heading>
      <UserBlogs blogs={blogs} />
    </Box>
  );
};
