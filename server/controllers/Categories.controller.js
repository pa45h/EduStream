const Category = require("../models/Category.model");
const Course = require("../models/Course.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required!",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    res.status(200).json({
      success: true,
      categoryDetails,
      message: "Category Created Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      allCategories,
      message: "Got All Categories Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        populate: {
          path: "ratingAndReviews",
        },
      })
      .exec();
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found!",
      });
    }

    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        populate: {
          path: "ratingAndReviews",
        },
      })
      .exec();

    const topSellingCourses = await Course.find({})
      .sort({ studentEnrolled: -1 })
      .limit(10)
      .populate("ratingAndReviews")
      .exec();

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
      message: "Category Page Data Fetched Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
