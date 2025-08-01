import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
},{
    timestamps : true
})

const userModel = new model("User", userSchema);
export default userModel;