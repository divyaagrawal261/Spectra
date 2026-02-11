import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  apiKey: {
    type: String,
    unique: true,
    index: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Project", projectSchema);
