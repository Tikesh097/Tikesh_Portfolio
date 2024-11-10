class User {             // Base class User
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getDetails() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}
class Student extends User {       // Student class inheriting from User
    constructor(name, email, studentId) {
        super(name, email);
        this.studentId = studentId;
    }

    enroll() {
        console.log(`Student ${this.name} has enrolled.`);
    }
}
class Instructor extends User {      // Instructor class inheriting from User

    constructor(name, email, instructorId) {
        super(name, email);
        this.instructorId = instructorId;
    }

    assignGrade() {
        console.log(`Instructor ${this.name} assigned a grade.`);
    }
}

// Demonstratio:-
const student1 = new Student("Alice", "alice@example.com", "S123");
student1.getDetails();
student1.enroll();

const instructor1 = new Instructor("Bob", "bob@example.com", "I456");
instructor1.getDetails();
instructor1.assignGrade();