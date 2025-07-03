const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hyperloop Machine Language",
      "Hyper Text Markdown Language",
      "None of the above"
    ],
    correct: "Hypertext Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.innerText = current.question;
  questionNumber.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
  
  optionsEl.innerHTML = "";
  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "list-group-item list-group-item-action";
    btn.innerHTML = `<i class="bi bi-circle me-2"></i>${option}`;
    btn.onclick = () => selectAnswer(option, current.correct);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selected, correct) {
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    const btnText = btn.innerText.trim();
    if (btnText === correct) {
      btn.classList.add("list-group-item-success");
      btn.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${btnText}`;
    }
    if (btnText === selected && selected !== correct) {
      btn.classList.add("list-group-item-danger");
      btn.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i>${btnText}`;
    }
  });

  if (selected === correct) {
    showAlert("Correct! Good job.", "success");
    score++;
  } else {
    showAlert(`Wrong! Correct answer is "${correct}"`, "danger");
  }
}

function showAlert(message, type) {
  resultEl.className = `alert alert-${type}`;
  resultEl.innerHTML = type === "success"
    ? `<i class="bi bi-check-circle-fill me-2"></i>${message}`
    : `<i class="bi bi-x-circle-fill me-2"></i>${message}`;
  resultEl.classList.remove("d-none");

  // Auto dismiss after 3 seconds
  setTimeout(() => {
    resultEl.classList.add("d-none");
  }, 5000);
}


nextBtn.addEventListener("click", () => {
  resultEl.classList.add("d-none");
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = `
    <div class="alert alert-info text-center">
      <i class="bi bi-award-fill text-success fs-3 mb-2"></i><br>
      Quiz Completed!<br>
      Your score: <strong>${score} / ${quizData.length}</strong>
    </div>
    <div class="text-center">
      <button onclick="location.reload()" class="btn btn-success">
        <i class="bi bi-arrow-repeat me-1"></i> Restart Quiz
      </button>
    </div>
  `;
}

loadQuestion();
