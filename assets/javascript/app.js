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
  emptyDiv.text(questionPasser.question);
  $("#question").append(emptyDiv);
  usedQuestions.push(questionPasser);
  questionsList.splice(i, 1);
}

function clear() {
  // Test for true/false
  // Append score
  // Take question away from screen
  $("#question").empty();
  // Show answer
  emptyDiv.text(questionPasser.answer + ": " + questionPasser.explanation);
}

// Global variables

var usedQuestions = [];

var timer;
var questionPasser = "";
var quizState = 0;
var emptyDiv = $("<div></div>");
var score;
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
  // If there are no questions left, display score and offer restart
  if (questionsList.length === 0) {
    alert("the end!");
  } else if (quizState === 0) {
    // Append question to display container, remove question from questions list
    write();
    quizState = 1;

    // Question timer begins
    timer = setTimeout(function() {
      alert("Time's up!");
      clear();
      quizState = 0;
    }, 3000);
    // Show answer
    function answer() {
      // Write explanation to emptyDiv
      emptyDiv.text(questionPasser.explanation);
      $("#question").append(emptyDiv);
    }
  }
});
// Onclick event for answering a question
$("#true").on("click", function() {
  clearTimeout(timer);
  var response = $(this).attr("value");
  var answer = questionPasser.answer;
  if (response == answer) {
    alert("+1");
  }
  clear();
  quizState = 0;
});

$("#false").on("click", function() {
  clearTimeout(timer);
  var response = $(this).attr("value");
  var answer = questionPasser.answer;
  if (response == answer) {
    alert("+1");
  }
  clear();
  quizState = 0;
});
// The first question appears, and the timer starts
// User has 10s to select an answer by clicking on it
//-----> if correct, add to their correct answers count
//-----> show the correct answer + some extra explanation
// At the end of the 10 questions quiz, show player their score and congratulate.
// Offer to restart the game by pressing a "start over" button

// Maybe make each question an object, and have them be added to an array?
// Remove object when it has been used, and so that it cannot be called a second time
