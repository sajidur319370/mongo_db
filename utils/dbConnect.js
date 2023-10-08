const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;

let dbConnection;

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(connectionString)
      .then((client) => {
        dbConnection = client.db("tools");
        console.log("Successfully Connected To MONGODB!!Huh".bold);
        return callback();
      })
      .catch((err) => {
        console.log(err);
        return callback(err);
      });
  },
  getDb: () => {
    return dbConnection;
  },
};
