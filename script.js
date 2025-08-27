const questions = [
  {
    question: "What do you light first in a dark room?",
    options: ["Candle", "Fireplace", "Lamp", "Match"],
    correct: "Match"
  },
  {
    question: "5 machines make 5 gadgets in 5 min. 100 machines make 100 gadgets in…",
    options: ["1 min", "5 min", "20 min", "100 min"],
    correct: "5 min"
  },
  {
    question: "He shaves daily but has a beard. Who?",
    options: ["Soldier", "Actor", "Barber", "Farmer"],
    correct: "Barber"
  },
  {
    question: "Two fathers and two sons eat 3 apples—how?",
    options: ["Twins", "Triplets", "Three people: grandpa, dad, son", "Illusion"],
    correct: "Three people: grandpa, dad, son"
  },
  {
    question: "What weighs more?",
    options: ["1 kg bricks", "1 kg feathers", "Bricks by volume", "Same weight"],
    correct: "Same weight"
  },
  {
    question: "Before it was discovered, tallest mountain?",
    options: ["K2", "Denali", "Everest", "Kilimanjaro"],
    correct: "Everest"
  },
  {
    question: "I speak without a mouth.",
    options: ["Wind", "Whisper", "Echo", "Radio"],
    correct: "Echo"
  },
  {
    question: "If you have me, you share me; if you share me, you lose me.",
    options: ["Money", "Secret", "Time", "Idea"],
    correct: "Secret"
  },
  {
    question: "The more you take, the more you leave.",
    options: ["Memories", "Steps", "Stones", "Notes"],
    correct: "Steps"
  },
  {
    question: "Bat + ball = $1.10; bat costs $1 more. Ball costs…",
    options: ["$0.10", "$0.01", "$0.05", "$0.02"],
    correct: "$0.05"
  }
];

let currentQuestion = parseInt(localStorage.getItem("currentQuestion")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let answered = false;

const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};

const questionText = document.getElementById("questionText");
const answers = [
  document.getElementById("answerA"),
  document.getElementById("answerB"),
  document.getElementById("answerC"),
  document.getElementById("answerD")
];
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const restartBtn = document.getElementById("restartBtn");
const questionNumber = document.getElementById("questionNumber");

scoreDisplay.textContent = score;
highScoreDisplay.textContent = highScore;

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  answered = false;

  answers.forEach((answer, i) => {
    const span = answer.querySelector("span");
    span.textContent = q.options[i];
    answer.classList.remove("bg-green-400", "bg-red-400");
    answer.classList.add("bg-[#EDCBF6]");
    answer.onclick = () => {
      if (!answered && !savedAnswers[currentQuestion]) {
        selectAnswer(q.options[i], answer);
      }
    };
  });


  if (savedAnswers[currentQuestion]) {
    answered = true;
    const chosen = savedAnswers[currentQuestion];
    answers.forEach(a => {
      const text = a.querySelector("span").textContent;
      if (text === chosen) {
        if (text === q.correct) {
          a.classList.remove("bg-[#EDCBF6]");
          a.classList.add("bg-green-400");
        } else {
          a.classList.remove("bg-[#EDCBF6]");
          a.classList.add("bg-red-400");
        }
      }
      if (text === q.correct) {
        a.classList.remove("bg-[#EDCBF6]");
        a.classList.add("bg-green-400");
      }
    });
  }
}

function selectAnswer(option, answerDiv) {
  const q = questions[currentQuestion];
  answered = true;
  savedAnswers[currentQuestion] = option;
  localStorage.setItem("answers", JSON.stringify(savedAnswers));

  if (option === q.correct) {
    answerDiv.classList.remove("bg-[#EDCBF6]");
    answerDiv.classList.add("bg-green-400");
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
    }
  } else {
    answerDiv.classList.remove("bg-[#EDCBF6]");
    answerDiv.classList.add("bg-red-400");
    answers.forEach(a => {
      if (a.querySelector("span").textContent === q.correct) {
        a.classList.remove("bg-[#EDCBF6]");
        a.classList.add("bg-green-400");
      }
    });
  }

  localStorage.setItem("score", score);
  localStorage.setItem("highScore", highScore);
}

nextBtn.addEventListener("click", () => {
  if (!answered && !savedAnswers[currentQuestion]) {
    alert("Please select an answer before moving on!");
    return;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    localStorage.setItem("currentQuestion", currentQuestion);
    loadQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    localStorage.setItem("currentQuestion", currentQuestion);
    loadQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  answered = false;
  localStorage.clear();
  scoreDisplay.textContent = score;
  loadQuestion();
});

loadQuestion();
