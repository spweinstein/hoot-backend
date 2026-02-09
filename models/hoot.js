import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const hootSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["News", "Sports", "Games", "Movies", "Music", "Television"],
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Hoot", hootSchema);
