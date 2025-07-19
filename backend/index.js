import 'dotenv/config'
import express from 'express'
import connectMongo from './utils/connectMongo.js';
import logger from './utils/logger.js';
import userModel from './Schemas/userSchema.js';
import {signupValidator, loginValidator} from './SchemaValidator/User.js';
import bcrypt from 'bcryptjs'
import errorHandler from './utils/errorHandler.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(cookieParser());
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
    const {error, value} = signupValidator.validate(req.body);
    if(error) throw new Error("Enter your credentials correctly!");
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new userModel({ username, email, password : hash });
    await newUser.save();
    
    const id = newUser._id;
    const user = {id, email : newUser.email, username: newUser.username};
    const token = jwt.sign(user, process.env.JWT_KEY, {
        algorithm: 'HS512',
        expiresIn: '5d'
    })
    res.cookie('user', token, {
        httpOnly : true,
        expires : new Date(Date.now() + (7*24*60*60*1000)),
        sameSite : 'Lax',
        secure : process.env.NODE_ENV === "production"
    });
    return res.json({ user, message : "User registered"});
}))


app.post('/login', errorHandler(async(req, res) =>{
    const {email, password} = req.body;
    const {error, value} = loginValidator.validate(req.body);
    if(error) throw new Error("Credentials wrong");
    const existingUser = await userModel.findOne({email});
    if(!existingUser) throw new Error("No user found");    
    const confirm = await bcrypt.compare(password, existingUser.password);
    if(!confirm) throw new Error("Password is Wrong!");
    const user = {id : existingUser._id, email : existingUser.email, username: existingUser.username}
    const token = jwt.sign(user, process.env.JWT_KEY, {
        algorithm: 'HS512',
        expiresIn: '5d'
    })
    res.cookie('user',  token, {
        httpOnly : true,
        expires : new Date(Date.now() + (7*24*60*60*1000)),
        sameSite : 'Lax',
        secure : process.env.NODE_ENV === "production"
    });
    return res.json({user, message: "User logged in"});
}))

app.get('/user', errorHandler((req, res) => {
    const token = req.cookies.user;
    if(!token) return res.json({user : null});

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded){
        if(err) throw new Error("No user found");
        return res.json({user: decoded});
    });
}))

app.post('/logout', errorHandler((req, res) => {
    const token = req.cookies.user;
    if(!token) throw new Error('Invalid Session');
    const check = jwt.verify(token, process.env.JWT_KEY);
    if(!check) throw new Error('Not a valid user!');
    res.clearCookie('user');
    return res.json({message : "Logged out successfully!"});
}));