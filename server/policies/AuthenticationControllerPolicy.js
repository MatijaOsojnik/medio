const Joi = require('@hapi/joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            roles: Joi.array().max(1),
            display_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'string.base': 'Display name should be a type of text',
                    'string.empty': `Please enter a name`,
                    'string.min': `Display name must be longer than 3 characters`,
                    'string.max': `Display name must be shorter than 30 characters`,
                    'any.required': `Display name is a required field`
                }),
            email: Joi.string()
                .email()
                .messages({
                    'string.empty': `Please enter an e-mail`,
                    'string.email': `E-mail entered is not valid`,
                    'any.only': `E-mail entered is not valid`
                }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,}$'))
                .messages({
                    'string.empty': `Please enter a password`,
                    'string.pattern.base': `Password must be longer than 8 characters`,
                    'any.base': `Password must be longer than 8 characters`,
                    'any.only': `Password must be longer than 8 characters`,
                }),
            repeat_password: Joi.any()
                .valid(Joi.ref('password'))
                .messages({
                    'any.only': `Passwords don't match`
                })
        })

        const {
            error
        } = schema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            const errors = [];

            error.details.map((err) => {
                errors.push(err.message)
            })
            res.status(400).send(errors)
        } else {
            next();
        }
    }
}