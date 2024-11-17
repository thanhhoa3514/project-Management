const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,

      
    },
    tags: [{
      type: String,
      trim: true
    }],
    thumbnail: String,
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    createdBy: {
      account_Id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    deletedBy: {
      account_Id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_Id: String,
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true }
);
const Article = mongoose.model("Article", articleSchema, "articles");
module.exports = Article;
