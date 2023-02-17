import validator from 'validator'

export function validateEmail(email: string): boolean {
  if (!validator.isEmail(email)) {
    return false
  }

  return true
}
