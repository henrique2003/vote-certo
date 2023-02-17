import prismaClient from '../../src/app/prisma'
import { post, truncate, expectBadRequest, createUser } from '../helpers'
import { encript } from '../../src/app/utils'

describe('Register', () => {
  afterEach(async () => {
    await truncate()
  })

  const routeName = '/register'

  test('should receive bad request when email input is empty', async () => {
    const res = await post(routeName, {
      email: ' ',
      password: 'hsw123'
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when password input is empty', async () => {
    const res = await post(routeName, {
      email: 'henrique.cristioglu@gmail.com',
      password: ' '
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when password and email inputs are empty', async () => {
    const res = await post(routeName, {
      email: ' ',
      password: ' '
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when email is invalid', async () => {
    const res = await post(routeName, {
      email: 'henrique.cristioglu.com',
      password: '123'
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when repeat email', async () => {
    const user = await prismaClient.user.create({
      data: {
        id: '132',
        email: 'henrique.cristioglu@gmail.com',
        password: '123'
      }
    })

    const res = await post(routeName, {
      email: user.email,
      password: '123'
    })

    expectBadRequest(res.status)
  })
})

describe('Login', () => {
  beforeEach(async () => {
    await truncate()
  })

  const routeName = '/login'

  test('should receive bad request when email input is empty', async () => {
    const res = await post(routeName, {
      email: ' ',
      password: '123'
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when password input is empty', async () => {
    const res = await post(routeName, {
      email: 'henrique.cristioglu@gmail.com',
      password: ' '
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when password and email inputs are empty', async () => {
    const res = await post(routeName, {
      email: ' ',
      password: ' '
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when email is invalid', async () => {
    const res = await post(routeName, {
      email: 'henrique.cristioglu.com',
      password: '123'
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when user is invalid', async () => {
    await prismaClient.user.create({
      data: {
        id: '1',
        email: 'henrique.cristioglu@gmail.com',
        password: await encript('123')
      }
    })

    const res = await post(routeName, {
      email: 'cristioglu@gmail.com',
      password: '123'
    })

    expectBadRequest(res.status)
  })

  test('should receive bad request when password is invalid', async () => {
    await createUser({
      email: 'henrique.cristioglu@gmail.com',
      password: await encript('13')
    })

    const res = await post(routeName, {
      email: 'henrique.cristioglu@gmail.com',
      password: '123'
    })

    expectBadRequest(res.status)
  })
})
