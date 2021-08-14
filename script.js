// Set up questions (dummy for now and testing). Creating objects for the questions

let questions = [{
 questionTitle: "Section for question 1",
 answerChoices: ["a","b","c","d"],
 correctAnswer: "a"
}, 
{
  questionTitle: "Section for question 2",
  answerChoices: ["a", "b", "c", "d"],
  correctAnswer: "a"
 },
{
  questionTitle: "Section for question 3",
  answerChoices: ["a", "b", "c", "d"],
  correctAnswer: "a"
 },
{
  questionTitle: "Section for question 4",
  answerChoices: ["a", "b", "c", "d"],
  correctAnswer: "a"
 },
{
  questionTitle: "Section for question 5",
  answerChoices: ["a", "b", "c", "d"],
  correctAnswer: "a"
 },
]

// Set global variables - set score to 0 to start and 
let score = 0
let currentQuestion = 0; 
let timeLeft = ''
let timer = ''

let startQuizBtn = document.getElementById("startBtn")
let quizTimer = document.getElementById("timeLeft")
let quizBody = document.getElementById('quizBody')
let userInitials = document.getElementById('initials')
let submitScoreBtn = document.getElementById('submitScore')


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
  if (timeLeft <=0) {
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

 let quizContent = `
 <h2>Quiz Done!</h2>
 <h3> You had a score: ${score} of questions correct</h3>
 <input type="text" id="initials" placeholder="Type your initials here...">
 <button id="submitScore">Submit your score!</button>
 `;

 quizBody.innerHTML = quizContent;

}

// set scores on local storage -  add event listener instead
function submitScore() {
 localStorage.setItem("quizscore", score)
 localStorage.setItem("quizscorename", userInitials)
 getScore();
}



