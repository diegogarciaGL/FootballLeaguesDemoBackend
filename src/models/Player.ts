import mongoose, { Schema } from 'mongoose';

const PlayerScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  shirtNumber: {
    type: Number,
    required: false
  },
  position: {
    type: String,
    required: false
  },
  nationality: {
    type: String,
    required: false
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teams'
  }
});

const Player = mongoose.model('Player', PlayerScheme, 'Players');

export default Player;