import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose"
import student from './models/student.js'
import mentor from "./models/mentor.js"
import connectdb from "./dbconfig.js"

connectdb();
const app = express();

dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }))


// req => what we send to Server
// res => what we receive from server
app.get("/", function (req, res) {
  res.send("<h1>Welcome to Student Mentor Backend<h1>");
});

/**
 * CREATE STUDENT
 * METHOD: POST
 * REQ: INPUT
 * RES: OUTPUT
 * PATH: /creatementor
 */
app.post("/createstudent", async function (req, res) {
  const { studentname, contactno, mentorassigned } = req.body
  const newstudent = new student({
    studentname: studentname,
    contactno: contactno,
    mentorassigned: mentorassigned
  })
  await newstudent.save()
  res.status(200).send(newstudent)
});

/**
 * CREATE MENTOR
 * METHOD: POST
 * REQ: INPUT
 * RES: OUTPUT
 * PATH: /creatementor
 */
app.post("/creatementor", async function (req, res) {
  const { mentorname, contactno, rating, courses, language, studentenrolled, studentunenrolled } = req.body;
  const newmentor = new mentor({
    mentorname: mentorname,
    contactno: contactno,
    rating: rating,
    courses: courses,
    language: language,
    studentenrolled: studentenrolled,
    studentunenrolled: studentunenrolled
  })
  await newmentor.save()
  res.status(200).send(newmentor)
})


/**
 * STUDENT ASSIGNED TO MENTOR
 * METHOD: PUT
 * REQ: INPUT
 * RES: OUTPUT
 * PATH: /nomentorassigned
 */
app.get("/nomentorassigned", async function (req, res) {
  const a = await student.find({}, { et: { mentorassigned: 0 } })
  res.send(a)
});

/**
 * METHOD: PUT
 * REQ: INPUT
 * RES: OUTPUT
 * PATH: /assignstudent/:mentorid
 */
app.put("/assignstudent/:mentorid", async (req, res) => {
  const mentorid = req.params["mentorid"]
  const students= req.body
  for (const sp in students) {
    console.log(students[sp])
    const result = await mentor.findOneAndUpdate({ _id: mentorid }, { $push: { studentenrolled: sp } })
   const abcd = await student.findOneAndUpdate({ _id: sp }, { $push: { mentorassigned: mentorid } })} 
  
  res.send(result)
})

/**
 * SERVER LISTEN WITH PORT NUMBER
 */
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})