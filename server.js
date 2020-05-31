const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const cors = require('cors')

const { schema } = require('./schema/schema')
const { root } = require('./query/query')

const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}))

app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); next(); 
});

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.static(path.join(__dirname, 'admin/build')))

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/build/index.html'))
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(port, () => console.log(`Server started on port ${port}`));