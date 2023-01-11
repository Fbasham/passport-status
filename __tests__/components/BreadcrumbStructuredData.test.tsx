import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import BreadcrumbStructuredData from '../../components/BreadcrumbStructuredData'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>
    },
  }
})

describe('BreadcrumbStructuredData', () => {
  it('renders BreadcrumbStructuredData script', () => {
    render(
      <BreadcrumbStructuredData
        items={[
          {
            link: 'https://canada.ca',
            text: 'Canada.ca',
          },
          {
            link: 'https://exmample.com',
            text: 'Example Item',
          },
        ]}
      />,
      {
        container: document.head,
      }
    )

    const script = document.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"]'
    )
    expect(script).not.toBeNull()
    expect(script?.text).toBe(
      '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[[{"@type":"ListItem","position":1,"name":"Canada.ca","item":"https://canada.ca"},{"@type":"ListItem","position":2,"name":"Example Item","item":"https://exmample.com"}]]}'
    )
  })
})
