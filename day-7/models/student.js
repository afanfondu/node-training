export default class Student {
  static idCounter = 1;
  constructor(name) {
    this.id = Student.idCounter++;
    this.name = name;
    this.grades = [];
  }

  addGrade(grade) {
    this.grades.push(grade);
  }

  getAverage() {
    const total = this.grades.reduce((sum, g) => sum + g.score, 0);
    return this.grades.length ? total / this.grades.length : 0;
  }

  getSubjectScore(subject) {
    return this.grades.find((g) => g.subject === subject)?.score || 0;
  }
}
