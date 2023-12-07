import { Flex, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React from "react";

export const Toolbar = ({ setSearch, setCategory, setOrder }) => {
  return (
    <Flex mb={8} gap={4} alignItems={"center"} justifyContent={"space-between"}>
      <Input
        placeholder="Search Blogs By Title"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        placeholder="Filter By Category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Business">Business</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Entertainment">Entertainment</option>
      </Select>
      <Select
        placeholder="Sort By Date"
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
    </Flex>
  );
};
