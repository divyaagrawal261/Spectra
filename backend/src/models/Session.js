import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    index: true
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  userAgent: String,
  ip: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Session", sessionSchema);
