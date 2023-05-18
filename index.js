const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  GPA: Number

  
});

// Model
const StudentModel = mongoose.model('Students',StudentSchema);
//MONGO DATABASE CONNECTION
DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_CONNECTION.replace("<password>",DB_PASSWORD))
.then(()=> console.log("Mongo DB Connected!"))




app.get("/api", (req, res) => {
  res.send("Welcome to Our API!");
});
//get All 
app.get("/api/students", async(req, res) => {
  const { name } = req.query;
  const students = await StudentModel.find();
  if (name === undefined) {
    res.status(200).send({
      data: students,
      message: "data get success!",
    });
  } else {
    res.status(200).send({
      data: students.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
      message: "data get success!",
    });
  }
});
//get  by ID
app.get("/api/students/:id", async(req, res) => {
  const id = req.params.id;
  const student = await StudentsModel.findById(id);
  console.log(' found: ',student);
  if (!student) {
    res.status(204).send(" not found!");
  } else {
    res.status(200).send({
      data: student,
      message: "data get success!",
    });
  }
});
//delete  by ID
app.delete("/api/students/:id", async(req, res) => {
  const id = req.params.id;
  const student = await StudentsModel.findByIdAndDelete(id);
  if (student === undefined) {
    res.status(404).send(" not found");
  } else {
    res.status(203).send({
      data:student,
      message: " deleted successfully",
    });
  }
});
//post
app.post("/api/students",async(req, res) => {
  const { name, surname, GPA } = req.body;
  const newStudents = new StudentModel({
    name: name,
    surname:surname,
    GPA:GPA
  })
  await newStudents.save();
  res.status(201).send("created");
});
//put
app.put("/api/student/:id", (req, res) => {
  const id = req.params.id;
  const { name, surname, GPA } = req.body;
  const existedStudent = Student.find((x) => x.id == id);
  if (existedStudent == undefined) {
    res.status(404).send(" not found!");
  } else {
    if (name) {
      existedStudent.name = name;
    }
    if (age) {
      existedStudent.surname = surname;
    }
    if (GPA) {
      existedStudent.GPA = GPA;
    }
    res.status(200).send(`student: ${existedStudent.name}`);
  }
});



PORT = "3000";
app.listen(PORT, () => {
  console.log(`NODE APP  on port ${PORT}`);
});
