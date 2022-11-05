import type { ReactNode } from 'react'
import React, { createContext, useContext, useReducer } from 'react'

const ToastStateContext = createContext<State>({ toasts: [] })
const ToastDispatchContext = createContext<any>(null)

interface State {
  toasts: any[]
}

interface Action {
  type: string
  id: number | string
  toast: any
}

function ToastReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      }
    }
    case 'DELETE_TOAST': {
      const updatedToasts = state.toasts.filter((e) => e.id !== action.id)
      return {
        ...state,
        toasts: updatedToasts,
      }
    }
    default: {
      throw new Error('unhandled action')
    }
  }
}

export function ToastProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: [],
  })

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}

export const useToastStateContext = () => useContext(ToastStateContext)
export const useToastDispatchContext = () => useContext(ToastDispatchContext)
