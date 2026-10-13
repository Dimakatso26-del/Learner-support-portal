const tasks = [
    {
        title: "Project: JavaScript",
        status: "outstanding",
        priority: "Medium"
    },
    {
        title: "HTML Assignment",
        status: "completed",
        priority: "Low"
    },
    {
        title: "CSS Layout Task",
        status: "completed",
        priority: "Low"
    },
    {
        title: "Database Project",
        status: "outstanding",
        priority: "High"
    },
    {
        title: "React Portfolio",
        status: "outstanding",
        priority: "Medium"
    },
    {
        title: "Node.js API Task",
        status: "overdue",
        priority: "High"
    }
];

// Statistics
const totalTasks = tasks.length;
const completedTasks = tasks.filter(task => task.status === "completed").length;
const outstandingTasks = tasks.filter(task => task.status === "outstanding").length;
const overdueTasks = tasks.filter(task => task.status === "overdue").length;

// Display statistics
document.getElementById("totalTasks").textContent = totalTasks;
document.getElementById("completedTasks").textContent = completedTasks;
document.getElementById("outstandingTasks").textContent = outstandingTasks;
document.getElementById("overdueTasks").textContent = overdueTasks;

// Display outstanding tasks
const taskList = document.getElementById("taskList");

tasks
    .filter(task => task.status === "outstanding")
    .forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.title} (${task.priority})`;
        taskList.appendChild(li);
    });