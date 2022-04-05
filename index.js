import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from "url";

// import bcrypt from 'bcrypt'

import authRoute from './routes/authRoute.js'
import usersRoute from './routes/usersRoute.js'
import postsRoute from './routes/postsRoute.js'
import categoriesRoute from './routes/categoriesRoute.js'
import multerRoute from './routes/multerRoute.js'

const app = express();
const port = 5000;

const start = async () => {
    dotenv.config()
    mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }).then(console.log('Connected Well')).catch(error => console.log(error));
}

start()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// const __dirname = path.resolve()
// const __dirname = path.dirname(import.meta.url).replace(/^file:\/\/\//, '')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/submittedimages', express.static(path.join(__dirname, '/submittedimages')))

app.use(express.json())
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/upload', multerRoute);

app.get('/',(req,res) => {
    res.send('This is the Backend Part')
})

app.listen(port, ()=> {
    console.log(`App is running on port: ${port}`)
})
