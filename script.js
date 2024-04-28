const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let answerSelected = false; // Variable to track if an answer has been selected

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    if (!answerSelected) { // Check if an answer has been selected
        return; // Do not proceed if no answer has been selected
    }
    currentQuestionIndex++;
    setNextQuestion();
    
});

function startGame() {
    startButton.classList.add('hide');
    scoreElement.innerText = '0'; // Reset score to 0
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    answerSelected = false; // Reset answer selected flag
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });

}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!answerSelected) { // Check if answer has already been selected
        answerSelected = true; // Set answer selected flag
        if (correct) {
            incrementScore();
        }
    }
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    nextButton.classList.remove('hide');
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function incrementScore() {
    const currentScore = parseInt(scoreElement.innerText);
    scoreElement.innerText = currentScore + 1;
}

const questions =[
    {
        question: 'What does the <a> tag represent in HTML?',
        answers: [
            { text: 'A heading', correct: false },
            { text: 'A paragraph', correct: false },
            { text: 'A hyperlink', correct: true },
            { text: 'An image', correct: false }
        ]
    },
    {
        question: 'What keyword is used to declare a variable in JavaScript?',
        answers: [
            { text: ' variable', correct: false },
            { text: 'var', correct: true },
            { text: 'vary', correct: false },
            { text: 'lets', correct: false }
        ]
    },
    {
        question: 'Who is credited with inventing the World Wide Web, which laid the foundation for HTML?',
        answers: [
            { text: 'Tim Berners-Lee', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Mark Zuckerberg', correct: false },
            { text: 'Steve Jobs', correct: false }
        ]
    },
    {
        question: 'What was the original name of JavaScript when it was first introduced by Netscape in 1995?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'ActionScript', correct: false },
            { text: 'LiveScript', correct: false },
            { text: 'Mocha', correct: true}
        ]
    },
    {
        question: 'When was JavaScript first introduced?',
        answers: [
            { text: '1998', correct: false },
            { text: '1995', correct: true },
            { text: '1992', correct: false },
            { text: '1996', correct:false}
        ]
       
    }

];
