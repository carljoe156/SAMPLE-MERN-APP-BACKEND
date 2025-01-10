import mongoose from "mongoose";

const brainSchema = new mongoose.Schema(
  {
    user: String,
    entryDate: {
      type: Date,
      required: true,
    },
    entryType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestmps: true,
  }
);

// Our indexes
brainSchema.index({ entryDate: 1 });

const Brain = mongoose.model("Brain", brainSchema);

export default Brain;
