import { validateEmptyField } from '../../../src/app/utils/validateEmptyField'

describe('ValidateEmptyField', () => {
  test('should receive false when field is empty', () => {
    expect(validateEmptyField(' ')).toBe(false)
  })

  test('should receive true when field is not empty', () => {
    expect(validateEmptyField('123')).toBe(true)
  })
})
