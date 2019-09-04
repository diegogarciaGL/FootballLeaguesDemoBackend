import { Resolvers, Team } from '../generated/resolvers-types';
import { getTeam } from '../../services/Teams';

const playersResolvers: Resolvers = {
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

