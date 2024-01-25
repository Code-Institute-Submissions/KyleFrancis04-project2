/*Declaration of various variables*/
let easy = document.getElementById('easy-game');
let meduim = document.getElementById('meduim-game');
let hard = document.getElementById('hard-game');
let instructions = document.getElementById('instructions');
let gameContainerElement = document.getElementById('game-container');
let shuffledQuestions, currentQuestionIndex;
let questionElement = document.getElementById('question');
let answerBtnAreaElement = document.getElementById('answer-btn-area');
let nextButton = document.getElementById('next-btn');
let resultsButton = document.getElementById('result-btn');
let resultsBox = document.getElementById('results');
let correctSound = document.getElementById('correct-sound');
let incorrectSound = document.getElementById('incorrect-sound');
let gamestart = document.getElementById('gamestart-sound');

/*Game-type event listeners to determine which code and questions to use.*/
