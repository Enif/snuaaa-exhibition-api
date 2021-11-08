import { UserModel } from '../models';

const UserController = {

  retrieveUser(user_id: number) {
    return new Promise<UserModel>((resolve, reject) => {
      UserModel.findOne({
        where: {
          user_id,
        },
      })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUserHasVoted(user_id: number) {
    return new Promise<UserModel>((resolve, reject) => {
      UserModel.update({
        hasVoted: true,
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
    });
  },
};

export default UserController;
