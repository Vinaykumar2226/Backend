const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://vinaykumar8499811301:test12345@cluster0.kxlenws.mongodb.net/SocialMedia";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
