https://www.figma.com/deck/Xrjp6PJ8iaAo8PBzafxz2K/SkillsTrack-Student-Support-Wireframe?node-id=8-139&t=5Y4K2ql571gMOZ8J-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1

# 1. Event Listeners

## Add Task Button

    const addTaskButton = document.getElementById('addTaskBtn');

    addTaskButton.addEventListener('click', () => {
      createTask();
    });

### Purpose:
- Responds when a learner clicks Add Task.
- Dynamically creates a new task without refreshing the page

## Search Learners

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', (event) => {
      filterLearners(event.target.value);
    });

### Purpose:
- Updates the learner list as the assessor types.
- Provides real-time searching.

Booking Confirmation

  document
    .getElementById('confirmBookingBtn')
    .addEventListener('click', confirmBooking);

### Purpose:
- Handles booking confirmations from the assessor dashboard.


# 2. DOM Creation

## Creating a Task Card

    function createTask(taskName) {
      const taskContainer =
        document.getElementById('taskContainer');

      const taskCard = document.createElement('div');

      taskCard.classList.add('task-card');

      taskCard.textContent = taskName;

      taskContainer.appendChild(taskCard);
    }

### Result

Before Click:
  - Tasks:
After Click:
  - Tasks:
  - Complete Assessment 1


## Update Task Status
 
    function markTaskComplete(taskId) {
      const taskElement =
        document.getElementById(taskId);

      taskElement.textContent =
        'Completed';

      taskElement.classList.add('completed

### Result

Before:
  - Status: Outstanding
After:
  - Status: Completed

## Delete Task

    function deleteTask(taskId) {
      const taskElement =
        document.getElementById(taskId);

      taskElement.remove();
    }

### Result

Before:
  - Task 1
  - Task 2
  - Task 3

After:
  - Task 1
  - Task 3

# 3. Booking History

    function displayBookings(bookings) {
      const bookingList =
        document.getElementById('bookingList');

      bookingList.innerHTML = '';

      bookings.forEach((booking) => {
        const item =
          document.createElement('li');

        item.textContent =
          `${booking.topic} - ${booking.date}`;

        bookingList.appendChild(item);
      });
    }

## Purpose:
- Refreshes the booking history whenever a booking is added, edited, or cancelled.
