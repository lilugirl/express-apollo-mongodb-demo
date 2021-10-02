require('dotenv').config();
const express=require('express');
const {ApolloServer}=require('apollo-server-express');
const jwt=require('jsonwebtoken');
const helmet=require('helmet');
const cros=require('cors');

// 导入本地模块
const db=require('./db')
const models=require('./models')
const typeDefs=require('./schema')
const resolvers=require('./resolvers')


// 在.env文件指定的端口或4001端口上运行服务器
const port=process.env.PORT || 4000

// 把DB_HOST值存入一个变量
const DB_HOST=process.env.DB_HOST;

const app=express();
app.use(helmet());
app.use(cros());

//连接数据库
db.connect(DB_HOST);

const getUser=token=>{
    if(token){
        try{
           // 返回通过令牌获取的用户信息
           return jwt.verify(token,process.env.JWT_SECRET)
        }catch(err){
            // 如果令牌有问题 抛出错误
            throw new Error('Session invalid');
        }
    }
};



// 设置Apollo Server
const server=new ApolloServer({
    typeDefs,resolvers,
    context:({req})=>{
        // 从首部获取令牌
        const token=req.headers.authorization;
        // 尝试使用令牌检索用户
        const user=getUser(token);
        // 暂且把用户输出到控制台中
        console.log('user',user);
       
        // 把数据库模型和用户添加到上下文中
        return {models,user};
    }
})

// 应用 Apollo GraphQL中间件 把路径设为 /api
server.applyMiddleware({app,path:'/api'})

app.get('/',(req,res)=>{
    return res.send('Hello World!!!')
})

console.log('port',port)

app.listen(port,()=>console.log('listening on port '+port))