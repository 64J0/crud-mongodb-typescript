import bcrypt from 'bcryptjs';
import User from './User';
import UsersDAO from '../dao/usersDAO';
import IUser from '../@types/user';

import { Request, Response } from 'express';

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
}

export default class UserController {
  static async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const userFromBody: IUser = request.body;

      if (
        !userFromBody.email ||
        !userFromBody.name ||
        !userFromBody.password
      ) {
        return response.status(400).json({
          message: 'All the parameters (email, name and password) must be specified'
        });
      }

      const foundUser = await UsersDAO.getUser(userFromBody.email);

      if (foundUser?._id) {
        return response.status(400).json({
          message: 'A user with this e-mail already exists'
        });
      }

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password)
      };

      const insertResult = await UsersDAO.addUser(userInfo);

      if (!insertResult._id) {
        throw new Error('Internal error, please try again later');
      }

      const newUser = new User(insertResult);

      return response.status(200).json({
        auth_token: newUser.encoded(),
        user: newUser.toJson()
      });
    } catch (e) {
      console.error(`An error has ocurred and the user couldn't be create: ${e}`);
      return response.status(500).json({ error: e });
    }
  }

  static async readUser(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          message: 'Id not informed'
        });
      }

      const foundUser = await UsersDAO.getUserById(id);

      if (!foundUser) {
        return response.status(400).json({
          message: 'User not found'
        });
      }

      const newUser = new User(foundUser);

      return response.status(200).json({
        user: newUser.toJson()
      });
    } catch (e) {
      console.error(`An error has ocurred and the user couldn't be found: ${e}`);
      return response.status(500).json({ error: e });
    }
  }

  static async updateUser(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          message: 'Id not informed'
        });
      }

      const foundUserById = await UsersDAO.getUserById(id);

      if (!foundUserById._id) {
        return response.status(400).json({
          message: 'User not found'
        })
      }

      const userFromBody: IUser = request.body;

      if (
        !userFromBody.email ||
        !userFromBody.name ||
        !userFromBody.password
      ) {
        return response.status(400).json({
          message: 'The parameters email, name and password must be specified'
        });
      }

      const foundUserByEmail = await UsersDAO.getUser(userFromBody.email);

      if (
        foundUserByEmail._id &&
        foundUserByEmail._id.toString() !== foundUserById._id.toString()
      ) {
        return response.status(400).json({
          message: 'User with this e-mail already exists'
        })
      }

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password)
      };

      const updatedUser = await UsersDAO.updateUser(foundUserById.email, userInfo);

      const newUser = new User(updatedUser);

      return response.status(200).json({
        user: newUser.toJson()
      });
    } catch (e) {
      console.error(`An error has ocurred and the user couldn't be updated: ${e}`);
      return response.status(500).json({ error: e });
    }
  }

  static async deleteUser(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          message: 'Id not informed'
        });
      }

      const foundUser = await UsersDAO.getUserById(id);

      if (!foundUser._id) {
        return response.status(400).json({
          message: 'User not found'
        })
      }

      await UsersDAO.deleteUser(foundUser.email);

      return response.status(200).json({
        message: 'User deleted'
      });
    } catch (e) {
      console.error(`An error has ocurred and the user couldn't be updated: ${e}`);
      return response.status(500).json({ error: e });
    }
  }
};