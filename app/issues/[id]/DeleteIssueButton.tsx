"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const handleSubmit = async () => {
    await axios.delete(`/api/issues/${issueId}`);
    router.push("/issues");
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure to delete this issue?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={handleSubmit} variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
