import User from '../models/User.js'

export const addFav = (req, res) => {
    let id = req.userId
    let num = req.body.num
    User.findById(id)
        .exec((err, user) =>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(!user){
                return res.status(404).send({ message: "User Not Found"});
            }
            if(!user.favorites.includes(num)){
                user.favorites.push(req.body.num)
            }
            user.save()
            res.status(200).send({
                id: user._id,
                username: user.username,
                favorites: user.favorites
            })
        })
}


export const delFav = (req, res) => {
    let id = req.userId
    let num = req.body.num
    User.findById(id)
        .exec((err, user) =>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(!user){
                return res.status(404).send({ message: "User Not Found"});
            }
            if(user.favorites.includes(num)){
                const index = user.favorites.indexOf(num)
                user.favorites.splice(index, 1)
            }
            user.save()
            res.status(200).send({
                id: user._id,
                username: user.username,
                favorites: user.favorites
            })
        })
}