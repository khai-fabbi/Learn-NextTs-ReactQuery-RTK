import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useState } from 'react'

import Badge from '@/components/badge/Badge'
import { Button, ButtonOutline } from '@/components/button'
import ButtonSquare from '@/components/button/ButtonSquare'
import { Checkbox } from '@/components/checkbox'
import { FormGroup } from '@/components/common'
import { IconChevronBack, IConDelete, IconEye } from '@/components/icon'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { ModalInformation } from '@/components/modal'
import { TogglePrimary } from '@/components/toggle'
import { useHover, useToast, useToggle } from '@/hooks'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'

const About: NextPageWithLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isActive, onChangeStatus] = useToggle(false)
  const [hoverRef, isHovered] = useHover<HTMLSpanElement>()
  const toast = useToast()

  const router = useRouter()

  const handleRedirectToPost = () => {
    // router.push({
    //   pathname: '/posts/[postId]',
    //   query: { postId: 3, name: 'khai' },
    // })
    router.push({
      pathname: '/posts',
    })
  }
  const handleShowToast = () => {
    toast('success', 'SuccessFully')
  }
  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Link href="/" passHref legacyBehavior>
        <a className="btn btn-primary">Home</a>
      </Link>
      <button className="ml-5 btn btn-primary" onClick={handleRedirectToPost}>
        Go to Post
      </button>
      <button className="ml-5 btn btn-info" onClick={handleShowToast}>
        Show Toast
      </button>
      <button className="ml-5 btn btn-info" onClick={handleToggleModal}>
        Show Modal
      </button>
      <div className="mt-5">
        <TogglePrimary isChecked={isActive} onChange={onChangeStatus} />
      </div>

      <Button>保存する</Button>
      <ButtonOutline className="ml-5">キャンセル</ButtonOutline>
      <Badge className="bg-[#AEE9D1]">すべて購入</Badge>
      <div className="mt-5">
        <span ref={hoverRef}>{isHovered ? 'Haha 😁' : 'Hover Me! ☹️'}</span>
      </div>
      <div className="flex gap-5 my-5">
        <IconEye />
        <IConDelete />
        <IconChevronBack />
      </div>
      <FormGroup>
        <Label htmlFor="test-id">Username</Label>
        <Input name="test" placeholder="Test placeholder">
          <span className="text-gray-7">11/20</span>
        </Input>
      </FormGroup>

      <div className="my-5">
        <Checkbox />
      </div>

      <input type="number" className="w-32 input " />

      {/* <div className="btn-group">
        <button className="btn btn-active">Button</button>
        <button className="btn">Button</button>
        <button className="btn">Button</button>
      </div> */}

      <ButtonSquare>
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 4.99976H3.41401L6.70701 1.70676C7.09801 1.31576 7.09801 0.683762 6.70701 0.292762C6.31601 -0.0982383 5.68401 -0.0982383 5.29301 0.292762L0.293006 5.29276C-0.0979941 5.68376 -0.0979941 6.31576 0.293006 6.70676L5.29301 11.7068C5.48801 11.9018 5.74401 11.9998 6.00001 11.9998C6.25601 11.9998 6.51201 11.9018 6.70701 11.7068C7.09801 11.3158 7.09801 10.6838 6.70701 10.2928L3.41401 6.99976H15C15.553 6.99976 16 6.55176 16 5.99976C16 5.44776 15.553 4.99976 15 4.99976Z"
            fill="#5C5F62"
          />
        </svg>
      </ButtonSquare>

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
