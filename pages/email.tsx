import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import { useMemo, useState, useCallback } from 'react'
import ErrorSummary, {
  ErrorSummaryItem,
  GetErrorSummary,
} from '../components/ErrorSummary'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import Modal from '../components/Modal'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import useEmailEsrf from '../lib/useEmailEsrf'
import { EmailEsrfApiRequestBody } from '../lib/types'
import { useIdleTimer } from 'react-idle-timer'
import { deleteCookie } from 'cookies-next'

const initialValues: EmailEsrfApiRequestBody = {
  dateOfBirth: '',
  email: '',
  givenName: '',
  surname: '',
}

export default function Email() {
  const { t } = useTranslation('email')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [isIdle, setIsIdle] = useState(false)

  const handleOnIdleTimerIdle = useCallback(() => {
    setIsIdle(true)
    setModalOpen(true)
  }, [])

  const { reset: resetIdleTimer } = useIdleTimer({
    onIdle: handleOnIdleTimerIdle,
    //15 minute timeout
    timeout: 15 * 60 * 1000,
  })

  const handleOnModalRedirectButtonClick = useCallback(() => {
    //If user is idle and selects option to go back, clear the cookie so they get redirected to /expectations instead
    if (isIdle) {
      deleteCookie('agreed-to-email-esrf-terms')
    }
    router.push('/landing')
  }, [isIdle, router])

  const handleOnModalResetButtonClick = useCallback(() => {
    setModalOpen(false)
    if (isIdle) {
      setIsIdle(false)
      resetIdleTimer()
    }
  }, [isIdle, resetIdleTimer])

  const {
    isLoading: isEmailEsrfLoading,
    isSuccess: isEmailEsrfSuccess,
    error: emailEsrfError,
    mutate: emailEsrf,
  } = useEmailEsrf()

  const formik = useFormik<EmailEsrfApiRequestBody>({
    initialValues,
    validationSchema: Yup.object({
      dateOfBirth: Yup.date()
        .required('date-of-birth.error.required')
        .max(new Date(), 'dateOfBirth.error.current'),
      email: Yup.string()
        .required('email.error.required')
        .email('email.error.valid'),
      givenName: Yup.string().required('given-name.error.required'),
      surname: Yup.string().required('surname.error.required'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values) => emailEsrf(values),
  })

  const errorSummary = useMemo<ErrorSummaryItem[]>(
    () => GetErrorSummary(formik.errors, t),
    [formik, t]
  )

  //if the api failed, fail hard to show error page
  if (emailEsrfError) throw emailEsrfError

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>

      {isEmailEsrfSuccess ? (
        <>
          <h2 className="my-4">
            {t('email-confirmation-msg.request-received')}
          </h2>
          <p className="mb-4">{t('email-confirmation-msg.if-exists')}</p>
          <p className="mb-4">
            {t('email-confirmation-msg.please-contact')}{' '}
            <b>{t('common:email-confirmation-msg.phone-number')}</b>.
          </p>
          <LinkSummary
            title={t('common:contact-program')}
            links={t<string, LinkSummaryItem[]>('common:program-links', {
              returnObjects: true,
            })}
          />
        </>
      ) : (
        <form onSubmit={formik.handleSubmit} id="form-email-esrf">
          <p>{t('description')}</p>
          {errorSummary.length > 0 && (
            <ErrorSummary
              id="error-summary-email-esrf"
              summary={t('common:found-errors', {
                count: errorSummary.length,
              })}
              errors={errorSummary}
            />
          )}
          <InputField
            id="email"
            name="email"
            label={t('email.label')}
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={formik.errors.email && t(formik.errors.email)}
            textRequired={t('common:required')}
            required
            helpMessage={t('help-message.email')}
          />
          <InputField
            id="givenName"
            name="givenName"
            label={t('given-name.label')}
            onChange={formik.handleChange}
            value={formik.values.givenName}
            errorMessage={formik.errors.givenName && t(formik.errors.givenName)}
            textRequired={t('common:required')}
            required
            helpMessage={t('help-message.given-name')}
          />
          <InputField
            id="surname"
            name="surname"
            label={t('surname.label')}
            onChange={formik.handleChange}
            value={formik.values.surname}
            errorMessage={formik.errors.surname && t(formik.errors.surname)}
            textRequired={t('common:required')}
            required
            helpMessage={t('help-message.surname')}
          />
          <InputField
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            label={t('date-of-birth.label')}
            onChange={formik.handleChange}
            value={formik.values.dateOfBirth}
            errorMessage={
              formik.errors.dateOfBirth && t(formik.errors.dateOfBirth)
            }
            max={'9999-12-31'}
            textRequired={t('common:required')}
            required
            helpMessage={t('help-message.date-of-birth')}
          />
          <div className="flex gap-2 flex-wrap my-2">
            <ActionButton
              id="btn-submit"
              disabled={isEmailEsrfLoading}
              type="submit"
              text={t('email-esrf')}
              style="primary"
            />
            <ActionButton
              id="btn-cancel"
              disabled={isEmailEsrfLoading}
              text={t('common:modal.cancel-button')}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </form>
      )}
      <Modal
        open={modalOpen}
        actionButtons={[
          {
            text: t('common:modal.yes-button'),
            onClick: handleOnModalRedirectButtonClick,
            style: 'primary',
            type: 'button',
          },
          {
            text: t('common:modal.no-button'),
            onClick: handleOnModalResetButtonClick,
            style: 'default',
            type: 'button',
          },
        ]}
      >
        {isIdle ? t('common:modal.idle') : t('common:modal.description')}
      </Modal>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'email'])),
  },
})