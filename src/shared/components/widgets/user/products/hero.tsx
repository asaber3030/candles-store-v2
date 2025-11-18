"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"

import { Sparkles, Search } from "lucide-react"

type Props = {}

export const ProductsHero = ({}: Props) => {
  const t = useTranslations()
  const router = useRouter()
  const sp = useSearchParams()

  const [search, setSearch] = useState(sp.get("search") || "")

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search) {
      router.push(`/products?search=${search}`)
    }
  }

  return (
    <section className='relative overflow-hidden border-b bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 py-32'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-rose-400 to-pink-400 rounded-full blur-3xl animate-pulse' style={{ animationDelay: "1s" }}></div>
        <div className='absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-3xl animate-pulse' style={{ transform: "translate(-50%, -50%)", animationDelay: "0.5s" }}></div>
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-white/40 rounded-full animate-float'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center'>
          {/* Animated Badge */}
          <div className='inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg animate-bounce-slow'>
            <Sparkles className='w-5 h-5 text-amber-600 animate-spin-slow' />
            <span className='text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600'>{t("productsPage.hero.badge")}</span>
          </div>

          {/* Animated Title */}
          <h1 className='text-6xl md:text-8xl font-bold text-stone-900 mb-6 tracking-tight animate-fade-in'>
            <span className='inline-block animate-slide-up' style={{ animationDelay: "0.1s" }}>
              {t("productsPage.hero.title").split(" ")[0]}
            </span>{" "}
            <span className='inline-block animate-slide-up' style={{ animationDelay: "0.2s" }}>
              {t("productsPage.hero.title").split(" ")[1]}
            </span>{" "}
            <span className='inline-block animate-slide-up' style={{ animationDelay: "0.3s" }}>
              {t("productsPage.hero.title").split(" ")[2]}
            </span>{" "}
            <span className='inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600 animate-slide-up' style={{ animationDelay: "0.4s" }}>
              {t("productsPage.hero.title").split(" ")[3]}
            </span>
          </h1>

          <p className='text-2xl text-stone-700 max-w-3xl mx-auto mb-12 animate-fade-in' style={{ animationDelay: "0.5s" }}>
            {t("productsPage.hero.subtitle")}
          </p>

          {/* Search Bar */}
          <div className='max-w-2xl mx-auto animate-fade-in' style={{ animationDelay: "0.6s" }}>
            <form className='relative group' onSubmit={onSearch}>
              <Search className='absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-stone-400 group-focus-within:text-amber-600 transition' />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type='text'
                placeholder={t("Search your favourite")}
                className='w-full pl-16 pr-6 py-5 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl text-lg focus:outline-none focus:ring-4 focus:ring-amber-300/50 transition'
              />
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg viewBox='0 0 1440 120' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full'>
          <path d='M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z' fill='rgb(250 250 249)' />
        </svg>
      </div>
    </section>
  )
}
