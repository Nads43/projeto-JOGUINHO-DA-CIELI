// Perguntas totalmente focadas no conteúdo de Matemática do 6º Ano
const questions = [
  {
    question: "Qual é o resultado da expressão: 15 + 5 × 2?",
    options: ["40", "25", "30", "20"],
    answer: 1 // Resposta correta: 25 (multiplicação é feita antes)
  },
  {
    question: "Qual das frações abaixo é equivalente a 1/2 (um meio)?",
    options: ["2/5", "3/4", "4/8", "1/3"],
    answer: 2 // Resposta correta: 4/8
  },
  {
    question: "Um quadrado tem lado medindo 6 cm. Qual é o seu perímetro?",
    options: ["36 cm", "24 cm", "12 cm", "18 cm"],
    answer: 1 // Resposta correta: 6x4 = 24 cm
  },
  {
    question: "Qual é o único número primo que também é um número par?",
    options: ["0", "1", "2", "4"],
    answer: 2 // Resposta correta: 2
  },
  {
    question: "Se você tem R$ 50,00 e compra 3 cadernos de R$ 12,00 cada, quanto sobra de troco?",
    options: ["R$ 14,00", "R$ 16,00", "R$ 24,00", "R$ 36,00"],
    answer: 0 // Resposta correta: 50 - 36 = 14
  }
];

let currentQuestionIndex = 0;
let score = 0;
let lives = 3;

// Mapeamento de elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives-container');

const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');

// Eventos de clique
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

function startGame() {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  lives = 3;
  updateHUD();
  showQuestion();
}

function showQuestion() {
  resetState();
  let q = questions[currentQuestionIndex];
  questionTitle.innerText = q.question;

  q.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.innerText = optionText;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

function resetState() {
  optionsContainer.innerHTML = '';
}

function selectOption(selectedIndex, button) {
  const correctIndex = questions[currentQuestionIndex].answer;
  const buttons = optionsContainer.querySelectorAll('.option-btn');

  // Bloqueia todos os botões após a resposta
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    button.classList.add('correct');
    score += 10;
  } else {
    button.classList.add('incorrect');
    buttons[correctIndex].classList.add('correct'); // Destaca a opção correta
    lives--;
  }

  updateHUD();

  setTimeout(() => {
    currentQuestionIndex++;
    if (lives > 0 && currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1200);
}

function updateHUD() {
  scoreDisplay.innerText = score;
  let hearts = '';
  for (let i = 0; i < lives; i++) {
    hearts += '❤️ ';
  }
  livesDisplay.innerText = `Vidas: ${hearts || '❌'}`;
}

function endGame() {
  quizScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');

  if (lives > 0) {
    endTitle.innerText = "🏆 Mestre da Matemática!";
    endMessage.innerText = `Parabéns! Você resolveu os desafios e fez ${score} pontos!`;
  } else {
    endTitle.innerText = "💥 Tente Novamente!";
    endMessage.innerText = `Suas vidas acabaram. Você marcou ${score} pontos. Treine mais um pouco!`;
  }
}

function restartGame() {
  endScreen.classList.add('hidden');
  startGame();
}
