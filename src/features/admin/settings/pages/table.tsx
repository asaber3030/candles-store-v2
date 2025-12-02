"use client";

import { TableSkeleton } from "@/shared/components/skeletons/table";
import { PagesColumns } from "./columns";
import { DataTable } from "@/shared/components/common/data-table";

import { usePages } from "@/entities/page/hooks/usePages";

export const PagesTable = () => {
  const { pages, isPagesLoading } = usePages();

  if (isPagesLoading) return <TableSkeleton />;

  return (
    <div>
      <DataTable columns={PagesColumns} data={pages!} />
    </div>
  );
};
