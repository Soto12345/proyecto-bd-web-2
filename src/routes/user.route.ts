import express, { response } from 'express'
import { User, UserModel } from '../types/user.type'
import UserService from '../services/user.service'
import boom from '@hapi/boom'

const router = express.Router()
const service = new UserService()

router.post('/register', async (req, res, next) => {
  try {
    //TODO: Validate user data coming from the request
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(200).json({ status:200,mensaje:"peticion realizada correctamente",user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query
    const user = await service.findByEmail(email as string)
    console.log({ user })

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
})
router.post('/login', async (req, res, next) => {
  try {
    const user: User = req.body
    const existingUser = await service.login(user)
    if (existingUser) {
      res.status(200).json({
        status: 200,
        mensaje: 'peticion realizada correctamente',
        respuesta: { user: existingUser }
      })
    } else {
      res.status(400).json({ status: 400, mensaje: 'Credenciales incorrectas' })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/list', async (req, res, next) => {
  try {
    const users = await service.listUsuarios()
    console.log({ users })
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
})
export default router
