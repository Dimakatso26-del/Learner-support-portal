import { protectPage } from "./session.js";
import { watchAuthState } from "./auth.js";
import { request } from "./api.js";

protectPage("STUDENT");

function isOverdue(task) {
    if (task.completed) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate + "T00:00:00");

    return dueDate < today;
}

watchAuthState(async (user) => {
    if (!user) return;

    const displayName =
        user.displayName ||
        user.email ||
        "Student";

    document.getElementById("welcomeName").textContent =
        displayName;

    document.getElementById("userNameDisplay").textContent =
        displayName;

    try {
        const query =
            `&orderBy=${encodeURIComponent('"userId"')}` +
            `&equalTo=${encodeURIComponent(`"${user.uid}"`)}`;

        const data = await request(
            "GET",
            "tasks",
            undefined,
            query
        );

        const tasks = data
            ? Object.values(data)
            : [];

        const completedTasks =
            tasks.filter(task => task.completed).length;

        const outstandingTasks =
            tasks.filter(task => !task.completed).length;

        const overdueTasks =
            tasks.filter(task => isOverdue(task)).length;

        document.getElementById("totalTasks").textContent =
            tasks.length;

        document.getElementById("completedTasks").textContent =
            completedTasks;

        document.getElementById("outstandingTasks").textContent =
            outstandingTasks;

        document.getElementById("overdueTasks").textContent =
            overdueTasks;

        const recentTasks =
            document.getElementById("recentTasks");

        recentTasks.innerHTML = "";

        const outstanding = tasks.filter(
            task => !task.completed
        );

        if (outstanding.length === 0) {
            recentTasks.innerHTML =
                "<p>You have no outstanding tasks.</p>";
        } else {
            outstanding.slice(0, 5).forEach(task => {
                const item =
                    document.createElement("div");

                item.className = "task-item";

                item.innerHTML = `
                    <strong>${task.title}</strong>
                    <p>Due: ${task.dueDate}</p>
                `;

                recentTasks.appendChild(item);
            });
        }
    } catch (error) {
        console.error("Dashboard error:", error);
    }
});