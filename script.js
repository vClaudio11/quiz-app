const questions = [
    {
        question: "What does the CPU stand for?",
        answers: [
            "Central Processing Unit", 
            "Computer Personal Unit", 
            "Central Performance Unit", 
            "Control Processing Unit"
        ],
        correct: 0
    },

    {
        question: "What does RAM stand for?",
        answers: [
            "Read Access Memory",
            "Run Access Memory",
            "Random Access Memory",
            "Random Active Memory"
        ],
        correct: 2
    },

    {
        question: "What is the purpose of a resistor in an electronic circuit?",
        answers: [
            "To store electrical energy",
            "To limit the flow of electrical current",
            "To increase the voltage in a circuit",
            "To convert AC to DC"
        ],
        correct: 1
    },

    {
        question: "What does GPU stand for?",
        answers: [
            "General Processing Unit",
            "Graphics Performance Unit",
            "Graphics Processing Unit",
            "General Performance Unit"
        ],
        correct: 2
    },

    {
        question: "How many main buses are there in a computer?",
        answers: [
            "1",
            "2",    
            "3",
            "4"
        ],
        correct: 2
    }
]

// track the current question index and score
let currentIndex = 0;
let score = 0;

// grab all the elements we need from the DOM
const questionText = document.querySelector('#question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const nextBtn = document.querySelector('#next-btn');
const questionNumber = document.querySelector('#question-number');
const scoreDisplay = document.querySelector('#score');
const quizContainer = document.querySelector('#quiz-container');
const resultsContainer = document.querySelector('#results-container');
const finalScore = document.querySelector('#final-score');
const restartBtn = document.querySelector('#restart-btn');

// load the current question and answers onto the screen
function loadQuestion() {
    quizContainer.classList.remove('hidden');
    const current = questions[currentIndex];    

    questionText.textContent = current.question;
    questionNumber.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

    answerButtons.forEach((button, index) => {
        button.textContent = current.answers[index];
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });

    nextBtn.style.display = 'none';
}

// start quiz
loadQuestion();

// check if the clicked answer is correct and update score
function selectAnswer(selectedIndex) {
    const current = questions[currentIndex];

    answerButtons.forEach((button) => {
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[current.correct].classList.add('correct');
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.style.display = 'block';
}

// attach a click event listener to each answer button
answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        selectAnswer(index);
    });
});

// move to next question or show results if it's the last question
nextBtn.addEventListener('click', () => {

    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// displays the results screen with the final score
function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    finalScore.textContent = `You scored ${score} out of ${questions.length}`;
}

// restart the quiz
restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    resultsContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
});

// attach click event listener to restart button
restartBtn.addEventListener('click', restartQuiz);