import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";

interface Props {
    searchParams: {
      status: Status;
      orderBy: keyof Issue;
      sortOrder: "asc" | "desc";
      page: string;
    };
    issues: Issue[]
  }


const IssueTable = ({searchParams, issues}:Props) => {
   
      const toggleOrder = () => {
          // If searchParams.sortOrder is not defined or is "desc", return "asc"
        return !searchParams.sortOrder || searchParams.sortOrder === "desc"
          ? "asc"
          : "desc";
      };
  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell className={col.className} key={col.value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: col.value,
                      sortOrder: toggleOrder(),
                    },
                  }}
                >
                  {col.label}
                </NextLink>
                {searchParams.orderBy === col.value &&
                  (searchParams.sortOrder === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}
const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  export const columnNames = columns.map(col => col.value)

export default IssueTable