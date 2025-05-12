import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  sender: { type: String, enum: ["user", "bot"] },
  images: [String], // Array of image URLs
  time: Date,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    messages: [messageSchema],
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
