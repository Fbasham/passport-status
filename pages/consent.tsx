import { FC, MouseEventHandler, useCallback } from 'react'
import { setCookie } from 'cookies-next'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import ActionButton from '../components/ActionButton'
import router from 'next/router'

const Consent: FC = () => {
  const { t } = useTranslation('consent')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      router.push('/email')
    },
    []
  )

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>
      <h2 className="my-14">{t('description')}</h2>
      <div className="flex justify-center flex-wrap text-xl gap-4">
        <div id="yes-button">
          <ActionButton
            text={t('yes-button')}
            onClick={handleOnAgreeClick}
            style="primary"
          />
        </div>
        <div id="no-button">
          <LinkButton text={t('no-button')} href="/contact" />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'consent',
    ])),
  },
})

export default Consent