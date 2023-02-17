import validator from 'validator'

describe('Validotr', () => {
  test('should receive false when email is invalid', () => {
    expect(validator.isEmail('henrique.com')).toBe(false)
  })

  test('should receive true when email is valid', () => {
    expect(validator.isEmail('henrique@gmail.com')).toBe(true)
  })
})
