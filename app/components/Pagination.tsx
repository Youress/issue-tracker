"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  const changePage = (page:number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page',page.toString())
    router.push('?'+ params.toString())

  }
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button onClick={()=> changePage(currentPage - 1)} color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button onClick={()=> changePage(currentPage + 1 )} color="gray" variant="soft" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
