

module.exports={
    notes:async(parent,args,{models})=>{
        return await models.Note.find()
    },
    note:async(parent,args,{models})=>{
       return await models.Noted.findById(args.id)
    },
    user:async(parent,{username},{models})=>{
        // 查找指定用户对应的用户
        return await models.User.findOne({username});
    },
    users:async(parent,args,{models})=>{
        // 查找所有用户
        return await models.User.find({});
    },
    me:async(parent,args,{models,user})=>{
        // 查找上下文中的当前用户
        return await models.User.findById(user.id)
    }
}