import mongoose from "mongoose";

const GameDataSchema = new mongoose.Schema({
  playerX: String,
  winX: Number,
  playerO: String,
  winO: Number,
  draws: Number,
  totalGames: Number
});

export default mongoose.model('GameData', GameDataSchema);