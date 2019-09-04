import { Document } from 'mongoose';
import TeamModel from '../models/Team';
import { Team, TeamInput } from '../graphql/generated/resolvers-types';

const parseTeam = (data: Document): Team => {
  const team: Team = {
    _id: data._id,
    name: data.get('name'),
    leagueId: data.get('leagueId')
  };
  return team;
}

const getTeams = async (leagueId: string): Promise<Team[]> => {
  return (await TeamModel.find({ leagueId })).map(parseTeam);
}

const getTeam = async (teamId: string): Promise<Team | null> => {
  const team = await TeamModel.findById(teamId);
  return team ? parseTeam(team) : null;
}

const newTeam = async (input: TeamInput): Promise<Team> => {
  return parseTeam(await TeamModel.create(input));
}

export {
  getTeams,
  getTeam,
  newTeam
};