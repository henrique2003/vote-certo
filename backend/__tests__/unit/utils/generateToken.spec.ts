import generateToken from '../../../src/app/utils/generateToken'

describe('GenerateToken', () => {
  test('should receive token', () => {
    const token = generateToken('123')

    expect(token).not.toBeNaN()
  })
})
