const router = require('express').Router();
const userModel = require('./apps/models/Users');
const userController = require('./apps/controllers/userController');
const authController = require('./apps/controllers/authController');
const UserSchema = require('./schemas/create.user.schema.json');

const validatorSchema = require('./apps/middlewares/validation');


router.get('/health', (req,res) => {
    return res.send('connection on');
} );

router.post('/user', validatorSchema(UserSchema),userController.create);

router.post('/auth', await authController.authenticate);

module.exports = router;