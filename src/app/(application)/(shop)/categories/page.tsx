"use client"

import Link from "next/link"

import React, { useState } from "react"
import { Edit2, Trash2, Search, Grid, List, Package } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { useAllCategories } from "@/entities/category/hooks/useCategories"
import { useTranslations } from "next-intl"
import { userRoutes } from "@/shared/config/routes"
import { useDebounce } from "use-debounce"
import { Loading } from "@/shared/components/common/loader"
import { DefaultContainer } from "@/shared/components/common/default-container"

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [debounded] = useDebounce(searchQuery, 300)
  const { categories, isCategoriesLoading } = useAllCategories({ search: debounded })
  const t = useTranslations()

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      <DefaultContainer className='p-6'>
        {/* Hero Section */}
        <div className='relative mb-12 rounded-3xl overflow-hidden bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 shadow-2xl'>
          {/* Animated Background Elements */}
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700'></div>
            <div className='absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-300'></div>
          </div>

          {/* Content */}
          <div className='relative z-10 max-w-3xl'>
            <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-white/90 text-sm font-medium'>
              <Package className='h-4 w-4' />
              <span>{t("SharkiaCandles Categories")}</span>
            </div>

            <h1 className='text-5xl md:text-6xl font-bold text-white mb-4 leading-tight'>
              {t("Organize Your")}
              <span className='block bg-linear-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent'>{t("Space")}</span>
            </h1>

            <p className='text-xl text-white/90 mb-8 leading-relaxed max-w-2xl'>{t("See all different types of categories of candles")}</p>

            <div className='flex flex-wrap gap-8 text-white/90'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                  <span className='text-2xl font-bold'>{categories?.length}</span>
                </div>
                <div>
                  <div className='text-sm opacity-80'>{t("Total")}</div>
                  <div className='font-semibold'>{t("Categories")}</div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                  <span className='text-2xl font-bold'>10</span>
                </div>
                <div>
                  <div className='text-sm opacity-80'>{t("Total")}</div>
                  <div className='font-semibold'>{t("Products")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Grid Pattern */}
          <div className='absolute inset-0 opacity-10'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                               linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px"
              }}
            ></div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className='flex flex-col sm:flex-row gap-4 mb-6'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4' />
            <Input placeholder={t("Search categories")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='pl-10' />
          </div>

          <div className='flex gap-2'>
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}>
              <Grid className='h-4 w-4' />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}>
              <List className='h-4 w-4' />
            </button>
          </div>
        </div>

        {isCategoriesLoading ? (
          <div className='text-center py-16'>
            <Loading />
          </div>
        ) : (
          <div>
            {viewMode === "grid" ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categories?.map((category) => (
                  <Link href={userRoutes.categories.single(category.id)}>
                    <Card key={category.id} className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
                      <CardHeader className='pb-3'>
                        <div className='flex items-start justify-between'>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <img src={category.icon} alt='Category Icon' className='w-full h-full' />
                          </div>
                        </div>
                        <CardTitle className='text-xl'>{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant='secondary' className='font-medium'>
                          {t("# products", { count: category._count.products })}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='space-y-3'>
                {categories?.map((category) => (
                  <Link href={userRoutes.categories.single(category.id)}>
                    <Card key={category.id} className='group hover:shadow-md transition-all duration-200'>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-4 flex-1'>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                              <img src={category.icon} alt='Category Icon' className='w-full h-full' />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <h3 className='font-semibold text-lg text-slate-900 dark:text-white'>{category.name}</h3>
                              <p className='text-sm text-slate-600 dark:text-slate-400 truncate'>{category.description}</p>
                            </div>
                            <Badge variant='secondary' className='font-medium'>
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
          <div className='text-center py-16'>
            <Package className='h-16 w-16 text-slate-300 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-slate-600 mb-2'>{t("No categories found")}</h3>
            <p className='text-slate-500'>{t("Try adjusting your search or create a new category")}</p>
          </div>
        )}
      </DefaultContainer>
    </div>
  )
}
