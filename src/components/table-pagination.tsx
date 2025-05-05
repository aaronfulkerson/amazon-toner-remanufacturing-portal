"use client";

import { Button, Text } from "@/components";
import { paginationContainerVariants } from "@/components/table-pagination.variants";

import type { CoreInstance, PaginationInstance } from "@tanstack/react-table";

interface ButtonContainerProps {
  children: React.ReactNode;
}

function ButtonContainer({ children }: ButtonContainerProps) {
  return <div className="flex flex-1 gap-3 justify-end">{children}</div>;
}

interface PaginationContainerProps {
  children: React.ReactNode;
}

function PaginationContainer({ children }: PaginationContainerProps) {
  return (
    <nav aria-label="Pagination" className={paginationContainerVariants()}>
      {children}
    </nav>
  );
}

interface PaginationStatsProps {
  children: React.ReactNode;
}

function PaginationStats({ children }: PaginationStatsProps) {
  return (
    <div className="block">
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  );
}

interface TablePaginationProps<TData>
  extends Pick<
      PaginationInstance<TData>,
      | "getCanNextPage"
      | "getCanPreviousPage"
      | "getPageCount"
      | "nextPage"
      | "previousPage"
    >,
    Pick<CoreInstance<TData>, "getState"> {}

export function TablePagination<TData>(props: TablePaginationProps<TData>) {
  const handlePreviousPageClick = () => props.previousPage();
  const handleNextPageClick = () => props.nextPage();

  return (
    <PaginationContainer>
      <PaginationStats>
        Showing&nbsp;
        <Text weight="medium">{props.getState().pagination.pageIndex + 1}</Text>
        &nbsp;of&nbsp;
        <Text weight="medium">{props.getPageCount()}</Text>&nbsp;pages&nbsp;
      </PaginationStats>
      <ButtonContainer>
        <Button
          disabled={!props.getCanPreviousPage()}
          intent="secondary"
          size="lg"
          onClick={handlePreviousPageClick}
        >
          Previous
        </Button>
        <Button
          disabled={!props.getCanNextPage()}
          intent="secondary"
          size="lg"
          onClick={handleNextPageClick}
        >
          Next
        </Button>
      </ButtonContainer>
    </PaginationContainer>
  );
}
