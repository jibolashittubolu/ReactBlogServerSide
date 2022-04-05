import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:''
    },
  },
  {timestamps:true}
)



// export const UserModel = mongoose.model("UserModel", UserSchema)
// an alternative would be to use the below

export default mongoose.model("UserModel", UserSchema)

// Note: if the above is used, there would be no need to cover the UserModel imported - with curly braces
