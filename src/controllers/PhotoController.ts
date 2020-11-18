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
    },

    increaseVoteNum: function (photo_id: number) {
        return new Promise((resolve, reject) => {
            PhotoModel.increment('voted_num', {
                where: { photo_id: photo_id }
            })
                .then(() => {
                    resolve({ code: 200 })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

export default PhotoController;
