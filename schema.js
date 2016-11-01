import Tags from './connectors';

export const typeDefs = [`
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

  schema {
    query: Query
    mutation: Mutation
  }
`];

export const resolvers = {
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
      return Tags.addTag(type, label);
    },
  },
};
