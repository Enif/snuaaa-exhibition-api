import { GuestBookModel, UserModel } from '../models';

const GuestBookController = {
    createGuestBook: function (author_id, text) {
        return new Promise((resolve, reject) => {
            GuestBookModel.create({
                author_id: author_id,
                text: text
            })
                .then(() => resolve({}))
                .catch((err) => {
                    reject(err)
                })
        })
    },

    retrieveGuestBooks: function () {
        return new Promise((resolve, reject) => {
            GuestBookModel.findAll(
                {
                    include: [{
                        attributes: ['user_id', 'nickname'],
                        model: UserModel,
                        as: 'author',
                        required: true
                    }],
                    order: [['created_at', 'DESC']],
                    limit: 20
                }
            )
                .then((guestBooks) => {
                    resolve(guestBooks)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

export default GuestBookController;
