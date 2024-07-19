import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issueDetail={issueDetail} />
      </Box>
      <Box maxWidth="8rem">
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issueDetail.id} />
          <DeleteIssueButton issueId={issueDetail.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
