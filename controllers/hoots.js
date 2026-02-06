import Hoot from "../models/hoot.js";

const getHoots = async (req, res) => {
  try {
    const hoots = await Hoot.find({});
    res.json(hoots);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    res.json(hoot);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createHoot = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    res.status(201).json(hoot);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getHoots,
  getHoot,
  createHoot
};