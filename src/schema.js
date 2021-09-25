const {gql}=require('apollo-server-express');
// 使用GraphQL模式语言编制一个模式
module.exports=gql`
  scalar DateTime

  type Note{
    id:ID!
    content:String!
    author:User!
    createdAt:DateTime!
    updatedAt:DateTime!
  }

  type User{
      id:ID!
      username:String!
      email:String!
      avatar:String
      notes:[Note!]
  }

  type Query{
      notes:[Note!]!
      note(id:ID!):Note!
  }

  type Mutation{
      signUp(username:String!,email:String!,password:String!):String!
      signIn(username:String,email:String,password:String!):String!
      newNote(content:String!):Note!
      updateNote(id:ID!,content:String!):Note!
      deleteNote(id:ID!):Boolean!
  }
`