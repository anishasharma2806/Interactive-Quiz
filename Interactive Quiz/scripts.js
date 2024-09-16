    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Paris", correct: true },
                { text: "Madrid", correct: false },
                { text: "Rome", correct: false }
            ],
            hint: "It's also known as the 'City of Lights'."
        },
        {
            question: "Who wrote 'Hamlet'?",
            answers: [
                { text: "Shakespeare", correct: true },
                { text: "Homer", correct: false },
                { text: "Tolstoy", correct: false },
                { text: "Dickens", correct: false }
            ],
            hint: "This famous English playwright also wrote 'Romeo and Juliet'."
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false },
                { text: "Venus", correct: false }
            ],
            hint: "This planet is named after the Roman god of war."
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            answers: [
                { text: "Oxygen", correct: true },
                { text: "Gold", correct: false },
                { text: "Hydrogen", correct: false },
                { text: "Nitrogen", correct: false }
            ],
            hint: "This element is essential for breathing and makes up about 21% of the Earth's atmosphere."
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Pacific Ocean", correct: true },
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false }
            ],
            hint: "This ocean borders countries like the United States, China, and Japan."
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            answers: [
                { text: "Japan", correct: true },
                { text: "China", correct: false },
                { text: "India", correct: false },
                { text: "Australia", correct: false }
            ],
            hint: "This country is located in East Asia and its flag features a red circle."
        },
        {
            question: "Which animal is known as the King of the Jungle?",
            answers: [
                { text: "Lion", correct: true },
                { text: "Tiger", correct: false },
                { text: "Elephant", correct: false },
                { text: "Cheetah", correct: false }
            ],
            hint: "This animal is often referred to as the symbol of courage and strength."
        },
        {
            question: "Which organ in the human body pumps blood?",
            answers: [
                { text: "Heart", correct: true },
                { text: "Liver", correct: false },
                { text: "Lungs", correct: false },
                { text: "Kidneys", correct: false }
            ],
            hint: "This organ has four chambers and is crucial for circulation."
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: [
                { text: "Diamond", correct: true },
                { text: "Gold", correct: false },
                { text: "Iron", correct: false },
                { text: "Silver", correct: false }
            ],
            hint: "This substance is used in jewelry and also in cutting tools."
        },
        {
            question: "Which country hosted the 2016 Summer Olympics?",
            answers: [
                { text: "Brazil", correct: true },
                { text: "China", correct: false },
                { text: "Greece", correct: false },
                { text: "Japan", correct: false }
            ],
            hint: "This country is famous for its carnival and football culture."
        }
    ];



    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let timerInterval;
    
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-btn');
    const quizContainer = document.getElementById('quiz');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const submitButton = document.getElementById('submit-btn');
    const hintButton = document.getElementById('hint-btn');
    const hintElement = document.getElementById('hint');
    const timerElement = document.getElementById('time-remaining');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');
    const exitButton = document.getElementById('exit-btn');
    
    // Event Listeners
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    prevButton.addEventListener('click', () => {
        currentQuestionIndex--;
        resetState();
        setNextQuestion();
    });
    submitButton.addEventListener('click', showResult);
    restartButton.addEventListener('click', restartQuiz);
    hintButton.addEventListener('click', showHint);
    exitButton.addEventListener('click', () => window.close());
    
    function startQuiz() {
        startScreen.classList.add('hide');
        quizContainer.classList.remove('hide');
        setNextQuestion();
    }
    
    function setNextQuestion() {
        resetState();
        resetTimer(); // Reset the timer every time a new question is loaded
        showQuestion(questions[currentQuestionIndex]);
        toggleNavButtons();
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
            answerButtonsElement.appendChild(button);
        });
    }
    
    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        hintElement.classList.add('hide');
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        setStatusClass(document.body, correct);
        if (correct) {
            score++;
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true;
        });
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.classList.remove('hide');
        } else {
            submitButton.classList.remove('hide');
        }
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
    
    function showHint() {
        hintElement.innerText = questions[currentQuestionIndex].hint;
        hintElement.classList.remove('hide');
    }
    
    function toggleNavButtons() {
        prevButton.classList.toggle('hide', currentQuestionIndex === 0);
    }
    
    function showResult() {
        quizContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
        scoreElement.innerText = `${score} out of ${questions.length}`;
    }
    
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        setNextQuestion();
    }
    
    // Timer Functions
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showResult();
            }
        }, 1000);
    }
    
    function resetTimer() {
        clearInterval(timerInterval); // Clear the previous timer interval
        timeLeft = 60; // Reset the time to 30 seconds for each question
        timerElement.innerText = timeLeft; // Update the displayed timer
        startTimer(); // Start the timer for the new question
    }