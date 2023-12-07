import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addLike, deleteBlog } from "../redux/app/action";

export const UserBlogs = ({}) => {
  let { token = localStorage.getItem("token"), loggedInUser } = useSelector(
    (store) => store.authReducer
  );
  let blogs = useSelector((store) => store.appReducer.blogs);
  const toast = useToast();
  const dispatch = useDispatch();
  console.log(blogs);
  let [comment, setComment] = useState("");
  function onCommentHandler() {
    dispatch(addComment(token, { content: comment }, toast));
  }
  return (
    <Box>
      {blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <Box p={4} borderRadius={4} boxShadow={"md"} key={blog.title}>
              <Flex alignItems={"center"} gap={4} mb={4}>
                <WrapItem>
                  <Avatar
                    size="xl"
                    name="Prosper Otemuyiwa"
                    src={loggedInUser.avatar}
                    objectPosition={"top"}
                  />{" "}
                </WrapItem>
                <Box>
                  <Heading size={"md"}>{loggedInUser.username}</Heading>
                  <p>{blog.category}</p>
                  <p>{blog.date.split("T")[0]}</p>
                </Box>
              </Flex>
              <Box mb={4}>
                <Heading size={"lg"}>{blog.title}</Heading>
                <p>{blog.content}</p>
              </Box>
              <Flex
                mb={4}
                alignItems={"center"}
                gap="1rem"
                justifyContent={"space-between"}
              >
                <Flex gap={4}>
                  <Text
                    color="orange"
                    onClick={() => dispatch(addLike(token, blog._id, toast))}
                  >
                    &#10084; {blog.likes}
                  </Text>
                  <Text>{blog.comments.length} comments</Text>
                </Flex>
                <Flex gap={2}>
                  <Input
                    size="sm"
                    placeholder="Add a Comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    size="sm"
                    w="fit-content"
                    colorScheme="orange"
                    flexGrow={1}
                    px={8}
                  >
                    Add Comment
                  </Button>
                </Flex>
              </Flex>
              <Flex alignItems={"center"} gap="1rem">
                <Button colorScheme="orange" variant={"outline"}>
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => dispatch(deleteBlog(token, blog._id, toast))}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          );
        })
      ) : (
        <p>You haven't added any blogs</p>
      )}
    </Box>
  );
};
