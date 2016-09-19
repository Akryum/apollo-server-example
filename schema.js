import Tags from './connectors';

export const typeDefs = [`
  type Tag {
    id: Int
    label: String
  }

  type Query {
    tags: [Tag]
  }

  type Mutation {
    addTag(label: String!): Tag
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export const resolvers = {
  Query: {
    tags(root, args, context) {
      return Tags.getTags();
    }
  },
  Mutation: {
    addTag(root, { label }, context) {
      console.log(`adding tag '${label}'`);
      return Tags.addTag(label);
    }
  }
};
