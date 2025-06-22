import 'dotenv/config'
import express from 'express'
import connectMongo from './utils/connectMongo.js';
import logger from './utils/logger.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
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
