const router = require('express').Router();
const userModel = require('./apps/models/Users');
const userController = require('./apps/controllers/userController');

const UserSchema = require('./schemas/create.user.schema.json');

const validatorSchema = require('./apps/middlewares/validation');


router.get('/health', (req,res) => {
    return res.send('connection on');
} );

router.post('/user', validatorSchema(UserSchema),userController.create);

module.exports = router;