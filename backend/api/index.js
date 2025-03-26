import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db("hr");
  const coll = db.collection("employees");

  const cors = require("cors");
  const corsOptions = {
    origin: "*", // 해당 URL 주소만 요청을 허락함
    credentials: true, // 사용자 인증이 필요한 리소스를 요청할 수 있도록 허용함
  };

  try {
    switch (req.method) {
      case "GET":
        const allEmployees = await coll.find().toArray();
        res.status(200).json(allEmployees);

        app.use(cors(corsOptions)); // cors 설정 미들웨어
        app.use(express.json()); // 요청본문 (request body) 파싱(해석)을 위한 미들웨어
        
        break;
      case "POST":
        const newEmployee = req.body;
        const result = await coll.insertOne(newEmployee);
        res.status(200).json(result);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
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
