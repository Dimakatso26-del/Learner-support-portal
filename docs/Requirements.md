User Story 1 Requirements
//Given i am on the registration page, when i enter valid email + password, then a new user account is created in firebase authentication
//Given i enter invalid details, when i submit, then i see error message
//Given i am registered, when i sign in,then i am re-directed to the dashboard

User Story 2 Requirements
//Given i am on the dashboard, when i fill the "Add Task" form and click save, then the task is stored in firebase realtime database
//Given i submit with emty title, when i click save, then i see validation error
//Given  the task is saved, when i return to dashboard, then i see the new task in my list

User Story 3 Requirements
//Given i have tasks, when i load the dashboard, then i see total tasks, completed tasks and outstanding tasks
//Given tasks are completed or pending, when dashboard loads, then progress % is calculated using completed/total * 100
//Given no tasks exist, when dashboard loads, then progress shows 0%

User Story 4 Requirements
//Given i click "Mark Complete" on a task, when confirmed, then the task status updates to Completed: true in firebase
//Given i click "Delete" on a task, when i confirm in the dialog, then the task is removed from firebase and the UI
//Given i edit a task, when i save changes, then the updated data is reflected immediately

User Story 5 Requirements
//Given i fill the booking form with topic + date, when i submit, then the booking is saved to firebase with status "Pending"
//Given i submit invalid date, when i click submit, then i see validation error
//Given booking is successful, when i submit, then i see a success message

User Story 6 Requirements
//Given i type in the search bar, when i press enter, then only tasks matching the keyword are displayed
//Given i select "Completed" filter, when applied, then only completed tasks show
//Given i choose "Sort by Due Date", when selected then tasks are re-ordered using array sort()