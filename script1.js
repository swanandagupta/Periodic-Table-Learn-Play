document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById('question');
    const choiceButtons = document.querySelectorAll('.choice');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    const nextButton = document.getElementById('next');
    const timerElement = document.getElementById('timerValue');

    const quizData = [
        { question: "What is the atomic number of Hydrogen?", answers: ["1", "2", "3", "4"], correct: 0 },
        { question: "What is the symbol for Helium?", answers: ["H", "He", "Li", "Be"], correct: 1 },
        { question: "Which element has the atomic number 6?", answers: ["Carbon", "Oxygen", "Nitrogen", "Fluorine"], correct: 0 },
        { question: "What is the atomic number of Oxygen?", answers: ["6", "7", "8", "9"], correct: 2 },
        { question: "Which element is in Group 17?", answers: ["Chlorine", "Boron", "Carbon", "Nitrogen"], correct: 0 },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const questionLimit = 5;
    let timer;

    function startTimer() {
        let timeLeft = 30;
        timerElement.textContent = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function loadQuestion() {
        if (timer) {
            clearInterval(timer);
        }
        startTimer();

        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        choiceButtons.forEach((button, index) => {
            button.textContent = currentQuestion.answers[index];
            button.onclick = () => checkAnswer(index);
        });
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = quizData[currentQuestionIndex].correct;
        if (selectedIndex === correctIndex) {
            feedbackElement.textContent = "Correct!";
            feedbackElement.style.color = "green";
            score++;  // Add 1 for each correct answer
        } else {
            feedbackElement.textContent = `Incorrect! The correct answer was ${quizData[currentQuestionIndex].answers[correctIndex]}.`;
            feedbackElement.style.color = "red";
        }

        scoreElement.textContent = `Correct Answers: ${score}`;
        currentQuestionIndex++;

        if (currentQuestionIndex < questionLimit) {
            setTimeout(loadQuestion, 1000);  // Delay before loading the next question
        } else {
            setTimeout(endGame, 1000);  // End the game after all questions
        }
    }

    function endGame() {
        clearInterval(timer);
        questionElement.textContent = "Quiz Completed!";
        choiceButtons.forEach(button => button.style.display = 'none');
        feedbackElement.textContent = `Final Score: ${score} out of ${questionLimit}`;
        feedbackElement.style.color = "white";

        // Show appropriate button based on the score
        if (score === questionLimit) {
            nextButton.style.display = 'block';
        } else {
            restartButton.style.display = 'block';
        }
    }

    // Restart the quiz
    restartButton.addEventListener('click', function() {
        currentQuestionIndex = 0;
        score = 0;
        restartButton.style.display = 'none';
        nextButton.style.display = 'none';
        loadQuestion();
        choiceButtons.forEach(button => button.style.display = 'block'); // Show buttons again
    });

    // Move to the next level (you can customize this to load a different set of questions or page)
    nextButton.addEventListener('click', function() {
        // alert("Moving to the next level!");
        window.location.href = `index1.html`;
    });

    // Start the game
    loadQuestion();
});
