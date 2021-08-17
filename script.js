// Set up questions (dummy for now and testing). Creating objects for the questions

let questions = [{
  title: "Question 1",
  choices: ["a", "b", "c", "d"],
  answer: "a"
},
{
  title: "Question 2",
  choices: ["a", "b", "c", "d"],
  answer: "b"
},
{
  title: "Question 3",
  choices: ["a", "b", "c", "d"],
  answer: "c"
},
{
  title: "Question 4",
  choices: ["a", "b", "c", "d"],
  answer: "d"
},
{
  title: "Question 5",
  choices: ["a", "b", "c", "d"],
  answer: "a"
},
]

// Set global variables for initialization
let score = 0
let currentQuestion = -1;
let timeLeft = ''
let timer = ''

let startQuizBtn = document.getElementById("startBtn")

let quizTimer = document.getElementById("timeLeft")
let quizBody = document.getElementById('quizBody')


// function so that once the user clicks start to start the quiz...

function startQuiz() {

  // set the time left to 75 seconds to start
  timeLeft = 75;
  // put the timer (second countdown) on the element timeLeft in the navbar so user can see clock count
  quizTimer.innerHTML = timeLeft;

  // set the timer to a setInterval to update timeLeft at every interval (seconds)
  timer = setInterval(() => {
    // reduce time left by 1 second
    timeLeft--;
    // add the time left (seconds) to the timeLeft element on the html page so user can see clock count
    quizTimer.innerHTML = `Time Left: ${timeLeft}`;

    // if the timeLeft is less than or equal to 0 then clear the timer and call the function to end the quiz
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  // call function to show the next question
  nextQuestion()
}


// function for the end of the quiz
function endQuiz() {
  clearInterval(timer);

  let questionsLength = questions.length

  let quizContent = `
 <h2>Quiz Done!</h2>
 <h3> You had a score: ${score} answers correct out of a total of ${questionsLength} questions</h3>
 <input type="text" id="initials" placeholder="Type your initials here...">
 <button class="submitScoreBtn">Submit your score!</button>
 `;

  quizBody.innerHTML = quizContent;

}

function submitScore() {

  localStorage.setItem('quizscore', score)
  localStorage.setItem('quizscoreInitials', document.getElementById('initials').value)

  if (document.getElementById('initials').value === '') {
    return false;
  } else {
    let savedHighScores = JSON.parse(localStorage.getItem('savedHighScores')) || [];
    let userInitials = document.getElementById('initials').value
    let currentHighScore = {
      name: userInitials,
      score: score
    };
    savedHighScores.push(currentHighScore);
    localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores))
  }
  getScore()
}

function getScore() {
  let quizContent = `
  <h2>` + localStorage.getItem('quizscoreInitials') + ` : score is...</h2>
  <h1>` + localStorage.getItem('quizscore') + `</h1><br>
  
  <button class="clearScoreBtn">Clear Score!</button>
  <button class="resetQuizBtn">Play Again!</button>
  <button class="viewScoresBtn">View Scores</button>`

  quizBody.innerHTML = quizContent;
}

function resetQuiz() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;
  // quiztimer.innerHTML = timeLeft;

  let quizBodyStart = `
  <div id="quizBody">
   <h1>
    Welcome to the Quiz!
   </h1>
   <button class="startBtnReplay">Start</button>
  </div>
  `

  document.getElementById('quizBody').innerHTML = quizBodyStart

}

function viewScoreBoard() {

  let quizcontent = `
  <div class="container highScoreContainer"
    <div class= "row">
      <div class="col-sm">
        Initials
        <div id="highScoreInitialsDisplay"></div>
      </div>
      <div class="col-sm">
        Score
        <div id="highScoreScoreDisplay"></div>
      </div>
    </div>

  </div>
  `

  quizBody.innerHTML = quizcontent

  highScoreInitialsDisplay = document.getElementById('highScoreInitialsDisplay')
  highScoreScoreDisplay = document.getElementById('highScoreScoreDisplay')

  highScoreInitialsDisplay.innerHTML = '';
  highScoreScoreDisplay.innerHTML = '';

  let scoreBoard = JSON.parse(localStorage.getItem("savedHighScores")) || []
  for (let i = 0; i < scoreBoard.length; i++) {
    let nameSpan = document.createElement('li')
    let newScore = document.createElement('li')

    nameSpan.textContent = scoreBoard[i].name;
    newScore.textContent = scoreBoard[i].score;

    highScoreInitialsDisplay.appendChild(nameSpan);
    highScoreScoreDisplay.appendChild(newScore)
  }
}


function incorrect() {
  timeLeft -= 15;
  alert("Incorrect! 15 Seconds removed!")
  nextQuestion();
}

function correct() {
  score += 1;
  alert("Correct!")
  nextQuestion();
}


function nextQuestion() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endQuiz();
    return;
  }

  let quizContent = `<h2>` + questions[currentQuestion].title + `</h2>`

  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    let buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[i]);

    if (questions[currentQuestion].choices[i] === questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()")
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
  }
  document.getElementById("quizBody").innerHTML = quizContent
}


startQuizBtn.addEventListener('click', startQuiz)


document.addEventListener('click', event => {
  if (event.target.classList.contains('submitScoreBtn')) {
    submitScore();
  } else if (event.target.classList.contains('clearScoreBtn')) {
    localStorage.setItem('quizscoreInitials', '')
    localStorage.setItem('quizscore', '')
  } else if (event.target.classList.contains('resetQuizBtn')) {
    resetQuiz();
  } else if (event.target.classList.contains('startBtnReplay')) {
    startQuiz();
  } else if (event.target.classList.contains('viewScoresBtn')) {
    viewScoreBoard();
  }
})





