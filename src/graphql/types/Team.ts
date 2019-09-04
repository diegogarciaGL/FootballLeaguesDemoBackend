export default `
  type Team {
    _id: String!
    name: String!
    leagueId: String!
    league: League
    players: [Player]
  }
  input TeamInput {
    _id: String
    name: String!
    leagueId: String!
  }
  type Query {
    team(teamId: String!): Team
  }
  type Mutation {
    newTeam(input: TeamInput!): Team!
  }
`;