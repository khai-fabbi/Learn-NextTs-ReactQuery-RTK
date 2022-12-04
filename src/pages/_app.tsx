import '@/styles/main.scss'
import '@/styles/pagination.scss'

import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'

import { ToastContainer } from '@/components/toast'
import { ToastProvider } from '@/context/ToastContext'
import type { NextPageWithLayout } from '@/models'

import { store } from '../app/store'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return (
    <Provider store={store}>
      <ToastProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </ToastProvider>
    </Provider>
  )
}

export default MyApp
