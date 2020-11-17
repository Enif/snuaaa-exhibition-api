import { UserModel } from '../models'
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

const AuthController = {

    authGoogle: function (authInfo) {

        return new Promise<UserModel>((resolve, reject) => {

            // I dont' know hot to prevent encoding "%" character at authInfo.code
            // const params = new URLSearchParams();
            // params.append("code", authInfo.code)
            // params.append("client_id", process.env.GOOGLE_OAUTH_CLIENT_ID)
            // params.append("client_secret", process.env.GOOGLE_OAUTH_CLIENT_SECRET)
            // params.append("redirect_uri", authInfo.redirect_uri)
            // params.append("grant_type", "authorization_code")

            // const data = {
            //     code: authInfo.code,
            //     client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
            //     client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            //     redirect_uri: authInfo.redirect_uri,
            //     grant_type: "authorization_code"
            // }

            let url = '?'
            url += `code=${authInfo.code}`;
            url += `&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`;
            url += `&client_secret=${process.env.GOOGLE_OAUTH_CLIENT_SECRET}`;
            url += `&redirect_uri=${encodeURI(authInfo.redirect_uri)}`
            url += `&grant_type=authorization_code`;

            axios.post(`https://oauth2.googleapis.com/token${url}`, {}, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
            })
                .then((response) => {
                    // it is safe without verify if you trust google
                    
                    const decodedToken = jwt.decode(response.data.id_token, {
                        json: false
                    }) as {email: string}
                    return UserModel.findOrCreate({
                        where: {
                            email: decodedToken.email
                        }
                    })                
                })
                .then(([user]) => {
                    UserModel.update({
                        login_at: new Date()
                    }, {
                        where: {
                            user_id: user.get('user_id')
                        }
                    })
                    resolve(user)
                })
                .catch((err) => {
                    reject(err)
                })

        })
    }

}

export default AuthController;
