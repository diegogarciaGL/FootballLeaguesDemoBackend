import { mergeResolvers } from 'merge-graphql-schemas';
import { languagesResolvers } from './Languages';
import { leaguesResolvers } from './Leagues';
import { teamsResolvers } from './Teams';
import { playersResolvers } from './Players';

const resolvers = [
  languagesResolvers,
  leaguesResolvers,
  teamsResolvers,
  playersResolvers
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default mergeResolvers<any>(resolvers);