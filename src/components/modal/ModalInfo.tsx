import type { ReactNode } from 'react'
import Modal from 'react-modal'

import { IconXMark } from '../icon'

interface ModalInfoProps {
  isOpen: boolean
  toggleModal: () => void
  children: ReactNode
}

export default function ModalInformation(props: ModalInfoProps) {
  const { isOpen = false, toggleModal, children } = props

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      overlayClassName="fixed inset-0 bg-black-origin bg-opacity-50 z-50 flex items-center justify-center"
      ariaHideApp={false}
      className="w-4/5 max-w-3xl bg-white rounded-md outline-none relative max-h-[90vh] overflow-y-auto shadow-sdprimary"
      contentLabel="Example Modal"
    >
      <div
        className="absolute flex items-center justify-center w-8 h-8 transition-all rounded-full cursor-pointer top-5 right-5 hover:bg-gray-300"
        onClick={toggleModal}
        data-cy="btnClose"
      >
        <IconXMark />
      </div>
      <div className="p-5 border-b border-gray-2">
        <h2 className="text-xl">Title Modal</h2>
      </div>
      <div className="p-5">{children}</div>
    </Modal>
  )
}
