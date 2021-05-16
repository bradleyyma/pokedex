import config from '../config/auth.config.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// TODO: encrypt passwords
export const signup = (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    }, (err, user) => {
        if(err){
            res.status(500).send({message: err})
            return;
        }
        else{
            res.status(201).send(user)
        }

    })
}

export const signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if(err){
                res.status(500).send({message: err});
                return;
            }
            if(!user){
                return res.status(404).send({ message: "User Not Found"});
            }

            var passwordIsValid = req.body.password === user.password;
            if(!passwordIsValid){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                })
            }

            var token = jwt.sign({ id: user._id}, config.secret, {
                expiresIn: 86400
            })

            res.status(200).send({
                id: user._id,
                username: user.username,
                accessToken: token
            })
        })

}