import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    tagAdded: (options, args) => ({
      tagAdded: {
        filter: tag => tag.type === args.type,
      },
    }),
  },
});

export { subscriptionManager, pubsub };
