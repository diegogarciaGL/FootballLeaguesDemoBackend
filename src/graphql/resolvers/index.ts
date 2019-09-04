import { mergeResolvers } from 'merge-graphql-schemas';
import { leaguesResolvers } from './Leagues';
import { teamsResolvers } from './Teams';
import { playersResolvers } from './Players';

const resolvers = [
  leaguesResolvers,
  teamsResolvers,
  playersResolvers
];

export default mergeResolvers<any>(resolvers);