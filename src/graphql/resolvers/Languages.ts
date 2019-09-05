import { Resolvers, Language } from '../generated/resolvers-types';
import { getLanguages, newLanguage } from '../../services/Languages';

const languagesResolvers: Resolvers = {
  Query: {
    languages: async (): Promise<Language[]> => {
      return await getLanguages();
    }
  },
  Mutation: {
    newLanguage: async (root, { input }): Promise<Language> => {
      return await newLanguage(input);
    }
  }
};

export {
  languagesResolvers
};