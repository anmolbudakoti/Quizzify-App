let questions = [
    {
        numb: 1,
        question: "Which programming language is known for its usage in artificial intelligence and is named after a comedy group?",
        options: ["Ruby", "Python", "JavaScript", "LISP"],
        answer: "Python"
    },
    {
        numb: 2,
        question: "In software development, what does the acronym 'DRY' stand for?",
        options: ["Don't Repeat Yourself", "Debug Regularly, Yield", "Develop Rapidly, Yearly", "Dynamic Resource Yielding"],
        answer: "Don't Repeat Yourself"
    },
    {
        numb: 3,
        question: "Which of the following is not a principle of Object-Oriented Programming (OOP)?",
        options: ["Encapsulation", "Polymorphism", "Inheritance", "Compilation"],
        answer: "Compilation"
    },
    {
        numb: 4,
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Structured Quick Language"],
        answer: "Structured Query Language"
    },
    {
        numb: 5,
        question: "In the CSS box model, which property is used to control the space between the content and the border?",
        options: ["Margin", "Padding", "Border-spacing", "Line-height"],
        answer: "Padding"
    },
    {
        numb: 6,
        question: "Which of the following is not a characteristic of a computer?",
        options: ["Versatility", "Accuracy", "Diligence", "I.Q."],
        answer: "I.Q."
    },
    {
        numb: 7,
        question: "Which CSS property is used to align items along the main axis in a flex container?",
        options: ["justify-content", "align-items", "flex-direction", "align-content"],
        answer: "justify-content"
    },
    {
        numb: 8,
        question: "What does the HTTP status code 404 indicate?",
        options: ["OK", "Bad Request", "Not Found", "Internal Server Error"],
        answer: "Not Found"
    },
    {
        numb: 9,
        question: "Which keyword in JavaScript is used to declare a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        numb: 10,
        question: "Which CSS selector is used to target an element with a specific id?",
        options: [".classname", "#idname", "*", ":nth-child"],
        answer: "#idname"
    }
];

const startButton = document.querySelector(".startButton button");
const infoBox = document.querySelector(".infoBox");
const exitButton = infoBox.querySelector(".buttons .quit");
const continueButton = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const timerCount = quizBox.querySelector(".timer .timerTime");
const timeLine = quizBox.querySelector("header .timeLine");
const timeOff = quizBox.querySelector("header .timerText");

const optionList = document.querySelector(".optionList");


startButton.onclick = () => {
    infoBox.classList.add("activeInfo");
}

exitButton.onclick = () => {
    infoBox.classList.remove("activeInfo");
}

continueButton.onclick = () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    quesCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextButton = quizBox.querySelector(".nextQue");
const resultBox = document.querySelector(".resultBox");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
    console.log("Restart button clicked");
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");

    queCount = 0;
    queNumb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;

    // Reset quiz state
    showQuestions(queCount);
    quesCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextButton.style.display = "none";
    timeOff.textContent = "Time left";
};


quitQuiz.onclick = () => {
    window.location.reload();
}

nextButton.onclick = () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        quesCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextButton.style.display = "none";
        timeOff.textContent = "Time left";
    }
    else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions.completed");
        showResultBox();
    }
}

function showQuestions(index) {
    const queText = document.querySelector(".queText");
    let queTag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fa fa-check" aria-hidden="true"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa fa-times" aria-hidden="true"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Correct Answer");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        answer.classList.add("incorrect");
        console.log("Incorrect Answer");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct")
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextButton.style.display = "block";
}

function showResultBox() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".scoreText");
    if (userScore > 5) {
        let scoreTag = '<span>Congrats! You got <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>Nice! You got <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>You got only <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timerCount.textContent;
            timerCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = "00";
            timeOff.textContent = "Time out";

            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute("class", "option correct")
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled");
            }
            nextButton.style.display = "block";
        }
    }
}


function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);

        }
    }
}


function quesCounter(index) {
    const queCounter = quizBox.querySelector(".totalQue");
    let totalQueTag = '<span><p>' + index + '</p>Of<p>' + questions.length + '</p>Questions</span>';
    queCounter.innerHTML = totalQueTag;
}

