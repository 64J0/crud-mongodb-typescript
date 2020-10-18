import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IUser from '../@types/user';

export default class User {
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: IUser) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toJson() {
    return ({
      name: this.name,
      email: this.email
    });
  }

  async comparePassword(plainText: string) {
    return await bcrypt.compare(plainText, this.password);
  }

  encoded() {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
        ...this.toJson()
      },
      process.env.SECRET_KEY
    )
  }

  static async decoded(userJwt: string) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res: IUser) => {
      if (error) {
        return { error };
      }
      return new User(res);
    })
  }
}