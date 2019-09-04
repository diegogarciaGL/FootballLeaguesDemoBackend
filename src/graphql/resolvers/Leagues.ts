import { Resolvers, League, Team } from '../generated/resolvers-types';
import { getLeagues } from '../../services/Leagues';
import { getTeams } from '../../services/Teams';

const leaguesResolvers: Resolvers = {
  Query: {
    leagues: async (): Promise<League[]> => {
      return await getLeagues();
    }
  },
  League: {
    teams: async (root): Promise<Team[]> => {
      const { _id: leagueId } = root;
      return await getTeams(leagueId);

    }
  }
};

export {
  leaguesResolvers
};

