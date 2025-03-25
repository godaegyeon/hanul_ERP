// const express = require('express')
import express from "express";
import cors from "cors";
import 'dotenv/config'
import { readEmployees } from "./crud-lead.js";
import { createEmployees } from "./crud-create.js";
import { deleteEmployees } from "./crud-delete.js";
import { updateEmployees } from "./crud-update.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/employees", async (req, res) => {
  try {
    const employees = await readEmployees();
    const { name, email } = employees;
    res.status(200).json(employees);
  } catch (e) {
    console.log(e);
    res.status(500).send("DB 연결 오류가 발생했슴니다");
  }
});
app.post("/employees", async (req, res) => {
  // console.log(req.body);
  // res.send("Create movie");
  try {
    const result = await createEmployees(req.body);
    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    console.log("데이터 등록중 애러 : ", e);
    res.status(500).json({
      status: "fail",
      message: "데이터 등록 실패",
    });
  }
});
app.put("/employees/:id", async (req, res) => {
  console.log(target);

  try {
    const request = await updateUser({
      id: req.params.id,
      data: req.body,
    });
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "fail",
      message: "데이터 업데이트 실패",
    });
  }
});
app.delete("/employees/:id", async (req, res) => {
  try {
    const result = await deleteEmployees({ _id: req.params.id });
    res.status(201).json({
      status: "success",
      data: result,
      message: "사원정보가 삭제되었습니다",
    });
  } catch (e) {
    console.log("데이터 등록중 애러 : ", e);
    res.status(500).json({
      status: "fail",
      message: "삭제요청실패",
    });
  }
});
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    readEmployees();
  });
}
