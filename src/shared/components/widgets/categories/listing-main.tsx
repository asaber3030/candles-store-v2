"use client";

import Link from "next/link";

import { useAllCategories } from "@/entities/category/hooks/useCategories";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { userRoutes } from "@/shared/config/routes";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Search, Grid, List, Package } from "lucide-react";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { Loading } from "@/shared/components/common/loader";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";

export function CategoriesListingMain() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [debounded] = useDebounce(searchQuery, 300);
  const { categories, isCategoriesLoading } = useAllCategories({ search: debounded });

  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input placeholder={t("Search categories")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isCategoriesLoading ? (
        <div className="text-center py-16">
          <Loading />
        </div>
      ) : (
        <div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.map((category) => (
                <Link key={`category-item-${category.id}`} href={userRoutes.categories.single(category.id)}>
                  <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <img src={category.icon} alt="Category Icon" className="w-full h-full" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{(locale == "ar" ? category.nameAr : category.name) || category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="font-medium">
                        {t("# products", { count: category._count.products })}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {categories?.map((category) => (
                <Link key={`category-${category.id}`} href={userRoutes.categories.single(category.id)}>
                  <Card key={category.id} className="group hover:shadow-md transition-all duration-200 mb-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                            <img src={category.icon} alt="Category Icon" className="w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{category.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{category.description}</p>
                          </div>
                          <Badge variant="secondary" className="font-medium">
                            {t("# products", { count: category._count.products })}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {categories?.length === 0 && (
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">{t("No categories found")}</h3>
          <p className="text-slate-500">{t("Try adjusting your search or create a new category")}</p>
        </div>
      )}
    </div>
  );
}
