import Teacher from "./models/teacher.js";
import Student from "./models/student.js";
import Classs from "./models/classs.js";
import { generateName, getRandomElement } from "./utils.js";

const teachers = [];
for (let i = 0; i < 5; i++) {
  teachers.push(new Teacher(generateName()));
}
const students = [];
for (let i = 0; i < 30; i++) {
  students.push(new Student(generateName()));
}

const subjects = [
  "Math",
  "English",
  "History",
  "Science",
  "Art",
  "Music",
  "PE",
  "IT",
  "Biology",
  "Physics",
];
const classs = [];
for (let i = 0; i < 10; i++) {
  const teacher = getRandomElement(teachers);
  classs.push(new Classs(subjects[i], teacher));
}
students.forEach((student) => {
  const cls = getRandomElement(classs);
  cls.addStudent(student);
});

classs.forEach((cls) => cls.assignRandomGrades());

// Top 5 students by average
const topStudents = [...students]
  .sort((a, b) => b.getAverage() - a.getAverage())
  .slice(0, 5);
console.log("\n🏆 Top 5 Students by Average:");
topStudents.forEach((s) => {
  console.log(`${s.name} (Avg: ${s.getAverage().toFixed(2)})`);
});
// 🏆 Top 5 Students by Average:
// Alex-17 (Avg: 99.00)
// Peyton-19 (Avg: 96.00)
// Peyton-23 (Avg: 96.00)
// Alex-25 (Avg: 96.00)
// Sky-16 (Avg: 94.00)

// Teacher with highest student average
const topTeacher = classs.reduce(
  (best, cls) => {
    return cls.averageScore() > best.score
      ? {
          teacher: cls.teacher,
          subject: cls.subject,
          score: cls.averageScore(),
        }
      : best;
  },
  { teacher: null, subject: null, score: 0 },
);
console.log(
  `\n 🏫 Top Teacher by Student Avg: ${topTeacher.teacher.name} (${topTeacher.subject}) - Avg: ${topTeacher.score.toFixed(2)}`,
);
// 🏫 Top Teacher by Student Avg: Sam-5 (Science) - Avg: 89.67

// List students per class with performance
console.log("\n📚 Class-wise Student Performance:");
classs.forEach((cls) => {
  console.log(`\nClass: ${cls.subject} | Teacher: ${cls.teacher.name}`);
  cls.students.forEach((s) => {
    console.log(`- ${s.name} | Score: ${s.getSubjectScore(cls.subject)}`);
  });
});
// 📚 Class-wise Student Performance:
//
// Class: Math | Teacher: Sam-5
// - Taylor-29 | Score: 52
//
// Class: English | Teacher: Sam-5
// - Jamie-9 | Score: 50
// - Casey-12 | Score: 89
// - Alex-14 | Score: 72
// - Alex-25 | Score: 96
//
// Class: History | Teacher: Jamie-4
//
// Class: Science | Teacher: Sam-5
// - Sky-16 | Score: 94
// - Casey-20 | Score: 82
// - Riley-34 | Score: 93
//
// Class: Art | Teacher: Devin-1
// - Alex-8 | Score: 59
// - Peyton-13 | Score: 58
// - Peyton-18 | Score: 55
// - Sam-30 | Score: 64
//
// Class: Music | Teacher: Devin-1
// - Peyton-10 | Score: 80
// - Sam-21 | Score: 68
// - Sam-22 | Score: 53
// - Jamie-24 | Score: 77
// - Peyton-27 | Score: 83
//
// Class: PE | Teacher: Devin-1
// - Alex-17 | Score: 99
// - Casey-26 | Score: 69
// - Sky-31 | Score: 79
// - Sam-33 | Score: 74
//
// Class: IT | Teacher: Sam-3
// - Casey-6 | Score: 63
// - Riley-7 | Score: 77
// - Sam-15 | Score: 86
// - Peyton-19 | Score: 96
// - Sky-28 | Score: 74
//
// Class: Biology | Teacher: Jamie-4
// - Peyton-23 | Score: 96
// - Casey-35 | Score: 74
//
// Class: Physics | Teacher: Sam-5
// - Taylor-11 | Score: 85
// - Jordan-32 | Score: 50
