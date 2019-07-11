const mongoose = require("mongoose");
const _ = require("lodash");

const { update_many_requests_filters } = require("./favourRequestsHelpers");

// Load models
const FavourRequests = require("../models/favourRequests");
const Favour = require("../models/favour");

exports.create_favour_request = async (req, res) => {
  // Create favour Request
  const request = new FavourRequests({
    helper: req.body.helper,
    favour: req.params.id,
    owner: req.body.owner,
    message: req.body.message
  });

  try {
    // Check if favour status is not Open
    const favour = await Favour.findById(req.params.id);
    if (!favour) {
      return res
        .status(404)
        .json({ showErr: { notFound: "Favour not found" } });
    }
    if (favour.status !== "Open") {
      return res
        .status(400)
        .json({ showErr: { notOpen: "This favour cannot be requested" } });
    }

    // Check if this favour has been requested by this user
    const alreadyRequested = await FavourRequests.find({
      helper: req.body.userId,
      favour: req.params.id
    });
    if (alreadyRequested.length > 0) {
      return res.status(400).json({
        showErr: {
          alreadyRequested: "This favour has already been requested"
        }
      });
    }
    // Save favour request
    await request.save();

    res.status(201).json(request);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_requests = async (req, res) => {
  let filters = {};

  for (let key in req.query) {
    if (req.query[key].includes(",")) {
      filters[key] = { $in: req.query.helper.split(",") };
    } else {
      filters[key] = req.query[key];
    }
  }

  try {
    const requests = await FavourRequests.find(filters)
      .populate("helper")
      .populate("owner")
      .populate("favour");
    res.json(requests);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_request = async (req, res) => {
  try {
    const request = await FavourRequests.findByIdAndDelete(req.params.id);
    res.json(request);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_many_requests = async (req, res) => {
  try {
    const requests = await FavourRequests.deleteMany(req.query);
    res.json(requests);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.update_request = async (req, res) => {
  let updates = req.body;

  try {
    let request = await FavourRequests.findById(req.params.id);

    if (!request) {
      res.status(404).json("Request not found");
    }
    updates = _.merge(request, updates);
    const requestUpdate = await FavourRequests.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate("helper");
    res.json(requestUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.update_many_requests = async (req, res) => {
  // req.body -> update, favourId, requestId, action

  const filters = update_many_requests_filters(req.body);
  try {
    let update = await FavourRequests.updateMany(filters, req.body.update);
    res.json(update);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};
