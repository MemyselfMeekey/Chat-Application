import Joi from"joi"

export const RegisterSchema=Joi.object({
    username:Joi.string().min(2).max(50).required(),
    password:Joi.string().min(8).required(),
    confirmpassword:Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' })
})
export const LoginSchema=Joi.object({
    username:Joi.string().min(2).max(50).required(),
    password:Joi.string().min(8).required(),
})


