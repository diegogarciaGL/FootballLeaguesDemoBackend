export default `
  type Player {
    _id: String!
    name: String!
    shirtNumber: Int
    position: String
    nationality: String
    teamId: String!
    team: Team
  }
  input PlayerInput {
    _id: String
    name: String!
    shirtNumber: Int
    position: String
    nationality: String
    teamId: String!
  }
  type Query {
    player(playerId: String!): Player
    players(teamId: String!): [Player!]
  }
  type Mutation {
    newPlayer(input: PlayerInput!): Player!
  }
`;