import { FC } from 'react'

import Head from 'next/head'

import { BreadcrumbProps } from './Breadcrumb'

const BreadcrumbStructuredData: FC<BreadcrumbProps> = ({ items }) => {
  const itemListElement =
    items?.map(({ text, link }, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': text,
      'item': link,
    })) ?? []
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [itemListElement],
  }
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}

export default BreadcrumbStructuredData
