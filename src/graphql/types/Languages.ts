export default `
  type Language {
    _id: String!
    name: String!
    isActive: Boolean!
  }
  input LanguageInput {
    _id: String
    name: String!
    isActive: Boolean!
  }
  type Query {
    languages: [Language]
  }
  type Mutation {
    newLanguage(input: LanguageInput!): Language
  }
`;