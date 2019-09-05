import mongoose, { Schema } from 'mongoose';

const LanguageScheme = new Schema({
  languageId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
});

const Language = mongoose.model('Language', LanguageScheme, 'Languages');

export default Language;