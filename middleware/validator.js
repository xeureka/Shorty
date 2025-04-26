
const Joi = require('joi');

// Define the schema
const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" should have a minimum length of {#limit}`,
            'string.max': `"name" should have a maximum length of {#limit}`,
            'any.required': `"name" is a required field`
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `"email" must be a valid email`,
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is a required field`
        }),
    
    password: Joi.string()
        .min(8)
        .max(30)
        .required()
        .messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.empty': `"password" cannot be an empty field`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'string.max': `"password" should have a maximum length of {#limit}`,
            'any.required': `"password" is a required field`
        })
});

const validateUser = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    req.validatedBody = value; 
    next();
};

module.exports = validateUser