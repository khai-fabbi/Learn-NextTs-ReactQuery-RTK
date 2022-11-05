import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface IAlertProps {
  msg?: string
}

function AlertSuccess(props: IAlertProps) {
  const { msg = '保存しました' } = props
  const [show, setShow] = useState(false)
  useEffect(() => {
    let id: any
    if (msg) {
      setShow(true)
      id = setTimeout(() => {
        setShow(false)
      }, 5000)
    }
    return () => {
      if (id) {
        clearTimeout(id)
      }
    }
  }, [msg])
  return (
    <div
      className={clsx(
        'xs:w-full xs:top-16 xs:left-0 animate-fade fixed flex justify-center items-center rounded-sm bg-white md:left-auto md:right-4 md:w-auto',
        {
          hidden: !show,
        }
      )}
    >
      <div className="w-full rounded-sm alert alert-success">
        <div className="flex-1">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            ></path>
          </svg> */}
          <label>{msg}</label>
        </div>
      </div>
    </div>
  )
}

export default AlertSuccess
