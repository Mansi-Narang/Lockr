import validator from '../SchemaValidator/Vault.js';

function vaultValidator(req, res, next){
    const {error, value} = validator.validate(req.body);
    if(error) {
        console.log(error);
        return res.json({error : 'Enter your vault information properly!'});
    }
    next();
}

export default vaultValidator;