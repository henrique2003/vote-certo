import { Request, Response, NextFunction } from 'express'

import { auth } from '../../src/app/middlewares/auth'

describe('Auth', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const mockNext: NextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: jest.fn()
    }
  })

  test('should receive unouthorized when token not found or is empty', () => {
    mockRequest = {
      headers: {

      }
    }

    const res = auth(mockRequest as Request, mockResponse as Response, mockNext)

    expect(res.status).toBe(401)
  })

  // test('should receive unouthorized when token is invalid', () => {
  //   const res = auth(mockRequest as Request, mockResponse as Response, mockNext)

  //   expect(res.status).toBe(401)
  // })

  // test('should receive unouthorized when token is valid', () => {
  //   const res = auth(mockRequest as Request, mockResponse as Response, mockNext)

  //   expect(res.status).toBe(401)
  // })
})
