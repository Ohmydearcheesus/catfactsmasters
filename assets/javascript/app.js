// Where the questions and answers live (~20?)
var questionsList = [
  {
    question: "red is red",
    answer: true,
    explanation: "red will always be red!"
  },
  {
    question: "yellow is orange",
    answer: false,
    explanation: "yellow will never be orange"
  }
];

// Functions the game will use
function write() {
  var i = random();
  questionPasser = questionsList[i];
  $("#question").append(questionPasser.question);
  usedQuestions.push(questionPasser);
  questionsList.splice(i, 1);
  quizState = 1;
}

// Global variables

var usedQuestions = [];

var questionTimer;
var questionPasser = "";
var quizState = 0;
// var gameState = 0

// RNGeezus
function random() {
  return Math.floor(Math.random() * questionsList.length);
}

// When the DOM loads....
// Show the title screen, and offer pressing anywhere on the screen to start the game
// When clicked, game starts

// Onclick event for start of game and starting a new question
$("#question").on("click", function() {
  // Check if there are any questions left
  if (questionsList.length === 0) {
    alert("the end!");
  } else if (quizState === 0) {
    // Append question to display container, remove question from questions list
    write();
    quizState = 1;

    // Timer begins
    questionTimer = setTimeout(function() {
      alert("Time's up!");
      // Take question away from screen
      $("#question").empty();
      quizState = 0;
    }, 3000);
    // Show answer
  }
});
// Onclick event for answering a question
$("#container").on("click", function() {
  clearTimeout(questionTimer);
  $(question).empty();
  quizState = 0;
  // Take question away from screen
  // Show answer
  // Test for true/false
  // Append score
});

// The first question appears, and the timer starts
// User has 10s to select an answer by clicking on it
//-----> if correct, add to their correct answers count
//-----> show the correct answer + some extra explanation
// At the end of the 10 questions quiz, show player their score and congratulate.
// Offer to restart the game by pressing a "start over" button

// Maybe make each question an object, and have them be added to an array?
// Remove object when it has been used, and so that it cannot be called a second time
