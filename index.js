const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('DB connected..')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const courseInstructorSchema = new mongoose.Schema({
  name:String,
  course_names:[String],
  non_preferred_slots:[String],
  unavailable_slots:[String],

});

const labInstructorSchema = new mongoose.Schema({

  name:String,
  lab_names:[String],
  preferred_slots:[String],
  grade:String,
  cgpa:String,
  university:String,
  industry_experience:String

});

const CourseInstructor = mongoose.model('CourseInstructor', courseInstructorSchema);

const LabInstructor = mongoose.model('LabInstructor', labInstructorSchema);

const server = express();
server.use(cors());
server.use(bodyParser.json())

server.post('/demo', async (req, res)=>{

  let courseIns = new CourseInstructor();
  courseIns.name = req.body.name
  courseIns.course_names = req.body.course_names
  courseIns.non_preferred_slots = req.body.non_preferred_slots
  courseIns.unavailable_slots = req.body.unavailable_slots



  const doc = await courseIns.save()

  let data = fs.readFileSync('course.json');

  if (data.length === 0) {
    data = '[]';
  }
  const dataArray = JSON.parse(data);
  const newObj = req.body
  dataArray.push(newObj);
  fs.writeFileSync('course.json', JSON.stringify(dataArray));
  console.log(newObj)
  res.json(doc)
})

server.post('/lab', async (req, res)=>{

  let labIns = new LabInstructor();
  labIns.lab_names = req.body.lab_names
  labIns.preferred_slots = req.body.preferred_slots
  labIns.grade = req.body.grade
  labIns.cgpa = req.body.cgpa
  labIns.university = req.body.university
  labIns.industry_experience = req.body.industry_experience
  labIns.name = req.body.name

  const doc = await labIns.save()

  let data = fs.readFileSync('lab.json');

  if (data.length === 0) {
    data = '[]';
  }
  const dataArray = JSON.parse(data);
  const newObj = req.body
  dataArray.push(newObj);
  fs.writeFileSync('lab.json', JSON.stringify(dataArray));

  console.log(newObj)
  res.json(doc)
})


server.get('/demo', async (req, res)=>{
  const docs = await CourseInstructor.find({})
  res.json(docs)

})

server.listen(8080, ()=>{
  console.log('Server started..')
})
