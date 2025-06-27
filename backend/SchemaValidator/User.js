import Joi from 'joi';

const signupValidator = Joi.object({
    username : Joi.string().required().min(3).max(25),
    email : Joi.string(),
    password : Joi.string().required(),
    confirmPassword : Joi.string().required().valid(Joi.ref("password"))
})

const loginValidator = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required(),
    rememberMe : Joi.boolean()
})
export  {signupValidator, loginValidator};