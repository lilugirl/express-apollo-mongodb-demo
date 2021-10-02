const Query=require('./query');
const Mutation=require('./mutation');
const Note = require('./note');
const User = require('./user');
const {GraphQLDateTime}=require('graphql-iso-date');

// 为模式字段提供解析函数
module.exports={
    Query,
    Mutation,
    Note,
    User,
    DateTime:GraphQLDateTime
};