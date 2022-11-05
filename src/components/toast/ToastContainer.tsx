import { useToastStateContext } from '@/context/ToastContext'

import Toast from './Toast'

export default function ToastContainer() {
  const { toasts } = useToastStateContext()

  return (
    <div className="fixed top-0 right-0 z-50 animate-fade">
      <div className="max-w-xl mx-auto">
        {toasts &&
          toasts.map((toast) => (
            <Toast
              id={toast.id}
              key={toast.id}
              type={toast.type}
              message={toast.message}
            />
          ))}
      </div>
    </div>
  )
}
