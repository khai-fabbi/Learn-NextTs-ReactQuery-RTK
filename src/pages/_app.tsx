import '@/styles/main.scss'
import '@/styles/pagination.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
const queryClient = new QueryClient()
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Provider store={store}>
        <ToastProvider>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </ToastProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
