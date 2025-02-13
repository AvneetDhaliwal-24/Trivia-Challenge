let categoryOptions = [
    { 9: "General Knowledge", allowAlldifficulty: true },
    { 10: "Entertainment: Books", allowAlldifficulty: true },
    { 11: "Entertainment: Film", allowAlldifficulty: true },
    { 12: "Entertainment: Music", allowAlldifficulty: true },
    { 13: "Entertainment: Musicals & Theatres", allowAlldifficulty: false },
    { 14: "Entertainment: Television", allowAlldifficulty: true },
    { 15: "Entertainment: Video Games", allowAlldifficulty: true },
    { 16: "Entertainment: Board Games", allowAlldifficulty: false },
    { 17: "Science & Nature", allowAlldifficulty: true },
    { 18: "Science: Computers", allowAlldifficulty: true },
    { 19: "Science: Mathematics", allowAlldifficulty: false },
    { 20: "Mythology", allowAlldifficulty: false },
    { 21: "Sports", allowAlldifficulty: true },
    { 22: "Geography", allowAlldifficulty: true },
    { 23: "History", allowAlldifficulty: true },
    { 24: "Politics", allowAlldifficulty: false },
    { 25: "Art", allowAlldifficulty: false },
    { 26: "Celebrities", allowAlldifficulty: false },
    { 27: "Animals", allowAlldifficulty: false },
    { 28: "Vehicles", allowAlldifficulty: false },
    { 29: "Entertainment: Comics", allowAlldifficulty: false },
    { 30: "Science: Gadgets", allowAlldifficulty: false },
    { 31: "Entertainment: Japanese Anime & Manga", allowAlldifficulty: true },
    { 32: "Entertainment: Cartoon & Animations", allowAlldifficulty: false },
];

// gets the choose category element
let selectCategories = document.getElementById("chooseCategory");

// sets the users name 
document.getElementById("setUpq_userName").textContent += sessionStorage.getItem("name")

// creates all the options for the category <select> element
categoryOptions.forEach((item) => {
    // console.log(Object.keys(item)[0]);
    const option = document.createElement("option");
    // gets the key for each object and sets it as value for option element
    option.value = Object.keys(item)[0];
    // gets the value of the key-value pair
    option.textContent = item[Object.keys(item)[0]];
    // sets the custom attribute
    option.setAttribute("data-difficulty-disabled", item.allowAlldifficulty);
    // appends the element
    selectCategories.append(option);
});

// adds event listener every time new item is selected
document.getElementById("chooseCategory").addEventListener("change", (event) => {
    // checks if the choosing difficulty is allowed
    if (!eval(document.getElementById("chooseCategory").options[document.getElementById("chooseCategory").value - 9].getAttribute("data-difficulty-disabled"))) {
        // if not then the dropdowns for choosing difficuty and number of questions gets disabled. any diffculty and 10 questions are chosen because of data limitation.
        document.getElementById("chooseDifficulty").selectedIndex = 0;
        document.getElementById("chooseDifficulty").disabled = true;

        document.getElementById("chooseNoOfQuestions").selectedIndex = 1;
        document.getElementById("chooseNoOfQuestions").disabled = true;
    }
    else {
        document.getElementById("chooseNoOfQuestions").disabled = false;
        document.getElementById("chooseDifficulty").disabled = false;
    }
});


// start quiz function
const startQuiz = () => {
    // stores num of questions chosen, quiz category, difficulty and category name to session storage
    sessionStorage.setItem("amount", document.getElementById("chooseNoOfQuestions").value);
    sessionStorage.setItem("category", document.getElementById("chooseCategory").value);
    sessionStorage.setItem("difficulty", document.getElementById("chooseDifficulty").value);
    sessionStorage.setItem("categoryName", document.getElementById("chooseCategory").options[document.getElementById("chooseCategory").value - 9].text);

    // redirects the user to quiz page
    location.href = "quiz.html";
}