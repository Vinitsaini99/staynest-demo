import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SITE } from '../config/site'
import { articles, getArticle } from '../data/articles'
import { useSeo } from '../hooks/useSeo'
import { imgSrc } from '../utils/image'
import { PageHero, Breadcrumbs } from '../components/ui/Bits'
import Reveal from '../components/ui/Reveal'
import { LinkButton } from '../components/ui/Button'
import NotFound from './NotFound'

export function InsightsIndex() {
  useSeo({ title: 'Real Estate Insights – Guides for Buyers & Sellers in Kota', description: 'Practical guides on buying, selling and investing in property in Kota, Rajasthan.', path: '/insights' })
  return (
    <>
      <PageHero eyebrow="Insights" title="Real estate guides for Kota" intro="Practical, plain-language guidance for buyers, sellers and investors." crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} />
      <section className="container-x grid gap-10 py-16 md:grid-cols-2">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 2) * 0.08}>
            <Link to={`/insights/${a.slug}`} className="group grid gap-5 sm:grid-cols-[220px_1fr]">
              <div className="img-zoom aspect-[4/3] bg-stone"><img src={imgSrc(a.image, 500, 375)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
              <div>
                <p className="eyebrow">{a.category} · {a.readMinutes} min</p>
                <h2 className="mt-2 text-2xl leading-snug text-forest group-hover:underline">{a.title}</h2>
                <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">Read guide <ArrowRight size={15} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  )
}

export function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)
  useSeo({
    title: a?.title, description: a?.excerpt, path: `/insights/${slug}`, type: 'article', image: a ? imgSrc(a.image, 1200) : undefined,
    jsonLd: a && { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, image: imgSrc(a.image, 1200), author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name } },
  })
  if (!a) return <NotFound />
  return (
    <article>
      <div className="relative bg-forest">
        <img src={imgSrc(a.image, 1600, 700)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="container-x relative py-16 md:py-24">
          <Breadcrumbs light items={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: a.category }]} />
          <p className="eyebrow eyebrow-light mt-6">{a.category} · {a.readMinutes} min read</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight text-ivory md:text-5xl">{a.title}</h1>
        </div>
      </div>
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_300px]">
        <div className="prose-kkp max-w-2xl">
          <p className="!text-lg !text-forest">{a.excerpt}</p>
          {a.body.map((s) => (
            <section key={s.h}><h2>{s.h}</h2>{s.p.map((t, i) => <p key={i}>{t}</p>)}</section>
          ))}
          <p className="mt-10 border-t border-line pt-5 text-xs !text-muted">This article is for general information only and is not legal, financial or investment advice. Consult qualified professionals before making property decisions.</p>
          <Link to="/insights" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest"><ArrowLeft size={15} /> All insights</Link>
        </div>
        <aside>
          <div className="sticky top-32 border border-line bg-white p-6">
            <h3 className="text-xl text-forest">Looking for a property?</h3>
            <p className="mt-2 text-sm text-muted">Browse listings across Kota’s top localities.</p>
            <LinkButton to="/buy-property" className="mt-5 w-full">Browse Properties</LinkButton>
          </div>
        </aside>
      </div>
    </article>
  )
}
