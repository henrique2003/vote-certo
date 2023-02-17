import { validateEmail } from '../../../src/app/utils/validateEmail'

describe('ValidateEmail', () => {
  test('should receive false when email is invalid', () => {
    expect(validateEmail('henrique.com')).toBe(false)
  })

  test('should receive true when email is valid', () => {
    expect(validateEmail('henrique@gmail.com')).toBe(true)
  })
})
