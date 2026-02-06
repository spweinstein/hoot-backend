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

const updateHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (hoot.body.author !== req.user._id) {
      res.status(403).send("Permission denied");
    }
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
    );
    res.status(200).json(updatedHoot);
  } catch (e) {
    res.status(500).json(error);
  }
};

const deleteHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).json({ error: "You're not allowed to do that!" });
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getHoots, getHoot, createHoot, deleteHoot, updateHoot };
