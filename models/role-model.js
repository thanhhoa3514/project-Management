const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: String,
    Permission_groups: {
      type: Array,
      default: [],
    },
    description: String,
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
const Role = mongoose.model("Role", roleSchema, "roles");
// console.log(productSchema);

module.exports = Role;
