import { protectPage } from "./session.js";
import { watchAuthState } from "./auth.js";
import { request } from "./api.js";

protectPage("STUDENT");

const QUESTION_SECONDS = 30;
const MULTIPLIER = 2;
const PASSING_SCORE = 10;

const QUESTIONS = [
  {
    category: "JavaScript Basics",
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["var", "let", "static", "const"],
    answer: 3
  },
  {
    category: "JavaScript Basics",
    question: "What does the === operator check?",
    options: ["Value only", "Value and type", "Type only", "Memory address"],
    answer: 1
  },
  {
    category: "Arrays",
    question: "Which array method returns a new array of items that pass a test?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    answer: 2
  },
  {
    category: "Data Structures",
    question: "Which data structure operates on a First-In, First-Out (FIFO) principle?",
    options: ["Stack (LIFO)", "Queue (FIFO)", "Binary Search Tree", "Hash Table"],
    answer: 1
  },
  {
    category: "JSON",
    question: "What does JSON.stringify() do?",
    options: [
      "Parses a JSON string into an object",
      "Sorts the keys of an object",
      "Deletes an object",
      "Converts an object into a JSON string"
    ],
    answer: 3
  },
  {
    category: "REST",
    question: "Which HTTP method is normally used to create a new resource?",
    options: ["GET", "DELETE", "POST", "HEAD"],
    answer: 2
  },
  {
    category: "The DOM",
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Output Method",
      "Display Order Mode",
      "Digital Object Manager"
    ],
    answer: 0
  },
  {
    category: "JavaScript Basics",
    question: "What does typeof null return?",
    options: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
    answer: 1
  },
  {
    category: "Error Handling",
    question: "Which block always runs after try and catch, whether or not an error occurred?",
    options: ["catch", "throw", "finally", "return"],
    answer: 2
  },
  {
    category: "Timers",
    question: "What does setInterval() do?",
    options: [
      "Runs a function once after a delay",
      "Runs a function repeatedly at a fixed interval",
      "Stops a timer",
      "Pauses the page"
    ],
    answer: 1
  }
];

const els = {
  scoreButton: document.getElementById("scoreButton"),
  counter: document.getElementById("questionCounter"),
  category: document.getElementById("questionCategory"),
  progress: document.getElementById("progressBar"),
  timer: document.getElementById("timerText"),
  question: document.getElementById("questionText"),
  answers: document.getElementById("answersBox"),
  message: document.getElementById("gameMessage"),
  skip: document.getElementById("skipButton"),
  next: document.getElementById("nextButton"),
  leaderboard: document.getElementById("leaderboardList")
};

let currentUser = null;
let userName = "";
let current = 0;
let score = 0;
let correctCount = 0;
let locked = false;
let finished = false;
let secondsLeft = 0;
let timerId = null;
let startedAt = 0;
let started = false;

function updateTimerDisplay() {
  els.timer.textContent = `${secondsLeft} seconds remaining`;
  els.progress.style.display = "block";
  els.progress.style.transition = "width 1s linear";
  els.progress.style.width = `${(secondsLeft / QUESTION_SECONDS) * 100}%`;
}

function startTimer() {
  clearInterval(timerId);
  secondsLeft = QUESTION_SECONDS;
  updateTimerDisplay();

  timerId = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      clearInterval(timerId);
      handleTimeout();
    }
  }, 1000);
}

function markAnswers(chosenIndex) {
  const correctIndex = QUESTIONS[current].answer;
  [...els.answers.children].forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.style.backgroundColor = "#bbf7d0";
    if (index === chosenIndex && index !== correctIndex) {
      button.style.backgroundColor = "#fecaca";
    }
  });
}

function handleAnswer(index) {
  if (locked) return;
  locked = true;
  clearInterval(timerId);
  markAnswers(index);

  if (index === QUESTIONS[current].answer) {
    score += 1 * MULTIPLIER;
    correctCount++;
    els.message.textContent = "Correct!";
  } else {
    els.message.textContent = "Not quite. The correct answer is highlighted.";
  }

  els.scoreButton.textContent = `Score: ${score}`;
  els.next.disabled = false;
}

