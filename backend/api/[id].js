import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db("hr");
  const employees = db.collection("employees");
  const { id } = req.query;

  try {
    switch (req.method) {
      case "PUT":
        const updateEmployee = req.body;
        const updateResult = await employees.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateEmployee }
        );
        res.status(200).json(updateResult);
        break;
      case "DELETE":
        const deleteResult = await employees.deleteOne({ _id: new ObjectId(target._id) });
        res.status(200).json(deleteResult);
        break;
      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        res.status(405).end(`${req.method}는 허용되지 않습니다`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "fall",
      error: e.message,
      msg: "서버 통신 오류, 관리자 문의 요망",
    });
  } finally {
    await client.close();
  }

  return new Response("response GET");
}
