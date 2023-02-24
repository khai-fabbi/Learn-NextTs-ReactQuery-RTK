import type { ReactElement } from 'react'
import { useState } from 'react'

import { ModalInformation } from '@/components/modal'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const About: NextPageWithLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <p className="mt-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
      <p className="">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
      <ModalInformation isOpen={isOpen} toggleModal={handleToggleModal}>
        Test Modal
      </ModalInformation>
    </>
  )
}
About.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="About" description="About" />}>{page}</Main>
}

export default About
