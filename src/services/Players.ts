import { Document } from 'mongoose';
import PlayerModel from '../models/Player';
import { Player, PlayerInput } from '../graphql/generated/resolvers-types';

const parsePlayer = (data: Document): Player => {
  const player: Player = {
    _id: data._id,
    name: data.get('name'),
    shirtNumber: data.get('shirtNumber'),
    nationality: data.get('nationality'),
    position: data.get('position'),
    teamId: data.get('teamId')
  };
  return player;
}

const getPlayers = async (teamId: string): Promise<Player[]> => {
  return (await PlayerModel.find({ teamId })).map(parsePlayer);
}

const newPlayer = async (input: PlayerInput): Promise<Player> => {
  return parsePlayer(await PlayerModel.create(input));
}

export {
  getPlayers,
  newPlayer
};