/* eslint-disable @typescript-eslint/no-explicit-any */
import { newLeague } from './services/Leagues';
import { newTeam } from './services/Teams';
import { newPlayer } from './services/Players';
import { League } from './graphql/generated/resolvers-types';

const mapPlayer = (p: any): any => ({
  name: p.name,
  shirtNumber: p.shirtNumber,
  position: p.position,
  nationality: p.nationality
});

const mapTeam = (t: any): any => ({
  name: t.name,
  players: t.squad.map(mapPlayer)
});

const mapLeague = (l: any): any => ({
  name: l.name,
  country: l.area.name,
  teams: l.teams.map(mapTeam)
});

const prepareData = async (leaguesData: object[]): Promise<any[]> => {
  return leaguesData.reduce((leagues: Array<any>, league: any) => {
    leagues.push(mapLeague(league));
    return leagues;
  }, []);
}

const loadData = async (inputData: any[]): Promise<League[]> => {
  const leaguesData = await prepareData(inputData);
  const leagues: League[] = [];
  for (let i = 0; i < leaguesData.length; i++) {
    const _league = leaguesData[i];
    const league = await newLeague({ name: _league.name, country: _league.country });
    league.teams = [];
    leagues.push(league);
    const _teams = _league.teams;
    for (let j = 0; j < _teams.length; j++) {
      const _team = _teams[j];
      const team = await newTeam({ leagueId: league._id, name: _team.name });
      league.teams.push(team);
      team.players = [];
      const _players = _team.players;
      for (let k = 0; k < _players.length; k++) {
        const _player = _players[k];
        const player = await newPlayer({ teamId: team._id, name: _player.name, nationality: _player.nationality, position: _player.position, shirtNumber: _player.shirtNumber });
        team.players.push(player);
      }
    }
  }
  return leagues;
}

export {
  prepareData,
  loadData
};