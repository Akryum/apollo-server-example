
import { makeExecutableSchema } from 'graphql-tools';

import Tags from './connectors';
import { pubsub } from './subscriptions';

const typeDefs = [`
  type Tag {
    id: Int
    label: String
    type: String
  }

  type TagsPage {
    tags: [Tag]
    hasMore: Boolean
  }

  type Query {
    hello: String
    ping(message: String!): String
    tags(type: String!): [Tag]
    tagsPage(page: Int!, size: Int!): TagsPage
    randomTag: Tag
    lastTag: Tag
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
    hello(root, args, context) {
      return "Hello world!";
    },
    ping(root, { message }, context) {
      return `Answering ${message}`;
    },
    tags(root, { type }, context) {
      return Tags.getTags(type);
    },
    tagsPage(root, { page, size }, context) {
      return Tags.getTagsPage(page, size);
    },
    randomTag(root, args, context) {
      return Tags.getRandomTag();
    },
    lastTag(root, args, context) {
      return Tags.getLastTag();
    },
  },
  Mutation: {
    addTag: async (root, { type, label }, context) => {
      console.log(`adding ${type} tag '${label}'`);
      const newTag = await Tags.addTag(type, label);
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
