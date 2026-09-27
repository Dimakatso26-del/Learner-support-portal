export class User {
  constructor(uid, firstName, lastName, email, role) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  toJSON() {
    return {
      uid: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role
    };
  }
}

export class Learner extends User {
  constructor(uid, firstName, lastName, email, idNumber, contactNumber) {
    super(uid, firstName, lastName, email, "STUDENT");
    this.idNumber = idNumber;
    this.contactNumber = contactNumber;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getCompletedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  getOutstandingTasks() {
    return this.tasks.filter((task) => !task.completed);
  }

  getOverdueTasks() {
    const today = new Date();
    return this.getOutstandingTasks().filter(
      (task) => new Date(task.dueDate) < today
    );
  }

  getCompletionPercentage() {
    if (this.tasks.length === 0) return 0;
    return Math.round(
      (this.getCompletedTasks().length / this.tasks.length) * 100
    );
  }

  toJSON() {
    return {
      ...super.toJSON(),
      idNumber: this.idNumber,
      contactNumber: this.contactNumber
    };
  }
}

export class Assessor extends User {
  constructor(uid, firstName, lastName, email, contactNumber) {
    super(uid, firstName, lastName, email, "ASSESSOR");
    this.contactNumber = contactNumber;
    this.assignedLearners = [];
  }

  assignLearner(learner) {
    this.assignedLearners.push(learner);
  }

  getLearnersAtRisk() {
    return this.assignedLearners.filter(
      (learner) => learner.getCompletionPercentage() < 50
    );
  }

  getPendingBookingsCount(bookings) {
    return bookings.filter((booking) => booking.status === "pending").length;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      contactNumber: this.contactNumber
    };
  }
}

export class Task {
  constructor(id, userId, title, category, dueDate, priority = "medium") {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.category = category;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }

  markComplete() {
    this.completed = true;
  }

  markIncomplete() {
    this.completed = false;
  }

  isOverdue() {
    return !this.completed && new Date(this.dueDate) < new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      category: this.category,
      dueDate: this.dueDate,
      priority: this.priority,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}

export function createUserFromProfile(uid, profile) {
  if (profile.role === "STUDENT") {
    return new Learner(
      uid,
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.idNumber,
      profile.contactNumber
    );
  }

  if (profile.role === "ASSESSOR") {
    return new Assessor(
      uid,
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.contactNumber
    );
  }

  throw new Error(`Unknown role: ${profile.role}`);
}
