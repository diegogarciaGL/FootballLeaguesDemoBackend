import { Resolvers, League, Player, Team } from '../generated/resolvers-types';
import { getLeague } from '../../services/Leagues';
import { getTeams, getTeam } from '../../services/Teams';
import { getPlayers } from '../../services/Players';

const teamsResolvers: Resolvers = {
  Query: {
    teams: async (root, { leagueId }): Promise<Team[]> => {
      return await getTeams(leagueId);
    },
    team: async (root, { teamId }): Promise<Team | null> => {
      return await getTeam(teamId);
    }
  },
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

