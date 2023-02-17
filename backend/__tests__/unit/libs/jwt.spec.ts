import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const secret = 'test'

function signToken(): string {
  return jwt.sign({ id: uuidv4() }, secret, { expiresIn: '1d' })
}

function verifyToken(token: string, secret: string): boolean {
  let validToken = false

  try {
    jwt.verify(token, secret)
    validToken = true
  } catch (error) {
    validToken = false
  }

  return validToken
}

describe('Jwt sign', () => {
  test('should receive true when create token', () => {
    const token = signToken()

    expect(token).not.toBeNull()
    expect(token).not.toBeNaN()
  })
})

describe('Jwt verify', () => {
  test('should receive false when token is invalid', () => {
    signToken()
    expect(verifyToken('123', secret)).toBe(false)
  })

  test('should receive false when secret is invalid', () => {
    const token = signToken()
    expect(verifyToken(token, 'test1')).toBe(false)
  })

  test('should receive true when token and secret are valid', () => {
    const token = signToken()
    expect(verifyToken(token, secret)).toBe(true)
  })
})
