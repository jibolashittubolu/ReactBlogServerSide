import express from 'express'
import bcrypt from 'bcrypt'

import UserModel from '../models/UserModel.js'

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello This is')
})

//REGISTER
router.post('/register', async (req, res) =>{
    
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, 
        })

        const user = await newUser.save()
        res.status(200).json(user)
        console.log(user)
    } 
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

})

//LOGIN
router.post('/login', async (req,res) => {

    try{
        const user = await UserModel.findOne(
            {username: req.body.username})
        !user && res.status(400).json('Wrong Credentials')
        
        //below, we compare the user's password in the db with the password the user provides at the front end.
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json('Wrong Credentials')
        //Note the use of && in the above to manipulate a favourable execution without a need of too much conditionals
        const {password, ...other_details} = user._doc
        //The above spreads and removes the password from the object sent to the user 
        //Note that ._doc contains the required model object. We can try logging user to the console to see all objects associated with it i.e if in doubt

        res.status(200).json(other_details)
    }
    catch(error){
        res.status(500).json(error)
    }

})

export default router;