import { mergeTypes } from 'merge-graphql-schemas';
import League from './League';
import Team from './Team';
import Player from './Player';
import Languages from './Languages';

const typeDefs = [
  Languages,
  League,
  Team,
  Player
];

export default mergeTypes(typeDefs, { all: true });