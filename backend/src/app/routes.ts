import { Router } from 'express'

import Candidate from './controllers/candidate'
import User from './controllers/user'
import { auth } from './middlewares/auth'

const routes = Router()

const candidate = new Candidate()
const user = new User()

// User
routes.post('/user/register', user.register)
routes.post('/user/login', user.login)
routes.get('/user', auth, user.loadUser)

// Candidate
routes.get('/candidate', auth, candidate.get)
routes.post('/candidate', auth, candidate.create)
routes.put('/candidate', auth, candidate.vote)

export default routes
