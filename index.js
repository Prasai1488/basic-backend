import express from "express";
import connectDB from "./connect.db.js";
import Course from "./course.model.js";
import mongoose from "mongoose";

// express app
const app = express();

// to make app understand json data
app.use(express.json());

// database connection and table creation //
connectDB();

// routes //
app.post("/course/add", async (req, res) => {
  const newCourse = req.body;
  //   console.log(req.body);

  await Course.create(newCourse);

  return res.status(200).send("course added");
});

// ! get course lists: (we use async/await because it is a promise)
app.get("/course/list", async (req, res) => {
  const courses = await Course.find();

  return res.status(200).send({ message: "success", courses });
});

// ! get course by id: (Total steps : 1. check valid mongo id, 2. check course exist or not)
app.get("/course/details/:id", async (req, res) => {
  const courseId = req.params.id;

  //   validate for mongo ID:
  const isValidMongoId = mongoose.isValidObjectId(courseId);

  // if not valid mongo ID:
  if (!isValidMongoId) {
    return res.status(400).send({ message: "invalid mongo id" });
  }

  // find course by id:

  const requiredCourse = await Course.findOne({ _id: courseId });

  if (!requiredCourse) {
    return res.status(404).send({ message: "course not found" });
  }

  return res.status(200).send({ message: "success", requiredCourse });
});

// ! delete course by id: (total 7 steps: 1. check valid mongo id, 2. check course exist or not, 3. delete course by id)
app.delete("/course/delete/:id", async (req, res) => {
  const courseId = req.params.id;

  const isValidMongoId = mongoose.isValidObjectId(courseId);

  if (!isValidMongoId) {
    return res.status(400).send({ message: "invalid mongo id" });
  }

  const requiredCourse = await Course.findOne({ _id: courseId });

  if (!requiredCourse) {
    return res.status(404).send({ message: "course not found" });
  }

  await Course.deleteOne({ _id: courseId });

  return res.status(200).send({ message: "course deleted" });


});


//  ! update course : (total 7 steps: 1. check valid mongo id, 2. check course exist or not, 3. update course by id)
app.put("/course/update/:id", async (req, res) => {
  const courseId = req.params.id;

  const isValidMongoId = mongoose.isValidObjectId(courseId);

  if (!isValidMongoId) {
    return res.status(400).send({ message: "invalid mongo id" });
  }

  const requiredCourse = await Course.findOne({ _id: courseId });

  if (!requiredCourse) {
    return res.status(404).send({ message: "course not found" });
  }

  await Course.updateOne({ _id: courseId }, req.body);

  return res.status(200).send({ message: "course updated" });

})

// port and server allocation  //
const port = 8000;
app.listen(port, () => {
  console.log("first server is running on port 8000");
});


