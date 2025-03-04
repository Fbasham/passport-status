import { DefaultSeoProps } from 'next-seo'
import { OpenGraphMedia } from 'next-seo/lib/types'
import { Router } from 'next/router'

export type NextSEORouter = Pick<Router, 'asPath' | 'locale'>

export interface LanguageAlternate {
  hrefLang: string
  href: string
}

export const getLanguageAlternates = (
  appBaseUri: string,
  router: NextSEORouter
): ReadonlyArray<LanguageAlternate> | undefined => {
  if (!appBaseUri) return
  return [
    {
      hrefLang: 'en',
      href: `${appBaseUri}/en${router.asPath}`,
    },
    {
      hrefLang: 'fr',
      href: `${appBaseUri}/fr${router.asPath}`,
    },
  ]
}

export const getOpenGraphImages = (
  appBaseUri: string
): ReadonlyArray<OpenGraphMedia> | undefined => {
  if (!appBaseUri) return
  return [
    {
      url: `${appBaseUri}/ogp.jpg`,
      width: 2048,
      height: 1152,
    },
  ]
}

export type GetNextSEOConfig = (
  appBaseUri: string,
  router: NextSEORouter
) => DefaultSeoProps

export const getDefaultConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate: '%s - Canada.ca',
  defaultTitle:
    "Passport Application Status Checker | Vérificateur de l'état d'une demande de passeport",
  description:
    "Avoid waiting on the phone and request the status of your application online. | Évitez d'attendre au téléphone et demandez l'état de votre demande en ligne.",
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Employment and Social Development Canada',
    },
    {
      name: 'author',
      keyOverride: 'author:fr',
      lang: 'fr',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Employment and Social Development Canada',
    },
    {
      name: 'dcterms.creator',
      keyOverride: 'dcterms.creator:fr',
      lang: 'fr',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.language', content: 'eng' },
    {
      name: 'dcterms.language',
      keyOverride: 'dcterms.language:fr',
      lang: 'fr',
      content: 'fra',
    },
    { name: 'dcterms.service', content: 'ESDC-EDSC_PASC-VEDP' },
    { name: 'dcterms.spatial', content: 'Canada' },
    {
      name: 'dcterms.subject',
      content: 'Travel and Tourism',
    },
    {
      name: 'dcterms.subject',
      keyOverride: 'dcterms.subject:fr',
      lang: 'fr',
      content: 'Voyage et tourisme',
    },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'en_CA',
    siteName:
      "Passport Application Status Checker | Vérificateur de l'état d'une demande de passeport - Canada.ca",
    type: 'website',
  },
  twitter: {
    site: '@CitImmCanada',
    cardType: 'summary_large_image',
  },
})

export const getEnglishConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate: '%s - Passport Application Status Checker - Canada.ca',
  defaultTitle: 'Passport Application Status Checker - Canada.ca',
  description:
    'Avoid waiting on the phone and request the status of your application online.',
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Employment and Social Development Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Employment and Social Development Canada',
    },
    { name: 'dcterms.language', content: 'eng' },
    { name: 'dcterms.service', content: 'ESDC-EDSC_PASC-VEDP' },
    { name: 'dcterms.spatial', content: 'Canada' },
    {
      name: 'dcterms.subject',
      content: 'Travel and Tourism',
    },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'en_CA',
    siteName: 'Passport Application Status Checker - Canada.ca',
    type: 'website',
  },
  twitter: {
    site: '@CitImmCanada',
    cardType: 'summary_large_image',
  },
})

export const getFrenchConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate:
    "%s - Vérificateur de l'état d'une demande de passeport - Canada.ca",
  defaultTitle: "Vérificateur de l'état d'une demande de passeport - Canada.ca",
  description:
    "Évitez d'attendre au téléphone et demandez l'état de votre demande en ligne.",
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.language', content: 'fra' },
    { name: 'dcterms.service', content: 'ESDC-EDSC_PASC-VEDP' },
    { name: 'dcterms.spatial', content: 'Canada' },
    {
      name: 'dcterms.subject',
      content: 'Voyage et tourisme',
    },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'fr_CA',
    siteName: "Vérificateur de l'état d'une demande de passeport - Canada.ca",
    type: 'website',
  },
  twitter: {
    site: '@citimmcanfr',
    cardType: 'summary_large_image',
  },
})

export const getNextSEOConfig: GetNextSEOConfig = (appBaseUri, router) => {
  const { locale } = router
  if (locale === 'en') return getEnglishConfig(appBaseUri, router)
  if (locale === 'fr') return getFrenchConfig(appBaseUri, router)
  return getDefaultConfig(appBaseUri, router)
}
