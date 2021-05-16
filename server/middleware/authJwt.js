import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'
import User from '../models/User.js'

export const verifyToken = (req, res, next) => {
    // if(!req){
    //     if(!res){next()}
    //     return res.status(403).send({message: "No toekn provided!"})
    // }
    let token = req.headers["x-access-token"]

    if (token){
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.status(401).send( { message: "Unauthorized!" })
            }
    
            req.userId = decoded.id;
            next()
        })
    } else{
        res.sendStatus(401);
    }
    
}