import 'dotenv/config'
import express from 'express'
import connectMongo from './utils/connectMongo.js';
import logger from './utils/logger.js';
import userModel from './Schemas/userSchema.js';
import {signupValidator, loginValidator} from './SchemaValidator/User.js';
import bcrypt from 'bcryptjs'
import errorHandler from './utils/errorHandler.js'
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended : true }));

app.listen(port, ()=>{
    logger.success(`Server is listening to port ${port} successfully !`);
})

connectMongo()
.then(() => {
    logger.success(`MongoDB connected successfully!`);
})
.catch((e) => {
    logger.fatal(`Error in connecting DB - ${e}`);
})


app.post('/signup', errorHandler(async(req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    const {error, value} = signupValidator.validate(req.body);
    if(error) throw new Error("Enter your credentials correctly!");
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    await userModel.insertOne({ username, email, password : hash });
    return res.json({message : "User registered"});
}))


app.post('/login', errorHandler(async(req, res) =>{
    const {email, password} = req.body;
    const {error, value} = loginValidator.validate(req.body);
    if(error) throw new Error("Credentials wrong");
    const user = await userModel.findOne({email});
    if(!user) throw new Error("No user found");
    const confirm = await bcrypt.compare(password, user.password);
    if(!confirm) throw new Error("Password is Wrong!")
    return res.json({message: "User logged in"});
}))