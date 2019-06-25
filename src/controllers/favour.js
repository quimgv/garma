const mongoose = require("mongoose");
const _ = require('lodash');

// Load models
const User = require("../models/user");
const Favour = require("../models/favour");

exports.get_favours = async (req, res) => {
  let filters = {};
  const categories = req.query.categories
    ? req.query.categories.split(",")
    : [];
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  if (categories.length > 0) {
    filters.categories = {
      categories: { $in: categories }
    };
  }

  try {
    const favours = await Favour.find(filters, null, { limit, skip });
    const favoursCount = await Favour.countDocuments(filters);
    res.json({ favours, favoursCount });
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

exports.get_favour = async (req, res) => {
  try {
    const favour = await Favour.findById(req.params.id)
      .populate("helper.user")
      .populate("owner.user");
    if (!favour) {
      return res.status(404).json("Favour not found");
    }
    res.json(favour);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

// @route   PATCH /favour/:id
exports.update_favour = async (req, res) => {
  let updates = req.body;

  try {
    let favour = await Favour.findById(req.params.id);

    if (!favour) {
      res.status(404).json("Favour not found");
    }
    updates = _.merge(favour, updates);
    const favourUpdate = await Favour.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate('helper.user');
    res.json(favourUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_favour = async (req,res) => {
  try {
      const favour = await Favour.findByIdAndDelete(req.params.id);
      res.json(favour);
  } catch(err) {
      console.log(err);
      res.status(500).json(err);
  }
};
