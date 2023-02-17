import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import prismaClient from '../prisma'
import { serverError, badRequest, success, createSuccess } from '../helpers/response-status'

export default class Candidate {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body

      if (!name.trim()) {
        return badRequest(res, 'Nome em branco')
      }

      if (await prismaClient.candidate.findUnique({ where: { name } })) {
        return badRequest(res, 'Nome já esta em uso')
      }

      const newCandidate = await prismaClient.candidate.create({
        data: {
          id: uuidv4(),
          name,
          votes: 0
        }
      })

      return createSuccess(res, { candidate: newCandidate })
    } catch (error) {
      return serverError(res, error)
    }
  }

  public async vote(req: Request, res: Response): Promise<Response> {
    try {
      const { candidateId } = req.body

      if (!candidateId.trim()) {
        return badRequest(res, 'Senha em branco')
      }

      const candidate = await prismaClient.candidate.findUnique({ where: { id: candidateId } })

      if (!candidate) {
        return badRequest(res, 'Candidato não encontrado')
      }

      await prismaClient.candidate.update({
        where: {
          id: candidateId
        },
        data: {
          votes: candidate.votes + 1
        }
      })

      return success(res, {})
    } catch (error) {
      return serverError(res, error)
    }
  }

  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const user = await prismaClient.candidate.findUnique({
        where: {
          id: req.userId
        }
      })

      return success(res, user)
    } catch (error) {
      return serverError(res, error)
    }
  }
}
