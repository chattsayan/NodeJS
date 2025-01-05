const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// ----- connection URL -----
// as mongodb is downloaded and installed in local machine, the below url is used
// eg.- const url = 'mongodb://localhost:27017';
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.rrkxe.mongodb.net/`;
// const url = "mongodb+srv://sayan:XE65NbqpdasC3sa7@cluster0.rrkxe.mongodb.net/";
const client = new MongoClient(url);

// ----- DB Name -----
const dbName = "nodeDB";

async function main() {
  // Use connect method to connect to the server
  // client.connect() requests the url mentioned above
  await client.connect();
  console.log("Connected successfully to server");
  // after connecting to the server, it is referencing to the DB (nodeDB)
  const db = client.db(dbName);
  // now it is referencing to the collection (user)
  const collection = db.collection("user");

  // ----- SAMPLE DATA -----
  const data = {
    firstname: "Ram",
    lastname: "Mohan Roy",
    city: "Bideshe",
    phone_number: 9887501245,
  };

  // ----- INSERT/CREATE -----
  //   const insertResult = await collection.insertMany([data]);
  //   console.log("Inserted documents =>", insertResult);

  // ----- FIND -----
  //   const findResult = await collection.find({ firstname: "Ram" }).toArray();
  //   console.log("Found documents =>", findResult);

  // ----- UPDATE -----
  //   const updateResult = await collection.updateOne(
  //     { firstname: "Ram" },
  //     { $set: { firstname: "Ram Chandra" } }
  //   );
  //   console.log("Updated documents =>", updateResult);

  // ----- REMOVE -----
  const deleteResult = await collection.deleteMany({ firstname: "Ram" });
  console.log("Deleted documents =>", deleteResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close()); // client.close() - closes the connection

// ----- NOTES -----
// go to mongoDB website
// create a free M0 cluster
// create an user
// get the connection string
// install mongodb compass
