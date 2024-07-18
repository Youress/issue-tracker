import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import {Pencil2Icon} from "@radix-ui/react-icons"
import Link from "next/link";

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
    <Grid columns={{initial:"1",md:"2"}} gap="5">
      <Box>
        <Heading>{issueDetail.title}</Heading>
        <Flex gap="4" my="2">
          <IssueStatusBadge status={issueDetail.status} />
          <Text>{issueDetail.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkDown>{issueDetail.description}</ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <Button> <Pencil2Icon/>
        <Link href={`/issues/${issueDetail.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
