// const { MongoClient } = require("mongodb");
import { request } from "express";
import { MongoClient, ObjectId } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://demo_user:0717@cluster0.mfakl.mongodb.net/";
const client = new MongoClient(uri);
// const dbName = ''
export async function deleteEmployees(target) {
  try {
    await client.connect();
    const db = client.db("hr");
    const coll = db.collection("employees");
    const result = await coll.deleteOne({ _id: new ObjectId(target._id) });
    return result;
  } catch (e) {
    console.log(e);
    /*   } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); */
  }
}
// deleteEmployees().catch(console.dir);

// export default run
