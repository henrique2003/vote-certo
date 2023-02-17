import prismaClient from '../../src/app/prisma'

const truncate = async (): Promise<void> => {
  await prismaClient.candidate.deleteMany()
  await prismaClient.user.deleteMany()
}

export default truncate
