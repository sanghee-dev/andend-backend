import {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
  makeExecutableSchema,
} from "graphql-tools";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
