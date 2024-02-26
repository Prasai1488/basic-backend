import mongoose from "mongoose";

// rules settings before creating a table //
const courseSchema = new mongoose.Schema({
  
    name: String,
    duration: Number,
    price: Number,
    tutorName: String,
  
});

// creating a table //
const Course = mongoose.model("Course", courseSchema);

export default Course;

