import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client';
import { Card, Heading,Flex, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkDown from "react-markdown";


const IssueDetails = ({issueDetail}:{issueDetail:Issue}) => {
  return (
    <>
    <Heading>{issueDetail.title}</Heading>
        <Flex gap="4" my="2">
          <IssueStatusBadge status={issueDetail.status} />
          <Text>{issueDetail.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkDown>{issueDetail.description}</ReactMarkDown>
        </Card></>
  )
}

export default IssueDetails