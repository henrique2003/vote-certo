import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import prismaClient from '../prisma'
import { serverError, badRequest, success, createSuccess } from '../helpers/response-status'
import { validateEmptyField, generateToken, validateEmail, encript } from '../utils'

export default class User {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      if (!validateEmptyField(password)) {
        return badRequest(res, 'Senha em branco')
      }

      if (!validateEmail(email)) {
        return badRequest(res, 'Email inválido')
      }

      if (await prismaClient.user.findUnique({ where: { email } })) {
        return badRequest(res, 'Email já esta em uso')
      }

      const encriptedPassword = await encript(password)

      const newUser = await prismaClient.user.create({
        data: {
          id: uuidv4(),
          email,
          password: encriptedPassword
        }
      })

      delete newUser.password

      // Generate token
      const token = generateToken(newUser.id)

      return createSuccess(res, { user: newUser, token })
    } catch (error) {
      return serverError(res, error)
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      // Validations
      if (!validateEmptyField(password)) {
        return badRequest(res, 'Senha em branco')
      }

      if (!validateEmail(email)) {
        return badRequest(res, 'Email inválido')
      }

      // Login
      const user = await prismaClient.user.findUnique({ where: { email } })

      if (!user) {
        return badRequest(res, 'Usuário não encontrado')
      }

      if (!await bcrypt.compare(password, user.password)) {
        return badRequest(res, 'Senha invalida')
      }

      delete user.password

      // Generate token
      const token = generateToken(user.id)

      return success(res, { user, token })
    } catch (error) {
      return serverError(res, error)
    }
  }

  public async loadUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: req.userId
        }
      })
      delete user.password

      return success(res, user)
    } catch (error) {
      return serverError(res, error)
    }
  }
}
