// const { MongoClient } = require("mongodb");
import { request } from "express";
import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://demo_user:0717@cluster0.mfakl.mongodb.net/";
const client = new MongoClient(uri);
// const dbName = ''
export async function readEmployees() {
  try {
    await client.connect();
    const db = client.db("hr");
    const coll = db.collection("employees");
    const cursor = coll.find();
    const users = await cursor.toArray()
    return users;

  } catch (e) {
    console.log(e);
/*   } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); */
  }
}
readEmployees().catch(console.dir);

// export default run
