document.addEventListener('DOMContentLoaded', function () {
    let quizContainer = document.getElementById('quiz-container');
    let submitBtn = document.getElementById('submit-btn');
    let resultContainer = document.getElementById('result');
    let userAnswers = [];

    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            data.forEach((question, index) => {
                let questionElem = document.createElement('div');
                questionElem.classList.add('question');

                let questionTitle = document.createElement('h2');
                questionTitle.textContent = question.question;
                questionElem.appendChild(questionTitle);

                question.options.forEach((option, optIndex) => {
                    let optionElem = document.createElement('div');
                    optionElem.innerHTML = `
                        <input type="radio" name="question-${index}" value="${optIndex}" id="question-${index}-option-${optIndex}">
                        <label for="question-${index}-option-${optIndex}">${option}</label>
                    `;
                    questionElem.appendChild(optionElem);
                });

                quizContainer.appendChild(questionElem);
            });
        });

    submitBtn.addEventListener('click', function () {
        let questions = document.querySelectorAll('.question');
        userAnswers = [];

        questions.forEach((question, index) => {
            let selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            userAnswers.push(selectedOption ? parseInt(selectedOption.value) : null);
        });

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers: userAnswers })
        })
        .then(response => response.json())
        .then(data => {
            resultContainer.innerHTML = `<h3>Your score: ${data.score}/${data.max_score}</h3>`;
        });
    });
});
