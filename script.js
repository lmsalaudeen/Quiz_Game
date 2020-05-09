// Variables
const welcomeElement = document.getElementById('welcome')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const endButton = document.getElementById('end-button')
const scoreButton = document.getElementById('score')
const feedback = document.getElementById('feedback')
let score = 0

const questions = [
  {
    question: 'Covid-19 is ',
    answers: [
      { ans: 'a virus', correct: true },
      { ans: 'a bacterium', correct: false },
      { ans: 'an insect', correct: false }
    ]
  },
  {
    question: 'Which of these is a foodborne pathogen?',
    answers: [
      { ans: 'Plasmodium', correct: false },
      { ans: 'Soldier ant', correct: false },
      { ans: 'Salmonella', correct: true },
    ]
  },
  {
    question: 'To prevent the spread of COVID-19, which of these should we do?',
    answers: [
      { ans: 'Stop 5G!', correct: false },
      { ans: 'Practice social distancing', correct: true },
      { ans: 'Go to Owanbe', correct: false }
    ]
  },
  {
    question: 'Which of these is your favourite living writer?',
    answers: [
      { ans: 'Toni Morrison', correct: false },
      {ans: 'Lucille Clifton', correct: false },
      { ans: 'Mojisola Salaudeen', correct: true }
    ]
  },
  {
    question: 'How long is the human gestational period',
    answers: [
      { ans: '50 weeks', correct: false },
      { ans: '40 weeks', correct: true },
      { ans: '55 weeks', correct: false }
    ]
  }
]

//let Questions, questionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  questionIndex++
  setNextQuestion()
})
endButton.addEventListener('click', printScore)

function startQuiz() {
  endButton.classList.add('hide')
  startButton.classList.add('hide')
  welcomeElement.classList.add('hide')
  Questions = questions.sort()
  questionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
function printScore() {
  reset()
  questionContainerElement.classList.add('hide')
  scoreButton.classList.add('hide')
  endButton.innerText = 'Score: ' + score + '/' + Questions.length
  feedback.classList.remove('hide')
}

function setNextQuestion() {
  reset()
  showQuestion(Questions[questionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.ans
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function reset() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  scoreButton.classList.remove('hide')
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    score++
  }
  
  scoreButton.innerText = 'Score: ' + score + '/' + Questions.length

  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (Questions.length > questionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    endButton.classList.remove('hide')

  }
  
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
