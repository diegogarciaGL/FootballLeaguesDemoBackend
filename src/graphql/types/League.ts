export default `
  type League {
    _id: String!
    name: String!
    country: String!
    teams: [Team!]
  }
  input LeagueInput {
    _id: String
    name: String!
    country: String!
  }
  type Query {
    leagues: [League!]!
    leage(leagueId: String!): League
  }
  type Mutation {
    newLeague(input: LeagueInput!): League!
  }
`;