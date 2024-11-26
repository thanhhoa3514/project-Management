const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    // User who sent the message
    user_id: String,
    room_chat_id: String,
    content: {
      type: String,
      trim: true,
      maxLength: 1000, // Prevent extremely long messages
    },
    images: Array,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    type: {
        type: String,
        enum: ['text', 'image', 'system'],
        default: 'text'
    }
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema, "chats");
// console.log(productSchema);

module.exports = Chat;
