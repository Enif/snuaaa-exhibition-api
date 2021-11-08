import { UserModel } from '../models'

const UserController = {

    retrieveUser: function (user_id: number) {
        return new Promise<UserModel>((resolve, reject) => {
            UserModel.findOne({
                where: {
                    user_id: user_id
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    updateUserNickname: function (user_id: number, nickname: string) {
        return new Promise((resolve, reject) => {
            UserModel.update({
                nickname: nickname
            }, {
                where: {
                    user_id: user_id
                },
                returning: true
            })
                .then(([number, user]) => {
                    resolve(user[0])
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    updateUserHasVoted: function (user_id: number) {
        return new Promise((resolve, reject) => {
            UserModel.update({
                hasVoted: true
            }, {
                where: {
                    user_id: user_id
                }
            })
                .then(() => {
                    resolve({})
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

}

export default UserController;
