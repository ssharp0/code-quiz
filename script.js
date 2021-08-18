// Set up questions
let questions = [{
  title: "Which of the following types of variables is visible everywhere in JavaScript code?",
  choices: ["Local Variable", "Global Variable", "Both Local & Global Variables", "None of these"],
  answer: "Global Variable"
},
{
  title: "Which of the following function of String object extracts section of a string and returns a new string?",
  choices: ["slice()", "search()", "match()", "replace()"],
  answer: "slice()"
},
{
  title: "Inside which HTML element tag do we put the JavaScript?",
  choices: ["js", "script", "javascript", "scripting"],
  answer: "script"
},
{
  title: "Is Javascript a case-sensitive language?",
  choices: ["Yes", "No"],
  answer: "Yes"
},
{
  title: "Using ___ statement is how you test for a specific condition:",
  choices: ["Switch", "For", "If", "Select"],
  answer: "If"
},
]

// global variables for initialization - variables for elements on html for reference throughout
let score = 0
let currentQuestion = -1;
let timeLeft = ''
let timer = ''
let startQuizBtn = document.getElementById("startBtn")
let viewScoresNavBtn = document.getElementById('viewScoresNavBtn')
let quizTimer = document.getElementById("timeLeft")
let quizBody = document.getElementById('quizBody')


