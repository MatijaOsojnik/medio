const Joi = require('@hapi/joi');

module.exports = {
    update(req, res, next) {
        const schema = Joi.object({
            display_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .messages({
                    'string.alphanum': 'Display name should only contain alpha-numeric characters',
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
                    'string.pattern.base': `Password must be longer than 8 characters`,
                    'any.base': `Password must be longer than 8 characters`,
                    'any.only': `Password must be longer than 8 characters`,
                    'string.empty': `Please enter a new password`
                }),
            repeat_password: Joi.any()
                .valid(Joi.ref('password'))
                .messages({
                    'any.only': `Passwords don't match`
                }),
            birth_date: Joi.date()
                .allow('', null)
                .iso()
                .min('1-1-1920')
                .messages({
                    'date.base': `Please enter a valid date`,
                    'date.format': `The date you entered was in invalid format`,
                    'date.min': `You should be born after 1920`
                }),
            phone_num: Joi.string()
                .allow('', null)
                .pattern(new RegExp('^[0-9]{8,}$'))
                .messages({
                    'string.pattern.base': `The phone number you entered is invalid`,
                    'any.base': `The phone number you entered is invalid`,
                    'any.only': `The phone number you entered is invalid`
                }),
            title: Joi.string()
                .allow('', null),
            description: Joi.string()
                .allow('', null)
                .max(300)
                .messages({
                    'string.max': `Description can contain only 300 characters`
                }),
            facebook_url: Joi.string()
                .allow('', null),
            twitter_url: Joi.string()
                .allow('', null),
            instagram_url: Joi.string()
                .allow('', null),
            linkedin_url: Joi.string()
                .allow('', null),
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