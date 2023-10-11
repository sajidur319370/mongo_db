const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

let tools = [
  { id: 1, name: "Karalynn" },
  { id: 2, name: "Willdon" },
  { id: 3, name: "Vivienne" },
  { id: 4, name: "Hannie" },
  { id: 5, name: "Corabella" },
];
// ===============================Get====================================
module.exports.getAllTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { limit, page } = req.query;
    const tool = await db
      .collection("users")
      .find({})
      /* .project({
         _id: 0 
      }) */
      .skip((page - 1) * limit)
      .limit(+limit) //+ is used for convertion from string to number
      .toArray();
    return res.status(200).send({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};
// =================================Save==================================
module.exports.saveAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const savedTool = await db.collection("users").insertOne(tool);
    if (!savedTool.insertedId) {
      return res
        .status(400)
        .send({ status: "false", message: "Something went Wrong" });
    }
    return res.status(200).send({
      success: true,
      message: `Tool added with id ${savedTool.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};
// =============================Details======================================
module.exports.toolDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ status: "false", message: "Wrong object id" });
    }
    const foundTool = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    return res.status(200).send({ success: true, data: foundTool });
  } catch (error) {
    next(error);
  }
};

// ===========================Update========================================
module.exports.updateTool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ status: "false", message: "Wrong object id" });
    }

    const updatedTool = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    if (!updatedTool.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't Updated" });
    } else {
      return res.status(200).json({ success: true, data: updatedTool });
    }
  } catch (error) {
    next(error);
  }
};
// =============================Delete======================================
module.exports.deleteTool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ status: "false", message: "Wrong object id" });
    }
    const deletedTool = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedTool.deletedCount) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't Deleted" });
    } else {
      return res.status(200).json({ success: true, data: deletedTool });
    }
  } catch (error) {
    next(error);
  }
};
