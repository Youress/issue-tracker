import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}
const statusMap: Record<Status, { label: string; color: "red" | "green" | "orange" }> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
};

const IssueStatusBadge = ({ status }: Props) => {
    const {label, color} = statusMap[status]
  return <Badge color={color}>{label}</Badge>;
};

export default IssueStatusBadge;
