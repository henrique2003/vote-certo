import bcrypt from 'bcrypt'

describe('User Controller', () => {
  test('should receive true when compare params to be equals', async () => {
    const hash = await bcrypt.hash('123', 10)
    const compare = await bcrypt.compare('123', hash)

    expect(compare).toBe(true)
  })

  test('should receive true when compare params to be equals', async () => {
    const hash = await bcrypt.hash('123', 10)
    const compare = await bcrypt.compare('12', hash)

    expect(compare).toBe(false)
  })
})
