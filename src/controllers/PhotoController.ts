import { PhotoModel } from '../models';

const PhotoController = {
  retrievePhotos() {
    return new Promise((resolve, reject) => {
      PhotoModel.findAll({
        attributes: { exclude: ['voted_num'] },
        order: [['photo_id', 'ASC']],
      })
        .then((photos) => {
          resolve(photos);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default PhotoController;
