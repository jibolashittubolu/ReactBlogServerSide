import express from 'express'
import UserModel from "../models/UserModel.js";
import PostModel from "../models/PostModel.js";
import bcrypt from 'bcrypt'

const router = express.Router()


//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userID === req.params.id){
        //we could further modify this route to ensure that the user re-enters the password.
        //in other words we could encapsulate the try into the if block
        if (req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword;
        }
        try{
            const updatedUser = await UserModel.findByIdAndUpdate(
                req.params.id, 
                {
                    $set:req.body,
                },
             {new:true}
             )
            res.status(200).json(updatedUser); 
        }
        catch(error) {
            res.status(500).json(error)
        }
    } 
    else {
        res.status(401).json("You can update only your account")
    }

})

//DELETE
router.delete('/:id', async (req, res) => {
    //to make the delete endpoint robust, we can create a condition that checks and verifies the password before deletion would be effected.
    if (req.body.userID === req.params.id){
        try{
            const user = await UserModel.findById(
                req.params.id
            )
            try{
                await PostModel.deleteMany(
                    {
                        username: user.username
                    }
                )
                await UserModel.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted"); 
            }
            catch(error) {
                res.status(500).json(error)
            }
        }
        catch (error){
            res.status(404).json('User not found')
        }
    } 
    else {
        res.status(401).json("You can delete only your account")
    }

})

//GET USER
router.get('/:id', async(req, res) => {
    try{
        const user = await UserModel.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch (error){
        res.status(500).json(error);
    }
})

// FIND ALL
router.get('/', async (req, res) => {
    //to make the delete endpoint robust, we can create a condition that checks and verifies the password before deletion would be effected.
    // res.send('Hello')
    try{
        const all_users =  await UserModel.find({});
        // console.log(all_users)
        res.status(200).json(all_users);
    }
    catch (error) {
        res.status(500).json(error);
    }

});


export default router;
