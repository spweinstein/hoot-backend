import Hoot from "../models/hoot.js";

const getHoots = async (req, res) => {
  try {
    const hoots = await Hoot.find({}).populate("author");
    res.json(hoots);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate([
      "author",
      "comments.author",
    ]);
    res.json(hoot);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createHoot = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body); //.populate("author");
    res.status(201).json(hoot);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot.author.equals(req.user._id)) {
      res.status(403).json({ error: "Permission denied" });
    }
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedHoot);
  } catch (e) {
    res.status(500).json(e);
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

const createComment = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId).populate([
      "author",
      "comments.author",
    ]);
    hoot.comments.push(req.body);
    await hoot.save();
    const newComment = hoot.comments[hoot.comments.length - 1];
    res.status(201).json(newComment);
  } catch (e) {
    res.status(500).json(e);
  }
};

export { getHoots, getHoot, createHoot, deleteHoot, updateHoot, createComment };
