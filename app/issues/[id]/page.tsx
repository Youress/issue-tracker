import prisma from "@/prisma/client";
import { notFound, useParams } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") notFound();
  const issueDetail = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issueDetail) notFound();
  return (
    <div>
      <p>{issueDetail.title}</p>
      <p>{issueDetail.description}</p>
    </div>
  );
};

export default IssueDetailPage;
