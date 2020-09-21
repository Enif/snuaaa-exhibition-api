import { PhotoModel } from '../models'

const PhotoController = {
    retrievePhotos: function () {
        return new Promise((resolve, reject) => {
            PhotoModel.findAll()
                .then((photos) => {
                    resolve(photos)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

export default PhotoController;
