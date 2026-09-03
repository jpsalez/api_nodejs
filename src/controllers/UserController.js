const UserModel = require('../models/userModel');
const { Op } = require('sequelize');


class UserController {

    async create(req, res) {

        try {
            const { email, user_name } = req.body;


            const userExist = await UserModel.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { user_name }
                    ]
                }
            });

            if (userExist) return res.status(400).json({ message: "Email or username already registered" });

            const user = await UserModel.create(req.body);

            if (!user) return res.status(400).json({ error: 'error creating user' });

            res.status(201).json({ message: 'user created!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }




}

module.exports = new UserController();