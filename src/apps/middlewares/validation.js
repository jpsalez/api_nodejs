const {Validator, SchemaError} = require('jsonschema');

const v = new Validator();

const validationSchema = (schema) => (req,res,next) => {
    
      const result = v.validate(req.body, schema);

     if(!result.valid){
           const errors = [];

        for (const item of result.errors) {
            errors.push(item.message);
        }

      return res.status(401).send({SchemaError : errors});
     }
  
    
    return next();
}

module.exports = validationSchema;