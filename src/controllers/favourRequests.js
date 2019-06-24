const mongoose = require("mongoose");
const _ = require("lodash");

// Load models
const FavourRequests = require("../models/favourRequests");
const Favour = require("../models/favour");

exports.create_favour_request = async (req, res) => {
  // Create favour Request
  const request = new FavourRequests({
    helper: req.body.helperId,
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
      return res
        .status(400)
        .json({
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
