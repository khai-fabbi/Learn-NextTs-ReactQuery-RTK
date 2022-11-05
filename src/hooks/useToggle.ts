import { useCallback, useState } from 'react'

export const useToggle = (initialState: boolean = false): [boolean, any] => {
  // Initialize the state
  const [value, setValue] = useState<boolean>(initialState)
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setValue((prev) => !prev), [])
  return [value, toggle]
}
