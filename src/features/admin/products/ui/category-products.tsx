"use client";

import { useCategoryProducts } from "@/entities/product/hooks/useProducts";

import { SimplePagination } from "@/shared/components/common/simple-pagination";
import { ProductsColumns } from "./columns";
import { TableSkeleton } from "@/shared/components/skeletons/table";
import { DataTable } from "@/shared/components/common/data-table";

type Props = {
  searchParams: TObject;
  categoryId: number;
};

export const CategoryProductsTable = ({ searchParams, categoryId }: Props) => {
  const { products, isProductsLoading } = useCategoryProducts(categoryId, searchParams);

  if (isProductsLoading) return <TableSkeleton />;

  return (
    <div>
      <DataTable columns={ProductsColumns} data={products?.data as any} />
      <SimplePagination hasNextPage={products?.pagination.hasNextPage} hasPrevPage={products?.pagination.hasPrevPage} />
    </div>
  );
};
