import { User } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

import prismaClient from '../../src/app/prisma'

interface IParams {
  email: string
  password: string
}

async function createUser(params: IParams): Promise<User> {
  return await prismaClient.user.create({
    data: {
      id: uuidv4(),
      email: params.email,
      password: params.password
    }
  })
}

export default createUser
