const router = require('express').Router();
const validationSchema = require('../src/middleware/schemaValidation');
const userSchema = require('../src/schemas/createUserSchema.json');
const userController = require('../src/controllers/UserController');
const AuthController = require('../src/controllers/AuthController');
const authSchema = require('../src/schemas/authUserSchema.json');
const AuthMiddleware = require('../src/middleware/AuthMiddleware');



router.post('/users/register', validationSchema(userSchema), userController.create);

router.post('/login', validationSchema(authSchema), AuthController.authenticate);

router.use(AuthMiddleware); // dessa linha para baixo as rotas precisam de token jwt



module.exports = router;