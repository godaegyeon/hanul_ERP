import { request } from "express";
import { MongoClient, ObjectId } from "mongodb";
const uri = "mongodb+srv://demo_user:0717@cluster0.mfakl.mongodb.net/";
const client = new MongoClient(uri);
export async function updateEmployees(target) {
  try {
    await client.connect();
    const db = client.db("hr");
    const coll = db.collection("employees");

    const findUpdateEmp = coll.findOne({
      _id: new ObjectId(target.id),
    });
    if (!findUpdateEmp) {
      return {
        updateCount: 0,
      };
      // console.log('업데이트 할 대상이 존재합니다');
    }
    const result = await coll.updateOne(
      { _id: { $eq: new ObjectId(target.id) } },
      {$set:target.data}
      // {
      // employee_id: target.employee_id,
      // last_name: target.lastName,
      // first_name: target.firstName,
      // hire_date: target.hireDate,
      // }
    );
    // return result;
  } catch (e) {
    console.log(e);
    /*   } finally {
    Ensures that the client will close when you finish/error
    await client.close(); */
  }
}
// deleteEmployees().catch(console.dir);

// export default run
