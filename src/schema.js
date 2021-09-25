const {gql}=require('apollo-server-express');
// 使用GraphQL模式语言编制一个模式
module.exports=gql`
  type Note{
    id:ID!
    content:String!
    author:String!
  }

  type Query{
      notes:[Note!]!
      note(id:ID!):Note!
  }

  type Mutation{
      newNote(content:String!):Note!
      updateNote(id:ID!,content:String!):Note!
      deleteNote(id:ID!):Boolean!
  }
`