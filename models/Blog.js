import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  category:{
    type : String,
    required: true,
  }
  ,
  createdBy: {
    type: String,
    required: [true, "Please enter a creator name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog
