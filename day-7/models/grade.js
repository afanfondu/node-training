export default class Grade {
  static idCounter = 1;
  constructor(student, subject, score) {
    this.id = Grade.idCounter++;
    this.student = student;
    this.subject = subject;
    this.score = score;
  }
}
