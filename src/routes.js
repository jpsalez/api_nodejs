const router = require('express').Router();
const validationSchema = require('../src/middleware/schemaValidation');
const userSchema = require('../src/schemas/createUserSchema.json');
const userController = require('../src/controllers/UserController');
const AuthController = require('../src/controllers/AuthController');
const authSchema = require('../src/schemas/authUserSchema.json');


router.post('/users/register', validationSchema(userSchema), userController.create);

router.post('/login', validationSchema(authSchema), AuthController.authenticate);



module.exports = router;