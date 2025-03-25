import { MongoClient } from "mongodb";
const uri = MONGODB_ATLAS_URI;
const client = new MongoClient(uri);
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
  } finally {
    await client.close();
  }
}
