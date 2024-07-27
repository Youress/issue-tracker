import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames } from "./issueTable";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortOrder: "asc" | "desc";
    page: string;
  };
}
const IssuePage = async ({ searchParams }: Props) => {
  
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder }
    : undefined;
  
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: { status },
  });
  return (
    <div>
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues}/>
      <div className="flex items-center justify-center mt-4">
        <Pagination
          pageSize={pageSize}
          itemCount={issueCount}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
