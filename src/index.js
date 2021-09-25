require('dotenv').config();
const express=require('express');
const {ApolloServer}=require('apollo-server-express');

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

//连接数据库
db.connect(DB_HOST);


// 设置Apollo Server
const server=new ApolloServer({
    typeDefs,resolvers,
    context:()=>{
        // 把数据库模型添加到上下文中
        return {models};
    }
})

// 应用 Apollo GraphQL中间件 把路径设为 /api
server.applyMiddleware({app,path:'/api'})

app.get('/',(req,res)=>{
    return res.send('Hello World!!!')
})

console.log('port',port)

app.listen(port,()=>console.log('listening on port '+port))