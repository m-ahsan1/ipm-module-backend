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
  preffered_slots:String
});

const CourseInstructor = mongoose.model('CourseInstructor', courseInstructorSchema);

const server = express();
server.use(cors());
server.use(bodyParser.json())

server.post('/demo', async (req, res)=>{

  let courseIns = new CourseInstructor();
  courseIns.course_name = req.body.course_name
  courseIns.preffered_slots = req.body.preferred_slots

  const doc = await courseIns.save()
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
