import mongoose, { Schema } from 'mongoose';

const TeamScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  leagueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leagues'
  }
});

const Team = mongoose.model('Team', TeamScheme, 'Teams');

export default Team;