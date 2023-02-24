import '@/styles/main.scss'
import '@/styles/pagination.scss'

import type { EmotionCache } from '@emotion/react'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

import type { NextPageWithLayout } from '@/models'
import lightThemeOptions from '@/styles/theme/light-theme-option'
import createEmotionCache from '@/utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}

const lightTheme = createTheme(lightThemeOptions)
const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
