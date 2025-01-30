import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        }
    ],
    isAdmin :Boolean,
    contact:{
        type: Number,
        
    },
    picture:{
        type:String
    }


},{timestamps:true})

export const User = mongoose.model("User",userSchema)