import request, { Response } from 'supertest'

import app from '../../src/app'

interface IRegister {
  email: string
  password: string
}

async function post(route: string, data: IRegister): Promise<Response> {
  const res = await request(app)
    .post(`/api/user${route}`)
    .send(data)

  return res
}

export default post
