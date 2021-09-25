const mongoose=require('mongoose');
const UserSchame=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },email:{
        type:String,
        required:true,
        index:{unique:true}
    },password:{
        type:String,
        required:true
    },avatar:{
        type:String
    }
},{
    // 添加Date类型的createdAt和updateAt
    timestamps:true
});

const User=mongoose.model('User',UserSchame);
module.exports=User