const { where } = require('sequelize');
const Users = require('../models/Users');


class UserController {



    async create(req, res) {
        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email,
            },
        }
        )

        if (verifyUser) {
            return res.status(401).send({ errorMessage: 'user already exist' });
        }

        const user = await Users.create(req.body);

        if(!user){
           return  res.status(400).json({message : 'error'})
        }

       return  res.status(201).send({ user: user });
    };



}


module.exports = new UserController();