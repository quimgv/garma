const mongoose = require("mongoose");
const _ = require("lodash");

// Load models
const FavourRequests = require("../models/favourRequests");
const Favour = require('../models/favour');

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
    if(!favour) {
        throw new Error("Favour not found");
    }
    if(favour.status !== 'Open') {
        throw new Error("This favour cannot be requested");
    }

    // Check if this favour has been requested by this user
    const alreadyRequested = await FavourRequests.find({
      helper: req.body.userId,
      favour: req.params.id
    });
    if (alreadyRequested.length > 0) {
      throw new Error("Already requested");
    }
    // Save favour request
    await request.save();

    res.status(201).json(request);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};







