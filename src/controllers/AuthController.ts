import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models';

const AuthController = {
  authGoogle: ({ token }) => new Promise<UserModel>((resolve, reject) => {
    const decodedToken = jwt.decode(token, {
      json: false,
    }) as { email: string; };
    UserModel.findOrCreate({
      where: {
        email: decodedToken.email,
      },
    })
      .then(([user]) => {
        UserModel.update({
          login_at: new Date(),
        }, {
          where: {
            user_id: user.get('user_id'),
          },
        });
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  }),

  authMember: ({ user_id, password }) => new Promise<UserModel>(
    (resolve, reject) => {
      if (password === process.env.STARROOM_PASSWORD) {
        UserModel.update({
          isMember: true,
        }, {
          where: {
            user_id,
          },
          returning: true,
        })
          .then(([, user]) => {
            resolve(user[0]);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject();
      }
    },
  ),
};

export default AuthController;
