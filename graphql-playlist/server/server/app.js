const express = require('express');
const {graphqlHTTP} = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//allow cors
app.use(cors());

mongoose.connect('mongodb+srv://graphql-playlist:graphql@cluster0.rach6.mongodb.net/graphql-ninja?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('connected');
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});