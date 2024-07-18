import { Card, Flex, Box} from '@radix-ui/themes'
import {Skeleton} from "@/app/components"



const LoadingIssueDetail = () => {
  return (
    <Box>
      <Skeleton width='24rem'/>
      <Flex gap="4" my="2">
        <Skeleton width="5rem" />
        <Skeleton width='8rem'/>
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3}/>
      </Card>
    </Box>
  )
}

export default  LoadingIssueDetail 
