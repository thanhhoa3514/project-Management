const mongoose = require("mongoose");
const generateStringRandom = require("../helpers/generateStringRandom");


const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email:String,
    password: String,
    token:{
        type:String,
        default:generateStringRandom.generateStringRandom(20)
    },
    phone:String,
    avatar:String,
    role_id:String,
    status:String,
    deleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    deletedAt: Date,
    restoreAt: Date,
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model("Account", accountSchema, "accounts");
// console.log(productSchema);

module.exports = Account;
