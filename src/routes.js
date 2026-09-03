const router = require('express').Router();
const validationSchema = require('../src/middleware/schemaValidation');
const userSchema = require('../src/schemas/createUserSchema.json');
const userController = require('../src/controllers/UserController');


router.post('/users/register', validationSchema(userSchema), userController.create);

router.get('/users', userController.getAll);



module.exports = router;