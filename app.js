const express = require('express');
const graphQLHTTP = require('express-graphql');
const mongoose = require('mongoose');
const Schema = require('./schema/schema');

mongoose.connect("mongodb+srv://Rashmi:<PASSWORD>@cluster0-qv1sb.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true });
mongoose.connection.once('open',()=>{
    console.log('Database is Connected');
})
const app = express();
app.use('/gql-server',graphQLHTTP({
    schema:Schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Express is Connected');
})