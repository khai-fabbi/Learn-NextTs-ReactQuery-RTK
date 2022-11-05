import { VALIDATE_EMAIL, VALIDATE_REQUIRED } from './constant'

export const validateEmail = (value: any) => {
  let error = false
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (value && !regexEmail.test(value)) {
    error = true
  }
  return error
}
const validateRequired = (value: any) => {
  let error = false
  if (
    (typeof value === 'string' && !value.trim().length) ||
    typeof value === 'undefined' ||
    value === null
  ) {
    error = true
  }
  return error
}

export const handleValidates: { [index: string]: (value: any) => any } = {
  [VALIDATE_EMAIL]: validateEmail,
  [VALIDATE_REQUIRED]: validateRequired,
}
