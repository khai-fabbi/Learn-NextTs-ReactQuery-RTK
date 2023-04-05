import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full">
    {props.meta}

    <div className="w-full mx-auto">
      <Header></Header>
      <div className="max-w-6xl p-5 mx-auto">{props.children}</div>
      <Footer />
    </div>
  </div>
)

export { Main }
