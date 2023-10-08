const { getDb } = require("../utils/dbConnect");

let tools = [
  { id: 1, name: "Karalynn" },
  { id: 2, name: "Willdon" },
  { id: 3, name: "Vivienne" },
  { id: 4, name: "Hannie" },
  { id: 5, name: "Corabella" },
];

module.exports.getAllTools = (req, res) => {
  // res.send("Tools found");

  const { limit, page } = req.query;
  // console.log(limit, page);
  res.json(tools.slice(0, limit));
};

module.exports.saveAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const savedTool = await db.collection("users").insertOne(tools);
    console.log(savedTool);
    res.send("Tool Saved Successfully");
  } catch (error) {
    next(error);
  }
};

module.exports.toolDetails = (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const foundTool = tools.find((tool) => tool.id === Number(id));
  res.send(foundTool);
};
module.exports.updateTool = (req, res) => {
  const { id } = req.params;
  const newData = tools.find((tool) => tool.id === Number(id));
  newData.id = id;
  newData.name = req.body.name;

  res.send(newData);
};

module.exports.deleteTool = (req, res) => {
  const { id } = req.params;
  tools = tools.filter((tool) => tool.id !== Number(id));
  res.send(tools);
};
