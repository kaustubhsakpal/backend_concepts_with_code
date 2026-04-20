import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      default: "New Conversation",
    }
  },
  {
    timestamps: true,
  },
);

export const ChatModel = mongoose.model("Chat", ChatSchema);