// function to start the quiz
function startQuiz() {

  // set the timeLeft to 75 seconds to start and show the timer (seconds countdown) on the navbar so it can be seen
  timeLeft = 75;
  quizTimer.innerHTML = timeLeft;

  // set the timer to a setInterval to update timeLeft at every interval (seconds) - and reduce the timeLeft by one second and add the time left (seconds) to the timeLeft element on the html page so user can see clock count by each second
  timer = setInterval(() => {
    timeLeft--;
    quizTimer.innerHTML = `${timeLeft}`;

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
  // clear the timer and determine the questions length for the notification to user (number correct vs total questions)
  clearInterval(timer);
  let questionsLength = questions.length

  // add html elements to display in the quizBody element on html with results of the quiz, asking for user input for their initials, and a button to submit their score
  let quizContentResults = `
  <form>
    <div class="form-group">
      <h2>Quiz Finished!</h2>
      <p> You answered ${score} correctly out of a total of ${questionsLength} questions</p>
      <input type="text" class="form-control" id="initials" placeholder="Initials here...">
      <button type="button" class="btn submitScoreBtn">Submit your score!</button>
    </div>
  </form>
 `;
  quizBody.innerHTML = quizContentResults;
}


// function to submit the initials and score to local storage
function submitScore() {

  // if statement to check if initials are not blank (if blank ask user to re-enter) - if valid then add/push the user score and user initials to the local storage array of savedHighScores (by parsing and setting values as a string so it can be stored/retrieved)
  if (document.getElementById('initials').value === '') {
    alert("Please enter initials to submit score")
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

    // set the local storage for the quiz score as well as the user initials entered at the end of the quiz for current quiz
    localStorage.setItem('quizscore', score)
    localStorage.setItem('quizscoreInitials', document.getElementById('initials').value)
  }
  // call the function to view the score board
  viewScoreBoard();
}


// function to reset the quiz
function resetQuiz() {

  // clear the timer and set the score/time left to 0 and reset current question (-1 so it starts correctly). Show timeLeft on the navbar (0)
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  // add html elements so user can replay the quiz (with replay button to retake quiz) by placing the new elements in the quizBody html
  let quizBodyStart = `
  <div id="quizBody">
   <h1>
    Welcome to the Quiz!
   </h1>
   <button type="button" class="btn startBtnReplay">Start</button>
  </div>
  `
  quizBody.innerHTML = quizBodyStart
}


// function to view the score board (local storage of user initials and scores)
function viewScoreBoard() {

  // add html elements so user can view the initials and scores from local storage with buttons to clear the scores and retake the quiz
  let scorecontent = `
  <div class="container highScoreContainer">
    <div class= "row">
      <div class="col-sm">
        <strong>Initials</strong>
        <div id="highScoreInitialsDisplay"></div>
      </div>
      <div class="col-sm">
        <strong>Score</strong>
        <div id="highScoreScoreDisplay"></div>
      </div>
    </div>
  </div>
  <hr>
  <button type="button" class="btn clearScoreBtn">Clear Scores!</button>
  <button type="button" class="btn resetQuizBtn">Retake Quiz!</button>
  <hr>
  `
  // set the score content to the quizBody html so it can be viewed and grab the new elements from the score content and set as variables/blank so it can be filled in
  quizBody.innerHTML = scorecontent

  highScoreInitialsDisplay = document.getElementById('highScoreInitialsDisplay')
  highScoreScoreDisplay = document.getElementById('highScoreScoreDisplay')

  highScoreInitialsDisplay.innerHTML = '';
  highScoreScoreDisplay.innerHTML = '';

  // parse/get the saved high scores from the local storage array and loop through each initials/score to create a list item and append to the scoreboard so it can be viewed as a list
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

// function to clear the scoreboard (clear local storage) and call the function to view the scoreboard (refresh)
function clearScoreBoard() {
  window.localStorage.clear()
  viewScoreBoard();
  localStorage.setItem('quizscoreInitials', '')
  localStorage.setItem('quizscore', '')
}

// function for incorrect answers - will reduce 15 seconds off of the timeLeft and alert the user it's an incorrect response, and will call the function for the next question
function incorrect() {
  timeLeft -= 15;
  alert("Incorrect! 15 Seconds removed!")
  nextQuestion();
}


// function for correct answers - it will add 1 to the score and alert the user the answer is correct, and will call the function for the next question
function correct() {
  score += 1;
  alert("Correct!")
  nextQuestion();
}


// function to cycle through the questions
function nextQuestion() {
  currentQuestion++;

  // if the current question is greater than the total number of the questions (less 1) then call the function to end the quiz
  if (currentQuestion > questions.length - 1) {
    endQuiz();
    return;
  }

  // create element so that the question is shown
  let quizContentQuestions = `<h2>` + questions[currentQuestion].title + `</h2>`

  // for loop to cycle through the buttons of current question choices for the current question (replacing with the actual question choices from defined variables)
  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    let buttonCycle = "<button onclick=\"[ANSWER]\">[QUESTION_CHOICE]</button>";
    buttonCycle = buttonCycle.replace("[QUESTION_CHOICE]", questions[currentQuestion].choices[i]);

    // if the user selected current question choice is equal to the current question answer then call the correct function, else if the user selected current question choice is not equal to the current question answer then call the incorrect function. Continue to cycle through questions until all questions have been answered
    if (questions[currentQuestion].choices[i] === questions[currentQuestion].answer) {
      buttonCycle = buttonCycle.replace("[ANSWER]", "correct()")
    } else {
      buttonCycle = buttonCycle.replace("[ANSWER]", "incorrect()");
    }
    quizContentQuestions += buttonCycle
  }
  // show the quiz content questions/choices in the quizBody html
  quizBody.innerHTML = quizContentQuestions
}

// when the startQuizBtn is clicked then call the function to start the quiz
startQuizBtn.addEventListener('click', event => {
  event.preventDefault()
  startQuiz();
})

// when the viewScoresNavBtn is clicked then call the function to view the scores (initials/scores)
viewScoresNavBtn.addEventListener('click', event => {
  event.preventDefault()
  viewScoreBoard();
})

// global event listeners
document.addEventListener('click', event => {
  // if the class contains submitScoreBtn then call the function to submit the score
  if (event.target.classList.contains('submitScoreBtn')) {
    submitScore();
  // else if the class contains clearScoreBtn then call the function to clear the score board
  } else if (event.target.classList.contains('clearScoreBtn')) {
    clearScoreBoard();
  // else if the class contains resetQuizBtn then call the function to reset the quiz
  } else if (event.target.classList.contains('resetQuizBtn')) {
    resetQuiz();
  // else if the class contains startBtnReplay then call the function to start the quiz (again)
  } else if (event.target.classList.contains('startBtnReplay')) {
    startQuiz();
  }
})





