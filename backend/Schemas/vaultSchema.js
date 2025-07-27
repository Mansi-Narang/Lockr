import { model, Schema } from "mongoose";
import userModel from "./userSchema.js";

const vaultSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : userModel,
        required : true
    },
    domainName : {
        type : String, 
        required : true
    },
    domainUsername : {
        type : String, 
        required : true
    },
    encryptedPassword : {
        type : String,
        required : true
    },
    lastUse : {
        type : {
            time : String,
            ipAddres : String
        }
    },
}, {timestamps : true})

const Vault = new model('Vault', vaultSchema);

export default Vault;