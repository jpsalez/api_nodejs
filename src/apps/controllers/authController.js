const jwt = require('jsonwebtoken');
const Users = require('../models/Users');


class authController {

    async authenticate(req, res) {

        const { email, password, user_name } = req.body;

        let whereClause = {}

        if (email) {
            whereClause = { email };
        } else if (user_name) {
            whereClause = { user_name };
        } else {
            return res.status(401).json({ message: 'user not exist' });
        }

        const user = await Users.findOne(
            { where: whereClause }
        );


        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        };


        if (!await user.compareHash(password)) {
            return res.status(401).json({ message: 'password does not match' });
        }

        const {id, user_name : userName} = user;

        const token = jwt.sign({}, process.env.HASH_BCRYPT, {
            expiresIn: '7d',
        });


        return res.status(200).json({user : {id, user_name:userName} , token : token});
    }

}

module.exports = new authController();
