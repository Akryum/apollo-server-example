import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, resolvers } from './schema';

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3000;

var app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), apolloExpress({ schema: jsSchema }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT);

console.log(`Listening on port ${PORT}`);
