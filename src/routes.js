const router = require('express').Router();
const validationSchema = require('../src/middleware/schemaValidation');
const userSchema = require('../src/schemas/createUserSchema.json');



router.post('/register', validationSchema(userSchema), (req, res) => {
    return res.status(201).json({ message: "user created" , user: res.body });
});




module.exports = router;