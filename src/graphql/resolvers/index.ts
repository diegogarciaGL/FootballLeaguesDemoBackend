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

export default mergeResolvers<any>(resolvers);