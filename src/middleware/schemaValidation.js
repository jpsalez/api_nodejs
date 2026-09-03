const {Validator} = require('jsonschema');
const validator = new Validator();

const validationSchema = (schema) => (req,res,next) => {

        const result = validator.validate(req.body,schema);
      
        if(!result.valid){
            const erros = [];
            
            for (const e of result.errors) {
                erros.push(e.message);
            }

            return res.status(400).json({erros : erros});
        }

       return next();
};

module.exports = validationSchema;