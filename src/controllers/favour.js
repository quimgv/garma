const mongoose = require("mongoose");

// Load models
const User = require("../models/user");
const Favour = require("../models/favour");

exports.get_all_favours = async (req, res) => {
    let filters = {};
    const categories = req.query.categories ? req.query.categories.split(",") : [];
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
  
    if (categories.length > 0) {
        filters.categories = {
        categories: { $in: categories }
      };
    }
  
    try {
      const favours = await Favour.find(filters, null, { limit, skip });
      res.json(favours);
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  };

exports.create_favour = async (req, res) => {
//   const { errors, isValid } = validateCreateFavours(req.body, req.user);

//   if (!isValid) {
//     return res.status(400).json({ showErr: errors });
//   }
  const favourFields = {
    owner: {
      user: req.user._id
    },
    ...req.body
  };
  if (req.body.categories) favourFields.categories = req.body.categories;

  // Create favour
  const favour = new Favour(favourFields);

  try {
    // Save favour
    await favour.save();

    // Update user score
    const newScore = req.user.score - favour.value;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { score: newScore } },
      { new: true }
    );

    res.status(201).json({
      favour,
      user: {
        score: user.score
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};