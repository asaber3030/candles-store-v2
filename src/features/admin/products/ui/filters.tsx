"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { adminRoutes } from "@/shared/config/routes";
import { build } from "search-params";

import { AdvancedSearchBar } from "@/shared/components/common/advanced-search";
import { OrderDirection } from "@/shared/components/common/order-direction";
import { Button } from "@/shared/components/ui/button";

export const AdminProductsFilters = () => {
  const router = useRouter();
  const sp = useSearchParams();
  const t = useTranslations();

  const [search, setSearch] = useState(sp.get("search") || "");
  const [orderDirection, setOrderDirection] = useState<TOrderDirection>(sp.get("orderDirection") === "asc" ? "asc" : "desc");

  const handleFilter = () => {
    const query = build({ search, orderDirection });
    router.push(`?${query}`);
  };

  const handleClear = () => {
    setSearch("");
    router.push(adminRoutes.products.index);
  };

  return (
    <div className="grid grid-cols-9 gap-2">
      <div className="col-span-5">
        <AdvancedSearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="col-span-2">
        <OrderDirection direction={orderDirection} onDirectionChange={setOrderDirection} />
      </div>

      <Button onClick={handleFilter}>{t("Filter")}</Button>
      <Button onClick={handleClear} variant="outline">
        {t("Clear")}
      </Button>
    </div>
  );
};
