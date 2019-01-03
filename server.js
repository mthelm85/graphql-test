'use strict'
const { ApolloServer, gql } = require('apollo-server-express'),
      express = require('express'),
      mongoClient = require('mongodb').MongoClient,
      morgan = require('morgan'),
      url = process.env.MONGODB_URI || 'mongodb://localhost:27017/whd-api'

const app = express()
app.use(morgan('dev'))

mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  const db = client.db('whd-api'),
        { typeDefs } = require('./schemas.js')(gql),
        { resolvers } = require('./resolvers.js')(db),
        server = new ApolloServer({ typeDefs, resolvers })
  server.applyMiddleware({
    app,
    path: '/case'
  })
  app.listen(3000, () => {
    console.log(`Server ready at localhost:3000${server.graphqlPath}`)
  })
})
