import { createUser, post, truncate } from '../helpers'
import { encript, generateToken } from '../../src/app/utils'
import request from 'supertest'
import app from '../../src/app'

describe('User Controller', () => {
  afterEach(async () => {
    await truncate()
  })

  it('should receive user data and jwt token when created a new user with valid credentials', async () => {
    const user = {
      email: 'henrique.cristioglu@gmail.com',
      password: 'hsw123'
    }

    const res = await post('/register', user)

    expect(res.status).toBe(201)
    expect(res.body.user.email).toBe(user.email)
    expect(res.body).toHaveProperty('token')
  })

  it('should receive user data and jwt token when make login with valid credentials', async () => {
    await createUser({
      email: 'henrique.cristioglu@gmail.com',
      password: await encript('123')
    })

    const res = await post('/login', {
      email: 'henrique.cristioglu@gmail.com',
      password: '123'
    })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should receive user data when user is loged', async () => {
    const user = await createUser({
      email: 'henrique.cristioglu@gmail.com',
      password: await encript('123')
    })

    const token = generateToken(user.id)

    const res = await request(app)
      .get('/api/user')
      .set('Authorization', token)

    expect(res.status).toBe(200)
  })
})
