import { Resolvers, Team, Player } from '../generated/resolvers-types';
import { getTeam } from '../../services/Teams';
import { getPlayers, getPlayer } from '../../services/Players';

const playersResolvers: Resolvers = {
  Query: {
    players: async (root, { teamId }): Promise<Player[]> => {
      return await getPlayers(teamId);
    },
    player: async (root, { playerId }): Promise<Player | null> => {
      return await getPlayer(playerId);
    }
  },
  Player: {
    team: async (root): Promise<Team> => {
      const { teamId } = root;
      return (await getTeam(teamId) as Team);
    }
  }
};

export {
  playersResolvers
};