function handleTimeout() {
  if (locked) return;
  locked = true;
  markAnswers(-1);
  els.message.textContent = "Time is up!";
  els.next.disabled = false;
}

function showQuestion() {
  const q = QUESTIONS[current];
  locked = false;

  els.counter.textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
  els.category.textContent = `Category: ${q.category}`;
  els.question.textContent = q.question;
  els.scoreButton.textContent = `Score: ${score}`;
  els.message.textContent = "";
  els.next.disabled = true;

  els.answers.textContent = "";
  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${"ABCD"[index]}. ${option}`;
    button.addEventListener("click", () => handleAnswer(index));
    els.answers.appendChild(button);
  });

  startTimer();
}

function advance() {
  if (current + 1 >= QUESTIONS.length) {
    finish();
  } else {
    current++;
    showQuestion();
  }
}

async function saveScore(durationSeconds, passed) {
  els.message.textContent = "Saving your score...";
  try {
    await request("POST", "scores", {
      userId: currentUser.uid,
      userName,
      score,
      correctCount,
      duration: durationSeconds,
      passed,
      completedAt: new Date().toISOString()
    });
    els.message.textContent = "Score saved to the leaderboard.";
  } catch (error) {
    els.message.textContent = error.message;
  } finally {
    await loadLeaderboard();
  }
}

function finish() {
  finished = true;
  clearInterval(timerId);

  const durationSeconds = Math.round((Date.now() - startedAt) / 1000);
  const passed = score >= PASSING_SCORE;
  const maxScore = QUESTIONS.length * MULTIPLIER;

  els.counter.textContent = "Challenge complete";
  els.category.textContent = "";
  els.question.textContent =
    `${passed ? "Quiz Passed" : "Quiz Not Passed"}: you scored ${score} out of ${maxScore} ` +
    `(${correctCount} of ${QUESTIONS.length} correct).`;
  els.answers.hidden = true;
  els.skip.hidden = true;
  els.timer.textContent = "";
  els.progress.style.width = "0%";
  els.next.textContent = "PLAY AGAIN";
  els.next.disabled = false;

  saveScore(durationSeconds, passed);
}

function startGame() {
  current = 0;
  score = 0;
  correctCount = 0;
  finished = false;
  startedAt = Date.now();

  els.answers.hidden = false;
  els.skip.hidden = false;
  els.next.textContent = "NEXT QUESTION";
  showQuestion();
}

async function loadLeaderboard() {
  try {
    const query = `&orderBy=${encodeURIComponent('"score"')}&limitToLast=20`;
    const data = await request("GET", "scores", undefined, query);
    const entries = data ? Object.values(data) : [];

    const best = new Map();
    entries.forEach((entry) => {
      const previous = best.get(entry.userId);
      if (!previous || entry.score > previous.score) best.set(entry.userId, entry);
    });

    const top = [...best.values()].sort((a, b) => b.score - a.score).slice(0, 5);

    els.leaderboard.textContent = "";
    if (top.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "No scores yet. Be the first!";
      els.leaderboard.appendChild(empty);
      return;
    }

    top.forEach((entry) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = entry.userName + (entry.userId === currentUser.uid ? " (You)" : "");
      const points = document.createElement("b");
      points.textContent = entry.score;
      item.append(name, points);
      els.leaderboard.appendChild(item);
    });
  } catch (error) {
    els.leaderboard.textContent = "";
    const item = document.createElement("li");
    item.textContent = error.message;
    els.leaderboard.appendChild(item);
  }
}

els.skip.addEventListener("click", () => {
  if (finished) return;
  clearInterval(timerId);
  advance();
});

els.next.addEventListener("click", () => {
  if (finished) {
    startGame();
  } else {
    advance();
  }
});

watchAuthState(async (user) => {
  if (!user || started) return;
  started = true;
  currentUser = user;

  try {
    const profile = await request("GET", `users/${user.uid}`);
    if (profile) userName = `${profile.firstName} ${profile.lastName || ""}`.trim();
  } catch (error) {
    console.error("Could not load profile:", error);
  }

  loadLeaderboard();
  startGame();
});