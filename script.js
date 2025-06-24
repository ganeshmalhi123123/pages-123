const questions = [
    {
        text: "How much do you think I love you?",
        options: [
            "a) A lot",
            "b) To the moon and back",
            "c) Beyond infinity",
            "d) More than words can say 💖"
        ],
        next: "Wrong. It’s even more than that 😌.",
        type: "multiple-choice"
    },
    {
        text: "Do you believe in magic?",
        options: ["Yes", "No"],
        responses: {
            "Yes": "Because every day with you feels like it.",
            "No": "I didn’t either, until I met you."
        },
        type: "yes-no"
    },
    {
        text: "Which song reminds you of us?",
        options: [],
        type: "open-ended"
    }
];

let currentQuestionIndex = 0;
let answerChosen = false;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-btn");
const newPageButtonContainer = document.getElementById("new-page-container");
const openNewPageBtn = document.getElementById("open-new-page-btn");

function showNextQuestion() {
    nextButton.style.display = "none"; // Hide the "Next" button initially
    answersContainer.style.display = "none"; // Hide the answer buttons

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.text;

        if (currentQuestion.type === "multiple-choice") {
            showMultipleChoiceOptions(currentQuestion.options);
        } else if (currentQuestion.type === "yes-no") {
            showYesNoOptions(currentQuestion.options);
        } else if (currentQuestion.type === "open-ended") {
            showOpenEndedInput();
        }

        currentQuestionIndex++;
    } else {
        // On the last question, display a "Next" button that links somewhere
        questionText.textContent = "Thanks for answering the questions! 💖";
        nextButton.innerHTML = 'Go to another page';  // Button text
        nextButton.style.display = "block"; // Show the "Next" button

        // Set the link for the "Next" button
        nextButton.onclick = function() {
            window.location.href = "https://example.com"; // Replace with your desired URL
        };

        // Show the "Open New Page" button after the last question
        newPageButtonContainer.style.display = "block";
    }
}

function showMultipleChoiceOptions(options) {
    answersContainer.style.display = "block"; // Show the answer options
    answersContainer.innerHTML = ""; // Clear any previous options

    options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("answer-btn");
        button.onclick = () => handleMultipleChoiceAnswer(index);
        answersContainer.appendChild(button);
    });
}

function handleMultipleChoiceAnswer(index) {
    const nextText = questions[currentQuestionIndex - 1].next;
    questionText.textContent = nextText; // Show "Wrong. It’s even more than that 😌."
    answersContainer.style.display = "none"; // Hide answer buttons
    nextButton.style.display = "block"; // Show the "Next" button
    answerChosen = true;
}

function showYesNoOptions(options) {
    answersContainer.style.display = "block"; // Show the answer options
    answersContainer.innerHTML = ""; // Clear any previous options

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("answer-btn");
        button.onclick = () => handleYesNoAnswer(option);
        answersContainer.appendChild(button);
    });
}

function handleYesNoAnswer(answer) {
    const response = questions[currentQuestionIndex - 1].responses[answer];
    questionText.textContent = response; // Show the corresponding message
    answersContainer.style.display = "none"; // Hide answer buttons
    nextButton.style.display = "block"; // Show the "Next" button
    answerChosen = true;
}

function showOpenEndedInput() {
    answersContainer.style.display = "block"; // Show input field
    answersContainer.innerHTML = `
        <input type="text" id="song-input" placeholder="Type your song here..." style="width: 100%; padding: 10px; margin-top: 10px; border-radius: 5px; border: 1px solid #ddd;">
        <button class="answer-btn" onclick="handleOpenEndedAnswer()">Submit</button>
    `;
}

function handleOpenEndedAnswer() {
    const songInput = document.getElementById("song-input").value;
    if (songInput) {
        questionText.textContent = "That's a beautiful choice! 💖"; // Display a thank you message
    } else {
        questionText.textContent = "No song? 😅 But we know what song we’re talking about! 🎶"; // Handle no input
    }
    answersContainer.style.display = "none"; // Hide input field
    nextButton.style.display = "block"; // Show the "Next" button
    answerChosen = true;
}

nextButton.addEventListener("click", () => {
    if (answerChosen) {
        showNextQuestion();
        answerChosen = false;
    }
});

// Button to open a new webpage
openNewPageBtn.addEventListener("click", function() {
    window.open("page3.html"); // Opens a new tab with the specified URL
});

// Start the first question
showNextQuestion();