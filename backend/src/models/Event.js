import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },

    eventName: {
      type: String,
      required: true,
      index: true
    },

    page: {
      type: String
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed
    },

    timestamp: {
      type: Date,
      required: true
    }
  },
  { strict: true }
);

eventSchema.index({ projectId: 1, eventName: 1 });
eventSchema.index({ projectId: 1 });

export default mongoose.model("Event", eventSchema);
