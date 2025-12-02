import { ColumnDef } from "@tanstack/react-table";
import { FullPage } from "@/entities/page/model/page";
import { LinkBtn } from "@/shared/components/common/link-button";
import { Eye } from "lucide-react";

import { adminRoutes } from "@/shared/config/routes";

export const PagesColumns: ColumnDef<FullPage>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
  },
  {
    accessorKey: "_count.sections",
    header: "Sections",
    cell: ({ row }) => `${row.original._count.sections} sections`,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <LinkBtn size="icon" href={adminRoutes.pages.view(row.original.id)} icon={Eye} />
        </div>
      );
    },
  },
];
