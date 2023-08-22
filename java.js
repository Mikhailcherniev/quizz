const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreImageElement = document.getElementById('score-image');
const restartContainer = document.getElementById('restart-container');
const restartButton = document.getElementById('restart-button');

const questions = [
  {
    question: 'Qual é a fórmula química da água?',
    image: 'ciencia.png',
    options: ['H2O', 'CO2', 'NaCl', 'C6H12O6'],
    answer: 0
  },
  {
    question: 'Quem foi o autor da obra "Dom Casmurro"?',
    image: 'machado.png',
    options: ['Machado de Assis', 'José de Alencar', 'Eça de Queirós', 'Lima Barreto'],
    answer: 0
  },

  {
    question: 'Quem invadiu a Polonia em 1939?',
    image: 'funny.jpg',  //alemanha
    options: ['Cassio', 'Adolf Hitler', 'Gilberto Gil', 'Joseph Stalin'],
    answer: 1
  },

  {
    question: 'quantos presidentesteve a inglaterra?',
    image: 'reinoUnido.jpg',
    options: ['10', '25', '40', '0'],
    answer: 3
  },


  {
    question: 'Em qual periodo ocorreu a guerra fria?',
    image: 'guerraFria.jpg',
    options: ['1930-2020', '1919-1945', '1945-1991', '2010-hoje'],
    answer: 2
  },




];

let currentQuestionIndex = 0;
let attempts = 0;
let errors = 0;
let score = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  const imageElement = document.createElement('img');
  imageElement.src = currentQuestion.image;
  imageElement.alt = 'Imagem da pergunta';
  optionsElement.innerHTML = '';
  optionsElement.appendChild(imageElement);

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(index));
    optionsElement.appendChild(button);
  });

  resultElement.textContent = '';
}

function showResultImage(score) {
  if (score >= 20) {
    scoreImageElement.innerHTML = '<img src="porco.png" alt="Pontuação Alta">';
  } else {
    scoreImageElement.innerHTML = '<img src="lula.jpg" alt="Pontuação Baixa">';
  }
  scoreImageElement.style.display = 'block';
}


function checkAnswer(selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (selectedOption === correctAnswer) {
    score += 10;
    resultElement.textContent = 'Resposta correta! Pontuação: ' + score;
    currentQuestionIndex++;
    errors = 0;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      questionElement.textContent = 'Quiz completo! Sua pontuação final é: ' + score;
      optionsElement.innerHTML = '';
      restartContainer.style.display = 'block';
    }
  } else {
    errors++;
    if (errors < 2) {
      resultElement.textContent = 'Resposta incorreta. Tente novamente!';
    } else {
      resultElement.textContent = 'Resposta incorreta. Fim do quiz. Sua pontuação é: ' + score;
      optionsElement.innerHTML = '';
      restartContainer.style.display = 'block';
      errors = 0;
      currentQuestionIndex = 0;
      score = 0;
    }
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  attempts = 0;
  errors = 0;
  score = 0;
  restartContainer.style.display = 'none';
  showQuestion();
}

restartButton.addEventListener('click', restartQuiz);

showQuestion();