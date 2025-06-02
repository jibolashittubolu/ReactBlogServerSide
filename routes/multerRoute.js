import express from 'express'
import multer from "multer";


const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "submittedimages")
    },
    filename:(req, file, cb) => {
        cb(null, req.body.name)
    }
})


const upload = multer({storage:storage})

//the "file" in upload.single is the key in the form-data of the postman request
router.post('/',
            upload.single("file"),
            (req,res) => 
            {
                res.status(200).json("File has been sucessfully uploaded")
            }
)



export default router;
