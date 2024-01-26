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
easy.addEventListener('click', () => runGame(easyQuestions, DdisplayEasyQuestion));
meduim.addEventListener('click', () => runGame(meduimQuestions, displayMeduimQuestion));
hard.addEventListener('click', () => runGame(hardQuestions, displayHardQuestion));

/**
 * provides the starting conditions for the game by shuffling the questions and then calling the
 * specific string of questions selected by the user.
 * Majority of code used from YouTube tutorial from Web Dev Simplified
 * provided in the credits section of README.md
 */
function runGame(questions, displayFunction) {
    instructions.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    gameContainerElement.classList.remove('hide');
    displayFunction();
}

/**
 * Take user to easyQuestions, mediumQuestions, hardQuestions, all 
 * organized in a shuffled manner.
 */

function DdisplayEasyQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex], 'easy');
}

function displayMediumQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex], 'medium');
}

function displayHardQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex], 'hard');
}
/**
 * Displays questions from each string. currentQuestion adds onto the question counter.
 * Fills assigned spaces with questions and answers from the string and tells the 
 * page which is the correct option.
 * Some code used from YouTube tutorial from Web Dev Simplified
 * provided in the credits section of README.md 
 */
function showQuestion(question) {
    const currentQuestionNumber = document.getElementById('current-question');
    currentQuestionNumber.innerText = currentQuestionIndex + 1;

    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener('click', selectAnswer);
        answerBtnAreaElement.appendChild(button);
    });
}
/**
 * hides next button again and returns answer boxes to original state before and replacing 
 * original buttons from HTML
 */
function resetState() {
    nextButton.classList.add('hide');
    while (answerBtnAreaElement.firstChild) {
        answerBtnAreaElement.removeChild(answerBtnAreaElement.firstChild);
    }
}
/**
 * Detects if selected answer is the correct option.  Disables all answers once
 * an option is selected. plays a sound depending on answer chosen, add to correct/
 * incorrect scores, and adds a next question if page detects there is yet another 
 * question left in the string.  If not, 'results page' button is displayed instead.
 */
function selectAnswer(e) {
    let selectedButton = e.target;
    let correctOption = selectedButton.dataset.correct === 'true';
    let allOptions = answerBtnAreaElement.children.length;

    for (let i = 0; i < allOptions; i++) {
        let currentButton = answerBtnAreaElement.children[i];
        let isCorrect = currentButton.dataset.correct === 'true';

        if (isCorrect) {
            currentButton.style.backgroundColor = "#0c0c";
        }
        currentButton.classList.add('disable');
    }

    if (correctOption) {
        selectedButton.style.backgroundColor = "#0c0c";
        correctSound.play();
        increaseScore();
    } else {
        selectedButton.style.backgroundColor = "#c00c";
        selectedButton.style.color = "#fff";
        incorrectSound.play();
        increaseIncorrect();
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultsButton.classList.remove('hide');
    }
}

/*Functions to increase scores, taken from Love Maths Walkthrough*/
function increaseScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function increaseIncorrect() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/*Functions to play sounds when they are called on*/
function gamestartSound() {
    gamestart.volume = 0.2;
    gamestart.play();
}

/*function for next button*/
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayEasyQuestion();
});
/**
 * leads to the results section, displaying feedback results and customized messages 
 * depending on how many correct answers the user had.
 */
