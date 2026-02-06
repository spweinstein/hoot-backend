import Hoot from "../models/hoot.js";

const getHoot = async (req, res) => {};

const getHoots = async (req, res) => {};

const createHoot = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    res.status(201).json(hoot);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

export { createHoot };
