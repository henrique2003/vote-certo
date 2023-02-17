import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default function generateToken(userId: string): string {
  return `Bearer ${jwt.sign({ id: userId }, process.env.JWT_SECRET_ID, { expiresIn: '1d' })}`
}
