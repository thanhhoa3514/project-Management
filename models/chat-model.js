const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    // user_id:String,
    cart_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema, "chats");
// console.log(productSchema);

module.exports = Chat;
