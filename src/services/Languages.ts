import { Document } from 'mongoose';
import LanguageModel from '../models/Language';
import { Language, LanguageInput } from '../graphql/generated/resolvers-types';

const parseLanguage = (data: Document): Language => {
  const language: Language = {
    _id: data._id,
    languageId: data.get('languageId'),
    name: data.get('name'),
    isActive: data.get('isActive')
  };
  return language;
}

const getLanguages = async (): Promise<Language[]> => {
  return (await LanguageModel.find()).map(parseLanguage);
}

const newLanguage = async (input: LanguageInput): Promise<Language> => {
  return parseLanguage(await LanguageModel.create(input));
}

export {
  getLanguages,
  newLanguage
};