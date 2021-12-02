import { GuestBookModel, UserModel } from '../models';

const GuestbookController = {
  createGuestBook(author_id: number, text: string) {
    return new Promise((resolve, reject) => {
      GuestBookModel.create({
        author_id,
        text,
      })
        .then(() => resolve({}))
        .catch((err) => {
          reject(err);
        });
    });
  },

  retrieveGuestBooks() {
    return new Promise((resolve, reject) => {
      GuestBookModel.findAll(
        {
          include: [{
            attributes: ['user_id', 'nickname'],
            model: UserModel,
            as: 'author',
            required: true,
          }],
          order: [['created_at', 'DESC']],
          limit: 20,
        },
      )
        .then((guestBooks) => {
          resolve(guestBooks);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default GuestbookController;
