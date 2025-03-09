// variable to store data returned by the api which contains quiz question answers
let quizQAs;
// variable to keep count of questions displayed to the user so far
let count = 0;
// variable to keep track of users score
let userScore = 0;

// these variables retrieve data inputted by the user on the setUpQuiz page stored in session storage.
let amount = sessionStorage.getItem("amount");
let category = sessionStorage.getItem("category");
let difficulty = sessionStorage.getItem("difficulty");
let categoryName = sessionStorage.getItem("categoryName");

// retrieves all the buttons that are used as options for the questions
let allOptions = document.getElementsByClassName("optionsBtns");
// variable to dynamically set the progress bar width
let progressBarWidthValue;
// this variable stores users answer(button)
let selectedAns;
// this variable stores correct Answer button
let correctAnsBtn;

// api string
let apiURL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

// api call and calls to various functions to set up the quiz
const fetchData = () => {
    fetch(apiURL).then(response => response.json()).then(data => {
        // stores the result
        quizQAs = data.results;
        // updates users score
        updateUserScore(userScore);
        // sets user info
        setUserInfo();
        // loads the next question by calling next question
        nextQuestion();
    }).catch((error) => { //error handling
        console.log("Too many api requests");
        setTimeout(() => {
            location.href = "setUpQuiz.html";
        }, 3000);
    });;
}

// sets the user info
const setUserInfo = () => {
    document.getElementById("q_userName").textContent += sessionStorage.getItem("name");
    progressBarWidthValue = 100 / quizQAs.length;
}

// calls fetch data function
fetchData();

// sets a click event listener to all the option buttons
Array.from(allOptions).forEach((item) => {
    item.addEventListener("click", () => {
        // sets the users selected answer
        selectedAns = item;
        // calls check answer
        checkAnswer();
    });
})

// loads the question on the page
const loadQuestion = (data) => {
    // sets the question
    document.getElementById("question").innerHTML = (count + 1) + ". " + data.question;

    //stores all the options available for the question
    let options = [];
    options[0] = data.correct_answer;
    data.incorrect_answers.forEach(element => {
        options.push(element);
    });
    // sorts the array so that the correct is at random place
    options.sort();

    // sets the options for the question using option buttons
    for (let i = 0; i < options.length; i++) {
        document.getElementById(`option${i + 1}`).innerHTML = options[i];

        document.getElementById(`option${i + 1}`).value = options[i];
        if (data.correct_answer === options[i]) {
            correctAnsBtn = `option${(i + 1)}`;
        }
    }

    // calls updateQuestionCount and updateProgressBar
    updateQuestionCount();
};

// checks the answer
const checkAnswer = () => {

    // checks if the users answer matches with the correct answer
    if (selectedAns.value === quizQAs[count].correct_answer) {
        // adds correct answer class which makes the users selected answer's background color green
        selectedAns.classList.add("correctAnswer");
        // displays that the users answer is correct
        displayMessage("Correct Answer", "green");
        // updates users score by one
        updateUserScore(++userScore);
    }
    else {
        // adds  wrong answer class which makes the users selected answer's background color red
        selectedAns.classList.add("wrongAnswer");
        // adds correct answer class to the correct answer which makes the correct answer's background color green
        document.getElementById(correctAnsBtn).classList.add("correctAnswer");
        // displays that the user's answer is incorrect
        displayMessage("Incorrect Answer", "red");
    }

    // enables the next button
    document.getElementById("nextBtn").disabled = false;
    // disables all the options so that the user cannot select the options again for the same question
    disableEnableAllOptions(true);
    // when on last question it enables end quiz button and disables next button
    if (count === (quizQAs.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("endQuizBtn").style.display = "inline-block";
    }
    // increases the count by 1
    count++;
    updateProgressBar();
}


// updates progress bar 
const updateProgressBar = () => {
    // increases the width of span tag in the div tag so that the progress bar can show the progress in number of questions
    console.log(progressBarWidthValue * (count) + "%");
    document.getElementById("progressBar").style.width = progressBarWidthValue * (count) + "%";

}

// updates question count by 1 after each question
const updateQuestionCount = () => {
    document.getElementById("questionCount").textContent = `Question ${count + 1} of ${quizQAs.length}`;
}

// updates users score
const updateUserScore = (score) => {
    document.getElementById("scoreCount").textContent = "Score: " + score + "/" + quizQAs.length;
}

// displays a message to user
const displayMessage = (msg, color) => {
    const el = document.getElementById("displayMsg");
    el.textContent = msg;
    el.style.color = color;
}


// this either enables or disables the options depending on the value used in the arguments
const disableEnableAllOptions = (val) => {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`option${i}`).disabled = val;

    }
}

// displays the next question
const nextQuestion = () => {
    // calls reset style button
    resetStyle();
    // loads the question 
    if (count <= (quizQAs.length - 1)) {
        loadQuestion(quizQAs[count]);
    }

    // if (count > 0) {

    //     updateProgressBar();
    // }

    // disables the next button
    document.getElementById("nextBtn").disabled = true;
}

// reset style function
const resetStyle = () => {
    // checks if the selected answers is null basically to see if it is the first question
    if (selectedAns !== "" && selectedAns != null) {
        // checks if the user selected the wrong answer
        if (selectedAns.classList.contains("wrongAnswer")) {
            // removes the wrong answer class from the user selected button
            selectedAns.classList.remove("wrongAnswer");
            // removes the class from correct answer button
            document.getElementById(correctAnsBtn).classList.remove("correctAnswer");
        }
        // checks if the user selected the correct answer
        else (selectedAns.classList.contains("correctAnswer"))
        {
            // removes the correct answer class from the user selected button
            selectedAns.classList.remove("correctAnswer");
        }
    }
    // enables all the options for next button
    disableEnableAllOptions(false);
    // removes the style and empties the message
    displayMessage("", "");
}

// end quiz function
const endQuiz = () => {
    // gets the modal
    const modal = document.getElementById("endQuizModal");
    // makes the modal visible
    modal.style.display = "block";
    // adds show class
    modal.classList.add("show");

    // creates a div element
    let modalBg = document.createElement("div");
    // sets the class attribute with the classes
    modalBg.setAttribute("class", "modal-backdrop fade show");
    // appends the element to body
    document.body.append(modalBg);

    // gets users name from session storage and displays it into the modal
    endQuizModalLabel.textContent = sessionStorage.getItem("name"); + "'s quiz result";

    // creates a h5 element
    let scoreHeading = document.createElement("h5");
    // inputs text to the h5 element
    scoreHeading.textContent = "You scored " + userScore + " out of " + quizQAs.length;
    // appends it to the modal
    document.getElementById("endQuizModalbody").append(scoreHeading);
}

// another quiz function
const anotherQuiz = () => {
    // redirects the user to setUpQuiz to play another quiz
    location.href = "setUpQuiz.html";
}
