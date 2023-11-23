const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const { default: slugify } = require("slugify");

// create or post blog

const postblog = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const blog = await Blog.create(req.body);
    res
      .status(200)
      .json({ status: true, message: "Blog Posted Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

// get A blog

const getblog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug: slug });
    res.status(200).json({ status: true, message: "Blog Found!", blog });
  } catch (error) {
    throw new Error(error);
  }
});

// get All blogs

const getallblogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json({ status: true, message: "Blogs Found!", blog });
  } catch (error) {
    throw new Error(error);
  }
});

// delete a blog

const deleteblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Blog Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

//  update a blog

const updateblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({ status: true, message: "Blog Updated Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postblog,
  getblog,
  getallblogs,
  deleteblog,
  updateblog,
};