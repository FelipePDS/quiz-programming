import { questions } from "./data.js";

let currentQuestionIndex = 0;
let userScore = 0;

function setUserScore(increaseUserScore) {
  increaseUserScore && userScore++;
}

function loadCurrentQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  document.querySelector('.question-number').innerHTML = currentQuestion.id;
  document.querySelector('.question-value').innerHTML = currentQuestion.value;

  const alternativesContainerDiv = document.querySelector('#alternatives-container');
  alternativesContainerDiv.innerHTML = '';

  for (let i in currentQuestion.alternatives) {
    const alternativeDiv = document.createElement('div');
    alternativeDiv.setAttribute('class', 'alternative center');

    const alternativeContentDiv = document.createElement('div');
    alternativeContentDiv.setAttribute('class', 'alternative-content center column');
    alternativeContentDiv.setAttribute('id', currentQuestion.alternatives[i].id);
    alternativeContentDiv.onclick = ({ currentTarget }) => {
      handleChosenAlternative(currentTarget.id);
    }

    const alternativeNumberSpan = document.createElement('span');
    alternativeNumberSpan.setAttribute('class', 'alternative-number center');
    alternativeNumberSpan.innerHTML = currentQuestion.alternatives[i].id;

    const alternativeValueP = document.createElement('p');
    alternativeValueP.setAttribute('class', 'alternative-value text-align-center');
    alternativeValueP.innerHTML = currentQuestion.alternatives[i].value;

    alternativesContainerDiv.appendChild(alternativeDiv);
    alternativeDiv.appendChild(alternativeContentDiv);
    alternativeContentDiv.appendChild(alternativeNumberSpan);
    alternativeContentDiv.appendChild(alternativeValueP);
  }

  document.querySelector('.user-score-value').innerHTML = `<b>${userScore} acertos</b> de ${currentQuestionIndex} questões`;
}

function showFinalScore(percentageOfCorrectAnswers, userWon) {
  const gamePageDiv = document.querySelector('#game-page');

  const finalScoreWindowDiv = document.createElement('div');
  finalScoreWindowDiv.setAttribute('class', 'final-score-window center column');

  const finalScoreContainerDiv = document.createElement('div');
  finalScoreContainerDiv.setAttribute('class', 'final-score-container center column');

  const titleH2 = document.createElement('h2');
  titleH2.setAttribute('class', 'title text-align-center');

  const finalScoreContentDiv = document.createElement('div');
  finalScoreContentDiv.setAttribute('class', 'final-score-content center column');

  const finalScoreValueP = document.createElement('p');
  finalScoreValueP.setAttribute('class', 'final-score-value');

  const homeButtonA = document.createElement('a');
  homeButtonA.setAttribute('class', 'home-button');
  homeButtonA.setAttribute('href', 'index.html');
  homeButtonA.innerHTML = 'Ínicio';

  gamePageDiv.appendChild(finalScoreWindowDiv);
  finalScoreWindowDiv.appendChild(finalScoreContainerDiv);
  finalScoreContainerDiv.appendChild(titleH2);
  finalScoreContainerDiv.appendChild(finalScoreContentDiv);
  finalScoreContentDiv.appendChild(finalScoreValueP);
  finalScoreContentDiv.appendChild(homeButtonA);

  finalScoreValueP.innerHTML = `Você acertou ${percentageOfCorrectAnswers * 100}% das questões.`;

  if (userWon) {
    titleH2.innerHTML = 'Você Ganhou';
    finalScoreValueP.innerHTML += ' Conseguiu mais do que os 70%! Parabéns 👍';
  } else {
    titleH2.innerHTML = 'Game Over';
    finalScoreValueP.innerHTML += ' Acerte 70% ou mais para ganhar! Volte ao início e tente novamente 👍';
  }
}

function endGame() {
  const percentageOfCorrectAnswers = userScore / questions.length;
  const userWon = percentageOfCorrectAnswers >= .7;

  showFinalScore(percentageOfCorrectAnswers, userWon);
}

function handleChosenAlternative(alternativeId) {
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.userAnswerId !== '') return;

  currentQuestion.userAnswerId = alternativeId;
  const alternativeIsCorrect = currentQuestion.userAnswerId == currentQuestion.correctAnswerId;
  setUserScore(alternativeIsCorrect);

  if (currentQuestionIndex >= questions.length - 1) {
    endGame();
    return;
  }

  currentQuestionIndex++;
  loadCurrentQuestion();
}

window.onload = loadCurrentQuestion();
