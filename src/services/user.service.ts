import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  // getToClientUser(user: Partial<User>): Partial<User> {
  //   //Aqui podemos sobreescribir las propiedades que queremos excluir
  //   //asignandoles undefined
  //   return { ...user, password: undefined }
  // }

  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Could not save user', error)
    })

    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }

    return newUser
  }
  async login(user: User) {
    try {
      const existingUser = await Users.findOne({ email: user.email });
      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }
  
      const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
      if (!passwordMatch) {
        throw new Error("Contraseña incorrecta");
      }
      return existingUser;
    } catch (error) {
      console.error("Error en la función login:", error);
      throw boom.badRequest("Error al iniciar sesión");
    }
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }

    return user
  }

  async listUsuarios() {
    const users = await Users.find({}).catch((error) => {
      console.log('Could not retrieve user info', error)
    })
    if (!users) {
      throw boom.notFound('not users')
    }
    return users
  }
}

export default UserService
