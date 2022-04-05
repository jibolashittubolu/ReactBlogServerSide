import express from 'express'
import PostModel from '../models/PostModel.js'
import UserModel from '../models/UserModel.js'

const router = express.Router()

//CREATE POST
router.post('/create', async(req, res) => {
    const newPost = await new PostModel(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(error){
        res.status(500).json(error)
    }
})

//UPDATE POST
router.put('/post/update/:id', async(req, res) => {
    try{
        const post = await PostModel.findById(req.params.id)
        if (post.username === req.body.username){
            try{
                const updatedPost = await PostModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body
                    },
                    { new:true }
                )
                res.status(200).json(updatedPost)
            }
            catch (error){
                res.status(500).json(error)
            }
        }
        else{
            res.status(401).json("You can update only your post")
        }
    }
    catch (error){
        res.status(500).json(error)
    }
})

//DELETE POST
router.delete('/delete/:id', async(req, res) => {
    try{
        const post = await PostModel.findById(req.params.id)
        if (post.username === req.body.username){
            try{
                await post.delete()
                res.status(200).json("Post has been deleted")
            }
            catch(error){
                res.status(500).json(error)
            }
        }
        else{
            res.status(401).json("You can delete only your post")
        }
    }
    catch(error){
        res.status(500).json(error)
    }
})

//GET POST
router.get('/post/:id', async(req, res) => {
    try{
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json(error);
    }
})

// var a = ['hello', 'you', 'are']

// for (let i=0; i<a.length; i++){
//     if(a[i] === 'are'){
//       console.log('index: ' + i)
//     }
// }

// GET USER-SPECIFIC POSTS
router.get('/', async(req, res) => {
    const user_name = req.query.user;
    const category_name = req.query.category;
    try{
        //the conditionals here are not totally optimized
        let posts;
        // if(user_name){
        //     posts = await PostModel.find({username:user_name})
        // }
        // Please note the use of conditionals and the use of double filters here
        //we ensure the user_name is first checked and if a result is derived, we proceed to filter based on categories.
        if(user_name || category_name){
            if(user_name && category_name){
                posts = await PostModel.find({username:user_name})
                posts = posts.length > 1 ? 
                        posts.filter(
                            (individualPost) => individualPost.categories.filter(
                                (individualCategory) => individualCategory === category_name
                            )
                        )
                        : posts
                // posts = await PostModel.find({categories:{
                //     $in:[category_name],
                // }})
                // posts = posts.length > 1 ? posts.filter(
                //     (individualPosts) => individualPosts.username === user_name
                //   ) : posts
            }
            else if(user_name){
                posts = await PostModel.find({username:user_name})
            }
            else if(category_name){
                posts = await PostModel.find({categories:{
                    $in:[category_name],
                }})
            }
        }
        // else if(category_name){
        //     posts = await PostModel.find({categories:{
        //         $in:[category_name],
        //     }})
        // }
        else{
            posts = await PostModel.find({});  
        }
        res.status(200).json(posts)   
    }
    catch(error){
        res.status(500).json(error)
    }
})

//FIND ALL POSTS
//no longer in production use but still in Postman
router.get('/findall', async(req,res)=>{
    try{
        const allPosts = await PostModel.find({})
        res.status(200).json(allPosts)
    }
    catch(error){
        res.status(500).json(error)
    }
})


export default router