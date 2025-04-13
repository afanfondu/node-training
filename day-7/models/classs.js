import Grade from "./grade.js";

export default class Classs {
  static idCounter = 1;
  constructor(subject, teacher) {
    this.id = Classs.idCounter++;
    this.subject = subject;
    this.teacher = teacher;
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  assignRandomGrades() {
    this.students.forEach((student) => {
      const score = Math.floor(Math.random() * 51) + 50; // 50–100
      const grade = new Grade(student, this.subject, score);
      student.addGrade(grade);
    });
  }

  averageScore() {
    const scores = this.students.map((s) => s.getSubjectScore(this.subject));
    const total = scores.reduce((sum, s) => sum + s, 0);
    return scores.length ? total / scores.length : 0;
  }
}
