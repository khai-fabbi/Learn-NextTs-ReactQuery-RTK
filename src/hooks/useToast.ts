import { useToastDispatchContext } from '@/context/ToastContext'
import { DELAY_MESSAGE } from '@/utils/constant'

export function useToast(delayTime = DELAY_MESSAGE) {
  const dispatch = useToastDispatchContext()

  function toast(type: 'success' | 'error' | 'warning', message: string) {
    const id = Math.random().toString(36)
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        type,
        message,
        id,
      },
    })

    setTimeout(() => {
      dispatch({ type: 'DELETE_TOAST', id })
    }, delayTime)
    return id
  }

  return toast
}
