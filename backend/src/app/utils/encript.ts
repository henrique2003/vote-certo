import bcrypt from 'bcrypt'

async function encript(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export default encript
