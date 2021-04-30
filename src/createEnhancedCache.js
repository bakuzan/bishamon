import { InMemoryCache } from 'apollo-cache-inmemory';

function readQuerySafe(options) {
  try {
    return this.readQuery(options);
  } catch (e) {
    return null;
  }
}

function deleteQuery(name) {
  const names = name instanceof Array ? name : [name];
  let rootQuery = { ...this.data.data.ROOT_QUERY };

  Object.keys(rootQuery)
    .filter((query) => names.some((name) => query.indexOf(name) === 0))
    .forEach((query) => {
      delete this.data.data.ROOT_QUERY[query];
    });
}

export default () => {
  InMemoryCache.prototype.readQuerySafeBIS = readQuerySafe;
  InMemoryCache.prototype.deleteQueryBIS = deleteQuery;

  return new InMemoryCache({
    cacheRedirects: {
      Query: {
        workItem: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'WorkItem', id: args.id })
      }
    }
  });
};
