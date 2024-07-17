import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound, useParams } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issueDetail = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issueDetail) notFound();
  return (
    <div>
      <Heading>{issueDetail.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issueDetail.status} />
        <Text>{issueDetail.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issueDetail.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
