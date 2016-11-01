
import { makeExecutableSchema } from 'graphql-tools';

import Tags from './connectors';
import { pubsub } from './subscriptions';

const typeDefs = [`
  type Tag {
    id: Int
    label: String
    type: String
  }

  type Query {
    tags(type: String!): [Tag]
    randomTag: Tag
  }

  type Mutation {
    addTag(type: String!, label: String!): Tag
  }

  type Subscription {
    tagAdded(type: String!): Tag
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`];

const resolvers = {
  Query: {
    tags(root, { type }, context) {
      return Tags.getTags(type);
    },
    randomTag(root, args, context) {
      return Tags.getRandomTag();
    },
  },
  Mutation: {
    addTag(root, { type, label }, context) {
      console.log(`adding ${type} tag '${label}'`);
      const newTag = Tags.addTag(type, label);
      pubsub.publish('tagAdded', newTag);
      return newTag;
    },
  },
  Subscription: {
    tagAdded(tag) {
      return tag;
    },
  },
};

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default jsSchema;
