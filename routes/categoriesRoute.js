import express from 'express';
import CategoryModel from '../models/CategoryModel.js'

const router = express.Router() 
// router.post('/addcategory', (req, res) => {
//     const newCategory = await new CategoryModel(req.body)
//     try{
//         const savedCategory = await newCategory.save();
//         res.status(200).json(savedCategory)
//     }
//     catch(error){
//         res.status(500).json(error)
//     }
// })

//CREATE POST
router.post('/addcategory', async(req, res) => {
    // res.send("Hello asdfdass")
    const newCategory = new CategoryModel(req.body)
    try{
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get('/findall', async(req, res) => {
    // res.send("Hello asdfdass")
    // const newCategory = new CategoryModel(req.body)
    try{
        const allCategories = await CategoryModel.find({})
        res.status(200).json(allCategories)
    }
    catch(error){
        res.status(500).json(error)
    }
})



export default router;
