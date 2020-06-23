const admin = require('firebase-admin');
const firebaseApp = admin.initializeApp({
    projectId: 'ADD_PROJECT_ID',
    keyFilename: './config.json',
});


let jwt = async (req, res, next) => {
    const errorResp = {
        data: {},
        meta: {
            message: 'UNAUTHORIZED_REQUEST',
            code: 401
        }
    };
    const uid = req.headers['x-access-uid'];
    const token = req.headers['x-access-token'];
    if (token && uid) {
        const decodedToken = await firebaseApp.auth().verifyIdToken(token);
        try {
            if (decodedToken.uid === uid) {
                next()
            }
        }
        catch (err) {
            return res.status(401).send(errorResp)
        }
    } else {
        return res.status(401).send(errorResp)
    }
}
module.exports = jwt;