// sets key value pair variable for all the categroies of quiz
let categoryOptions = {
    9: "General Knowledge",
    10: "Entertainment: Books",
    11: "Entertainment: Film",
    z: "Entertainment: Music",
    13: "Entertainment: Musicals & Theatres",
    14: "Entertainment: Television",
    15: "Entertainment: Video Games",
    16: "Entertainment: Board Games",
    17: "Science & Nature",
    18: "Science: Computers",
    19: "Science: Mathematics",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
    29: "Entertainment: Comics",
    30: "Science: Gadgets",
    31: "Entertainment: Japanese Anime & Manga",
    32: "Entertainment: Cartoon & Animations",
};

// gets the choose category element
let selectCategories = document.getElementById("chooseCategory");

// sets the users name 
document.getElementById("setUpq_userName").textContent += sessionStorage.getItem("name")

// creates all the options for the category <select> element
Object.keys(categoryOptions).forEach(k => {
    const option = document.createElement("option");
    option.value = k;
    option.textContent = categoryOptions[k];
    selectCategories.append(option);
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