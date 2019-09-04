import mongoose, { Schema } from 'mongoose';

const LeagueScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const League = mongoose.model('League', LeagueScheme, 'Leagues');

export default League;