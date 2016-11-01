import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';

const setupFunctions = {
  tagAdded: (options, { type }) => ({
    tagAdded: tag => tag.type === type,
  }),
};

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions,
});

export { subscriptionManager, pubsub };
