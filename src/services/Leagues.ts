import { Document } from 'mongoose';
import LeagueModel from '../models/League';
import { League, LeagueInput } from '../graphql/generated/resolvers-types';

const parseLeague = (data: Document): League => {
  const league: League = {
    _id: data._id,
    name: data.get('name'),
    country: data.get('country'),
    teams: []
  };
  return league;
}

const getLeagues = async (): Promise<League[]> => {
  return (await LeagueModel.find()).map(parseLeague);
}

const getLeague = async (leagueId: string): Promise<League | null> => {
  const league = await LeagueModel.findById(leagueId);
  return league ? parseLeague(league) : null;
}

const newLeague = async (input: LeagueInput): Promise<League> => {
  return parseLeague(await LeagueModel.create(input));
}

export {
  getLeagues,
  getLeague,
  newLeague
};