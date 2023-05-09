const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('DB connected..')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const courseInstructorSchema = new mongoose.Schema({
  course_name:String,
  preferred_slots:[String]
});

const labInstructorSchema = new mongoose.Schema({
  lab_name:String,
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
  courseIns.course_name = req.body.course_name
  courseIns.preferred_slots = req.body.preferred_slots

  const doc = await courseIns.save()
  console.log(doc)
  res.json(doc)
})

server.post('/lab', async (req, res)=>{

  let labIns = new LabInstructor();
  labIns.lab_name = req.body.lab_name
  labIns.preferred_slots = req.body.preferred_slots
  labIns.grade = req.body.grade
  labIns.cgpa = req.body.cgpa
  labIns.university = req.body.university
  labIns.industry_experience = req.body.industry_experience




  const doc = await labIns.save()
  console.log(doc)
  res.json(doc)
})


server.get('/demo', async (req, res)=>{
  const docs = await CourseInstructor.find({})
  res.json(docs)

})

server.listen(8080, ()=>{
  console.log('Server started..')
})
