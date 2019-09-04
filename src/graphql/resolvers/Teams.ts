import { Resolvers, League, Player } from '../generated/resolvers-types';
import { getLeague } from '../../services/Leagues';
import { getPlayers } from '../../services/Players';

const teamsResolvers: Resolvers = {
  Team: {
    league: async (root): Promise<League> => {
      const { leagueId } = root;
      return (await getLeague(leagueId) as League);

    },
    players: async (root): Promise<Player[]> => {
      const { _id: teamId } = root;
      return await getPlayers(teamId);
    }
  }
};

export {
  teamsResolvers
};

