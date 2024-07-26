"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statuses: { label: string; value?: Status | "ALL" }[] = [
    { label: "All" , value:"ALL"},
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleChanger = (status : Status | "ALL") => {
    const query = status === "ALL" ? '' : `?status=${status}`; 
    router.push("/issues/list/" + query);
  };
  return (
    <Select.Root onValueChange={handleChanger}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