resultsButton.addEventListener('click', () => {
    gameContainerElement.classList.add('hide');
    resultsBox.classList.remove('hide');
    restartButton.classList.remove('hide');
    let scoreTotal = document.getElementById('total');
    let finalScoreElement = document.getElementById('score');
    let finalScore = parseInt(finalScoreElement.innerText);
    let finalResult;

    if (finalScore <= 3) {
        finalResult = `
        <p id="results-message">You got ${finalScore} correct!<br> "No dream is too big if you have the courage to pursue it!"</p>
        `;
    } else if (finalScore >= 4 && finalScore <= 7) {
        finalResult = `
        <p id="results-message">You got ${finalScore} correct!<br> "If we don't fight, we can't win!"</p>
        `;
    } else if (finalScore >= 8) {
        finalResult = `
        <p id="results-message"> You got ${finalScore} correct!<br> "Yohoho! Thats how you sail through success."</p>
        `;
    }
    scoreTotal.innerHTML = finalResult;
});
/*Restart button function to take user back to the first page*/
let homePage = 'index.html';
let restartButton = document.getElementById('restart-div');
restartButton.addEventListener('click', () => {
    window.location.href = homePage;
});
/*Easy set of Questions*/
const easyQuestions = [
{
        question: 'Who is the main protagonist in \One Piece\'?',
        answers: [
            { text: 'Roronoa Zoro', correct: false },
            { text: 'Monkey D.Luffy', correct: true },
            { text: 'Son Goku', correct: false },
            { text: 'Lucy', correct: false }
        ]
    },
    {
        question: 'What is the name of Monkey D.Luffy`s signature attack?',
        answers: [
            { text: 'Kamehameha', correct: false },
            { text: 'Rasengan', correct: false },
            { text: 'Unlimited Void', correct: false },
            { text: 'Gomu Gomu No Pistol', correct: true }
        ]
    },
    {
        question: 'What is Zoro goal in the series ?',
        answers: [
            { text: 'becoming the Hokage', correct: false },
            { text: 'Finding the All Blue', correct: false },
            { text: 'To become strongest martial artist in the world', correct: false },
            { text: 'To become the world`s greatest swordsman', correct: true }
        ]
    },
    {
        question: 'Who is the captain of the Red hair Pirates?',
        answers: [
            { text: 'Monkey.D luffy', correct: false },
            { text: 'Son goku', correct: false },
            { text: 'Shanks', correct: true },
            { text: 'zoro', correct: false }
        ]
    },
    {
        question: 'What is the name of zoro`s unique sword style?',
        answers: [
            { text: 'One sword style', correct: false },
            { text: 'Three sword style', correct: true },
            { text: 'Four sword style', correct: false },
            { text: 'Nine sword style', correct: false }
        ]
    },
    {
        question: 'Who was the first Character to own the Mera Mera no Mi Devil Fruit?',
        answers: [
            { text: 'Chopper', correct: false },
            { text: 'Robin', correct: false },
            { text: 'Nami', correct: false },
            { text: 'Ace', correct: true }
        ]
    },
    {
        question: 'Who is the chef and member of the Straw Hat crew?',
        answers: [
            { text: 'Sanji', correct: true },
            { text: 'Robin', correct: false },
            { text: 'chopper', correct: false },
            { text: 'Nami', correct: false }
        ]
    },
    {
        question: 'Who is the archaeologist and member of the Straw Hat pirates?',
        answers: [
            { text: 'Franky', correct: false },
            { text: 'Robin', correct: true },
            { text: 'Jinbe', correct: false },
            { text: 'Ace', correct: false }
        ]
    },
    {
        question: 'What is the name of the first ship used by the Straw Hat pirates?',
        answers: [
            { text: 'Moby Dick', correct: false },
            { text: 'Big Top', correct: false },
            { text: 'Sexy Foxy', correct: false },
            { text: 'Going Merry', correct: true }
        ]
    },
    {
        question: 'Who is known as the "Pirate Hunter" in the series \'One piece\'?',
        answers: [
            { text: 'zoro', correct: true },
            { text: 'Robin', correct: false },
            { text: 'Garp', correct: false },
            { text: 'Smoker', correct: false }
        ]
    }
];
/*Medium set of Questions*/
const mediumQuestions = [
    {
        question: 'How many Gears does Lufyy have?',
        answers: [
            { text: '10', correct: false },
            { text: '5', correct: true },
            { text: '3', correct: false },
            { text: '4', correct: false }
        ]
    },
    {
        question: 'How many yonkos(Emperors) are they in the series?',
        answers: [
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '3', correct: false },
            { text: '12', correct: false }
        ]
    },
    {
        question: 'What is the name of the powerful sword wielded by Roronoa zoro?',
        answers: [
            { text: 'Sandai Kitetsu', correct: false },
            { text: 'shusui', correct: false },
            { text: 'Wado Ichimonji', correct: false },
            { text: 'Enma', correct: true }
        ]
    },
    {
        question: 'Which Devil grants its user the ability to stretch their body like rubber?',
        answers: [
            { text: 'Mera Mera no Mi', correct: false },
            { text: 'Bara Bara no Mi', correct: false },
            { text: 'Gomu Gomu np Mi', correct: true },
            { text: 'Goro Goro no Mi', correct: false }
        ]
    },
    {
        question: 'What is the name of the mysterious ocean current that leads to the Grand Line?',
        answers: [
            { text: 'Red Line', correct: false },
            { text: 'Reverse Mountain', correct: true },
            { text: 'Calm Belt', correct: false },
            { text: 'Florian Triangle', correct: false }
        ]
    },
    {
        question: 'Which character has the ability to control shadows?',
        answers: [
            { text: 'Crocodile', correct: false },
            { text: 'Enel', correct: false },
            { text: 'Kaido', correct: false },
            { text: 'Gecko Moria', correct: true }
        ]
    },
    {
        question: 'What is the name of Luffy idol?',
        answers: [
            { text: 'Shanks', correct: true },
            { text: 'Garp', correct: false },
            { text: 'Captain Smoker', correct: false },
            { text: 'Gol.D Roger', correct: false }
        ]
    },
    {
        question: 'Who was Nami adopted sister?',
        answers: [
            { text: 'bellamere', correct: false },
            { text: 'Nojiko', correct: true },
            { text: 'Robin', correct: false },
            { text: 'Boa Hancock', correct: false }
        ]
    },
    {
        question: 'How many Warlords of the sea were there in the beginning ?',
        answers: [
            { text: '2', correct: false },
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true }
        ]
    },
    {
        question: 'Who was the First Straw Hat to be shown in the anime?',
        answers: [
            { text: 'Nami', correct: true },
            { text: 'zoro', correct: false },
            { text: 'Ussop', correct: false },
            { text: 'Luffy', correct: false }
        ]
    }
];
/*hard set of Questions*/
const hardQuestions = [
    {
        question: 'How old was Luffy pre-time skip, \One Piece\'?',
        answers: [
            { text: '16', correct: false },
            { text: '17', correct: true },
            { text: '18', correct: false },
            { text: '19', correct: false }
        ]
    },
    {
        question: 'Where was Gol D.Roger executed?',
        answers: [
            { text: 'Raftel', correct: false },
            { text: 'Goa Kingdom', correct: false },
            { text: 'Gray Terminal', correct: false },
            { text: 'Loungetown', correct: true }
        ]
    },
    {
        question: 'What is the name of the dog in Orange Town?',
        answers: [
            { text: 'Riche', correct: false },
            { text: 'Robson', correct: false },
            { text: 'Max', correct: false },
            { text: 'Chouchou', correct: true }
        ]
    },
    {
        question: 'How many times did zoro lose to kuina?',
        answers: [
            { text: '101', correct: false },
            { text: '1', correct: false },
            { text: '2001', correct: true },
            { text: '2002', correct: false }
        ]
    },
    {
        question: 'Which sword does Zoro use with his mouth?',
        answers: [
            { text: 'Shusui', correct: false },
            { text: 'Wado Ichimonji', correct: true },
            { text: 'Sandai Kitetsu', correct: false },
            { text: 'Enma', correct: false }
        ]
    },
    {
        question: 'What is the name of Brook`s old pirate crew?',
        answers: [
            { text: 'The Roshio', correct: false },
            { text: 'The Straw Hats', correct: false },
            { text: 'The Spade Pirates', correct: false },
            { text: 'The Rumbar Pirates', correct: true }
        ]
    },
    {
        question: 'Who was the first Marine Admiral to be introduced?',
        answers: [
            { text: 'Aokiji', correct: true },
            { text: 'Akainu', correct: false },
            { text: 'Garp', correct: false },
            { text: 'Kizaru', correct: false }
        ]
    },
    {
        question: 'What color is the transponder snail used for the Buster call?',
        answers: [
            { text: 'Red', correct: false },
            { text: 'Golden', correct: true },
            { text: 'Silver', correct: false },
            { text: 'Black', correct: false }
        ]
    },
    {
        question: 'Who took over chopper body in Punk hazard?',
        answers: [
            { text: 'Sanji', correct: false },
            { text: 'Nami', correct: false },
            { text: 'Luffy', correct: false },
            { text: 'Franky', correct: true }
        ]
    },
    {
        question: 'What is the collective bounty of Kaido`s and Big Mom`s Crews?',
        answers: [
            { text: '21,300,600,000', correct: true },
            { text: '16,500,250,000', correct: false },
            { text: '45,400,600,000', correct: false },
            { text: '20.700.100,000', correct: false }
        ]
    }
];
