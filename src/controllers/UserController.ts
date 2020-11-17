import { UserModel } from '../models'

const UserController = {
    updateUser: function (user_id, data) {
        return new Promise((resolve, reject) => {
            UserModel.update({
                nickname: data.nickname
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
    }
}

export default UserController;
