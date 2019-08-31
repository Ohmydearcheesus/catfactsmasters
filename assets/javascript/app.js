// Where the questions and answers live (~20?)
var questionsList = [
  {
    question:
      "Cats are carnivores, meaning they get a complete diet from eating meats, organs, bones and cartileage from other animals.",
    answer: true,
    explanation:
      "Cats lack the ability to synthesize essential amino acids from plant components like humans and other omnivores can. This is what makes them carnivores. They must eat meat to survive, and cannot use any non-animal matter."
  },
  {
    question: "Cats are crepuscular.",
    answer: false,
    explanation:
      "Crepuscular means that an animal is most active at dusk and dawn. Cats hunt and eat during these times - the most temperate hours of the day."
  },
  {
    question: "Kibble helps clean cats' teeth.",
    answer: false,
    explanation:
      "Cats need to gnaw at a food to effectively scrape their teeth down to the gumline, where most dental issues arise. Kibble is neither shaped for such a task, nor large enough. Any kibble ingested will either shatter or be swallowed whole. Made from mostly carbohydrates, shattered kibble will disintegrate into sugars, exacerbating dental issues."
  },
  {
    question: "Cats will get seriously ill if they eat raw meat.",
    answer: false,
    explanation:
      "A cat's digestive system is designed to deal with raw meats. Their short digestive system and its high acidity means that cats do not get food poisoning from the bacteria in raw meats the same way humans will. However, since raw meat is less processed and therefore harder to digest, a cat's system may not have expected to need as much stomach acid during their first introductions to raw meat, causing them to throw up."
  },
  {
    question: "Cats were domesticated to protect human grain storage.",
    answer: true,
    explanation:
      "Cats are the perfect deterrent for rodents, rabbits, and other common pests that harm grain storage. The cats get a good meal out of the small game stockpiled grains lure, and humans get grains stored away to last through the winter."
  },
  {
    question: "Cats eat their water rather than drinking it.",
    answer: true,
    explanation:
      "Cats naturally get the vast majority of their moisture intake from their prey, which is about 70% water. While animals like dogs are effecient enough at lapping water with their large tongues, a cat must create a backwards-waterfall effect with their tongues in order to drink. Feeding wet, meaty meals will help your kitty avoid kidney issues as they age."
  },
  {
    question: "Cats are prey animals.",
    answer: true,
    explanation:
      "While cats are predators, they are also prey animals. This is why they bathe themselves so religiously and bury their waste. They evolved to hide their smell as much as possible to survive."
  },

  {
    question:
      "A cat may experience excessive shedding, dandruff, and/or oily skin and fur due to inappropriate diet.",
    answer: true,
    explanation:
      "Many commercial cat foods, both dry and wet will include grains, starches and vegetables in the formula. Any fillers will irritate the cat's bodily systems, with grains being the worst offender. In order to expel toxins, the cats' body will try to pass toxins through their urine, waste, and when the buildup has become too much to efficiently expel through such methods, through their skin."
  },

  {
    question:
      "If a cat loves to eat kibble, that means that the food must be formulated very well to suit the cat's needs.",
    answer: false,
    explanation:
      "Companies that make dry foods will spend lots of time, resources and funds to make sure their kibble is highly palatable to cats. They achieve this through the use of spray-on preserved fats and vitamins. Why? For incredibly high profit margins, of course."
  },

  {
    question: "Cats cannot taste sugar.",
    answer: true,
    explanation:
      "Thought to be the same mutation that made all felines into carnivores, it also took away their ability to taste sugar. However, cats have an array of other receptors, including ones for fat and even ATP - the compound that supplies energy in every living cell."
  },
  {
    question: "Diet may be the cause for rising feline diabetes.",
    answer: true,
    explanation:
      "Cats lack the enzymes needed to digest sugars. They cannot regulate the metabolization of sugars or prevent glucose from flooding their system. Despite this, most major pet food manufacturers use on average 20% corn or other grains in their meals, which break down into sugars."
  }
];

// Functions the game will use
function writeQuestion() {
  $("#response-buttons").removeClass("invisible");
  var i = random();
  questionPasser = questionsList[i];
  $("#container").text(questionPasser.question);
  usedQuestions.push(questionPasser);
  questionsList.splice(i, 1);
}

function writeAnswer() {
  // Take True/False buttons away from screen
  $("#response-buttons").addClass("invisible");
  // Write explanation to emptyDiv
  $("#container").text(
    questionPasser.answer + ": " + questionPasser.explanation
  );
  timer = setTimeout(function() {
    writeQuestion();
    quzState = 1;
  }, 15000);
}

// Removes all children from $("#question")
function clear() {
  $("#container").empty();
}

function restart() {
  score = 0;
  quizState = 0;
  questionsList = usedQuestions;
  usedQuestions = [];
  $("#response-buttons").addClass("invisible");
  $("#score").text(score);
  clear();
}

// Global variables

var usedQuestions = [];

var timer;
var questionPasser = "";
var quizState = 0;
var score = 0;
// var gameState = 0

// RNGeezus
function random() {
  return Math.floor(Math.random() * questionsList.length);
}

// -------------------------------------- Game Code Start ---------------------------------------------

// When the DOM loads....
// Show the title screen, and offer pressing anywhere on the screen to start the game
// When clicked, game starts

// Hides the start screen when clicked.
$("#start-overlay").on("click", function() {
  $("#start-overlay").addClass("invisible");
  clearTimeout(timer);
  writeQuestion();
});

// Onclick event for start of game and starting a new question
$("#question").on("click", function() {
  clearTimeout(timer);
  // If there are no questions left, display score and offer restart
  if (questionsList.length === 0 && quizState === 0) {
    $("#start-overlay").text(
      "Your total score was: " +
        score +
        "/" +
        usedQuestions.length +
        "! Click anywhere to try again! Need more cat facts? Visit Jackson Galaxy's webpage!"
    );
    $("#start-overlay").removeClass("invisible");
    restart();
  } else if (quizState === 0) {
    // Append question to display container, remove question from questions list, show True/False buttons
    writeQuestion();
    quizState = 1;

    // Question timer begins
    timer = setTimeout(function() {
      alert("Time's up!");
      // Show answer
      quizState = 0;
      writeAnswer();
    }, 15000);
  }
});

// Onclick event for answering a question
$("#true").on("click", function() {
  clearTimeout(timer);
  if (questionPasser.answer === true) {
    score++;
    $("#score").text(score);
  }
  // Show answer
  quizState = 0;
  writeAnswer();
});

$("#false").on("click", function() {
  clearTimeout(timer);
  if (questionPasser.answer === false) {
    score++;
    $("#score").text(score);
  }
  // Show answer
  quizState = 0;
  writeAnswer();
});

// The first question appears, and the timer starts
// User has 10s to select an answer by clicking on it
//-----> if correct, add to their correct answers count
//-----> show the correct answer + some extra explanation
// At the end of the 10 questions quiz, show player their score and congratulate.
// Offer to restart the game by pressing a "start over" button

// Maybe make each question an object, and have them be added to an array?
// Remove object when it has been used, and so that it cannot be called a second time
