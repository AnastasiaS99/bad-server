import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import {
    LoginValidation,
    RegisterValidation,
    UpdateUserValidation,
} from '../utils/addvalidation'
import { csrfProtection, generateCsrfToken } from '../middlewares/csrf'

const authRouter = Router()
authRouter.get('/csrf-token', (req, res) => {
    const csrfToken = generateCsrfToken(req, res)
    res.status(200).json({ csrfToken })
})

authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', UpdateUserValidation, auth, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', csrfProtection, LoginValidation, login)
authRouter.get('/token', refreshAccessToken)
authRouter.get('/logout', logout)
authRouter.post('/register', csrfProtection, RegisterValidation, register)

export default authRouter