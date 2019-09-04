import { mergeTypes } from 'merge-graphql-schemas';
import League from './League';
import Team from './Team';
import Player from './Player';

const typeDefs = [
  League,
  Team,
  Player
];

export default mergeTypes(typeDefs, { all: true });