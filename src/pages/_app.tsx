import '@/styles/main.scss'
import '@/styles/pagination.scss'

import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

import { ToastContainer } from '@/components/toast'
import { ToastProvider } from '@/context/ToastContext'
import type { NextPageWithLayout } from '@/models'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return (
    <ToastProvider>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </ToastProvider>
  )
}

export default MyApp
