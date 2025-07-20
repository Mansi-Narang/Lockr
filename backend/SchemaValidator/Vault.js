import Joi from "joi";

const validator = Joi.object({
    userId : Joi.string().required(),
    domainName : Joi.string(). required(),
    domainUsername : Joi.string().required(),
    encryptedPassword : Joi.string().required(),
    lastUse : Joi.object({
        time : Joi.string(),
        ipAddress : Joi.string()
    })
});


export default validator;