const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


class AuthController {
    async authenticate(req, res) {

        const { user_name, email, password } = req.body;

        const user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { user_name },
                    { email }
                ]
            }
        });

        if (!user) return res.status(401).json({ error: 'check your email or password' });

        if (!( await user.checkPassword(password))) return res.status(401).json({ error: 'check your email or password' });


        const { id, user_name : userName } = user;

        const token = jwt.sign({ id }, process.env.TOKEN, {
            expiresIn: '1h'
        });


        return res.status(200).json({ user : { id , user_name : userName} , token });
    }
}

module.exports = new AuthController();