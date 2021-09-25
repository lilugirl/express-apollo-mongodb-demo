require('dotenv').config();
const express=require('express');
const {ApolloServer,gql}=require('apollo-server-express');
const db=require('./db')
const models=require('./models')


// 在.env文件指定的端口或4001端口上运行服务器
const port=process.env.PORT || 4000

// 把DB_HOST值存入一个变量
const DB_HOST=process.env.DB_HOST;

let notes=[{
    id:'1',
    content:'This is a note',
    author:'Adam Scott'
},{
    id:'2',
    content:'This is another note',
    author:'Harlow Everly'
},{
    id:'3',
    content:'Oh hey look, another note!',
    author:'Riley Harrison'
}]

// 使用GraphQL模式语言编制一个模式
const typeDefs=gql`
 type Note{
     id:ID!
     content:String!
     author:String!
 }

 type Query {
     hello: String
     notes:[Note!]!
     note(id: ID!):Note!
 }

 type Mutation{
    newNote(content:String!):Note!
 }
`

// 为模式字段提供解析函数
const resolvers={
  Query:{
      hello:()=>'Hello world!',
      notes:async ()=>{
          return await models.Note.find();
      },
      note:(parent,args)=>{
          return notes.find(note=>note.id===args.id)
      }
  },
  Mutation:{
      newNote:(parent,args)=>{
         let noteValue={
             id:String(notes.length+1),
             content:args.content,
             author:'liuyi'
         }
         notes.push(noteValue);
         return noteValue
      }
  }
};

const app=express();

//连接数据库
db.connect(DB_HOST);


// 设置Apollo Server
const server=new ApolloServer({
    typeDefs,resolvers
})

// 应用 Apollo GraphQL中间件 把路径设为 /api
server.applyMiddleware({app,path:'/api'})

app.get('/',(req,res)=>{
    return res.send('Hello World!!!')
})

console.log('port',port)

app.listen(port,()=>console.log('listening on port '+port))