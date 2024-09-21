const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://aboantar852003:nodejs_123@learn-mongo-db.wocwvuu.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";
const client = new MongoClient(uri);

const main = async () => {
  await client.connect();

  console.log("Connected Successfully");

  const db = client.db("codeZone");
  const collection = db.collection("courses");
  //insert data
  await collection.insertOne({
    title: "course3",
    price: 3000,
  });

  const data = await collection.find().toArray();
  console.log(data);
};
main();
