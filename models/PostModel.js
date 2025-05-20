import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        // unique:true
    },
    photo:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    categories:{
        type:Array
    },
},
{timestamps:true},
)

export default mongoose.model('PostModel', PostSchema)
