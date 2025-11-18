import { defaultPictures } from "@/shared/config/defaults"
import { userRoutes } from "@/shared/config/routes"
import { Flame, Leaf, Heart, Sparkles, Users, Award, ChevronRight, ShoppingCart, Instagram, ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function AboutPage() {
  const t = await getTranslations()

  return (
    <div className={`min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r overflow-hidden from-amber-50 via-rose-50 to-stone-50 py-24'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl'></div>
          <div className='absolute bottom-20 right-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl'></div>
        </div>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
          <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm'>
            <Sparkles className='w-4 h-4 text-amber-600' />
            <span className='text-sm font-medium text-stone-700'>{t("about.nav.about")}</span>
          </div>
          <h1 className='text-6xl md:text-7xl font-bold text-stone-900 mb-6 tracking-tight'>{t("about.hero.title")}</h1>
          <p className='text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed'>{t("about.hero.subtitle")}</p>
        </div>
      </section>

      {/* Journey Section */}
      <section className='py-20'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-16 items-center'>
            <div className='relative'>
              <div className='aspect-square from-amber-100 to-rose-100 rounded-3xl overflow-hidden shadow-2xl'>
                <div className='flex items-center justify-center h-full text-9xl'>
                  <img src={"/images/candles/01.jpg"} />
                </div>
              </div>
              <div className='absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200 rounded-3xl -z-10'></div>
            </div>
            <div>
              <h2 className='text-4xl font-bold text-stone-900 mb-6'>{t("about.journey.title")}</h2>
              <p className='text-lg text-stone-600 leading-relaxed mb-6'>{t("about.journey.content")}</p>
              <div className='bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-2xl'>
                <p className='text-stone-700 italic'>{t("about.mission.content")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-stone-900 text-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { value: "50K+", label: t("about.stats.candles") },
              { value: "12K+", label: t("about.stats.customers") },
              { value: "35+", label: t("about.stats.scents") },
              { value: "10K+", label: t("about.stats.trees") }
            ].map((stat, i) => (
              <div key={i} className='text-center'>
                <div className='text-5xl font-bold text-amber-400 mb-2'>{stat.value}</div>
                <div className='text-stone-400 text-sm uppercase tracking-wide'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-20 from-white to-amber-50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-5xl font-bold text-stone-900 mb-16 text-center'>{t("about.values.title")}</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {[
              { icon: Leaf, title: t("about.values.sustainability"), desc: t("about.values.sustainabilityDesc"), color: "bg-green-100 text-green-600" },
              { icon: Award, title: t("about.values.quality"), desc: t("about.values.qualityDesc"), color: "bg-amber-100 text-amber-600" },
              { icon: Users, title: t("about.values.community"), desc: t("about.values.communityDesc"), color: "bg-rose-100 text-rose-600" },
              { icon: Heart, title: t("about.values.transparency"), desc: t("about.values.transparencyDesc"), color: "bg-purple-100 text-purple-600" }
            ].map((value, i) => (
              <div key={i} className='bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition group'>
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <value.icon className='w-8 h-8' />
                </div>
                <h3 className='text-2xl font-bold text-stone-900 mb-4'>{value.title}</h3>
                <p className='text-stone-600 leading-relaxed'>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-20 bg-stone-900 text-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-5xl font-bold mb-16 text-center'>{t("about.process.title")}</h2>
          <div className='grid md:grid-cols-4 gap-8'>
            {[
              { step: "01", title: t("about.process.step1"), desc: t("about.process.step1Desc") },
              { step: "02", title: t("about.process.step2"), desc: t("about.process.step2Desc") },
              { step: "03", title: t("about.process.step3"), desc: t("about.process.step3Desc") },
              { step: "04", title: t("about.process.step4"), desc: t("about.process.step4Desc") }
            ].map((process, i) => (
              <div key={i} className='relative'>
                <div className='text-6xl font-bold text-amber-600/20 mb-4'>{process.step}</div>
                <h3 className='text-2xl font-bold mb-3'>{process.title}</h3>
                <p className='text-stone-400'>{process.desc}</p>
                {i < 3 && <ArrowRight className='hidden md:block absolute top-8 -right-4 w-8 h-8 text-amber-600' />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-5xl font-bold text-stone-900 mb-16 text-center'>{t("about.team.title")}</h2>
          <div className='grid md:grid-cols-2 gap-12'>
            {[
              { name: t("about.team.founder1"), role: t("about.team.founder1Role"), bio: t("about.team.founder1Bio"), emoji: "👩‍🔬" },
              { name: t("about.team.founder2"), role: t("about.team.founder2Role"), bio: t("about.team.founder2Bio"), emoji: "👨‍🎨" }
            ].map((founder, i) => (
              <div key={i} className='group'>
                <div className='from-amber-100 to-rose-100 rounded-3xl overflow-hidden mb-6 aspect-square flex items-center justify-center text-9xl hover:scale-105 transition shadow-lg'>
                  <img src={defaultPictures.placeholder} alt='' />
                </div>
                <h3 className='text-2xl font-bold text-stone-900 mb-2'>{founder.name}</h3>
                <p className='text-amber-600 font-medium mb-4'>{founder.role}</p>
                <p className='text-stone-600 leading-relaxed'>{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-stone-900 to-indigo-800 text-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-5xl font-bold mb-6'>{t("about.cta.title")}</h2>
          <p className='text-2xl mb-10 text-amber-50'>{t("about.cta.subtitle")}</p>
          <Link href={userRoutes.shop}>
            <button className='bg-white text-stone-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-stone-100 transition inline-flex items-center gap-3 shadow-2xl hover:scale-105 transform'>
              {t("about.cta.button")}
              <ChevronRight className='w-6 h-6' />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
