import { Resolvers, League, Team } from '../generated/resolvers-types';
import { getLeagues, getLeague } from '../../services/Leagues';
import { getTeams } from '../../services/Teams';

const leaguesResolvers: Resolvers = {
  Query: {
    leagues: async (): Promise<League[]> => {
      return await getLeagues();
    },
    league: async (root, { leagueId }): Promise<League | null> => {
      return await getLeague(leagueId);
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

