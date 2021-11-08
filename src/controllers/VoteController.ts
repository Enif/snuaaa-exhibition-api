import VoteModel from '../models/VoteModel';

const VoteController = {
  create(photo_id: number, isMember: boolean) {
    return new Promise((resolve, reject) => {
      VoteModel.create({
        photo_id,
        isMember,
      })
        .then(() => {
          resolve({ code: 200 });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default VoteController;
