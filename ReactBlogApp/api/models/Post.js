const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true,
            unique:true
        },
        desc:{
            type:String,
            required:true,
        },
        postPic:{
            type:String,
            default:""
        },
        username:{
            type:String,
            required:true,
        },
        category:{
            type:Array,
            required:false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post",PostSchema)