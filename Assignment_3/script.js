// username nad password variables for authentication
let username = "username";
let password = "1234";

// retrieves html elements(username input box, password input box and usersName input box)
let username_input = document.getElementById("username");
let password_input = document.getElementById("password");
let users_name_input = document.getElementById("usersName");

// authenticates the user once user enters the username and password
const authenticateQuizUser = () => {
    // retrieves the value entered for username and password by the user.
    const ent_username = username_input.value;
    const ent_password = password_input.value;

    // compares the values entered by user for username and password to the username and password variables if it is true it hides the container with username and password input boxes. It also makes the container(contains an input box for user to enter their name) visible
    if (ent_username === username && ent_password === password) {
        document.getElementById("authenticateUserForm").style.display = "none";
        document.getElementById("usersnameForQuiz").style.display = "block";
    }
    else {
        // if authentication fails it displays an error message to user
        document.getElementById("loginErrorMessage").textContent = "Please enter correct credentials.";
        document.getElementById("loginErrorMessage").style.display = "block";

    }
}

// this functions stores the users name in session storage and redirects the user to setUpQuiz page
const setUpQuiz = () => {
    let users_name_value = users_name_input.value;
    users_name_value = users_name_value.charAt(0).toUpperCase() + users_name_value.slice(1)
    sessionStorage.setItem("name", users_name_value);
    location.href = "setUpQuiz.html";
}

// enables the login button if the user has inputted something in username and password input boxes
// disables the login button if nothing has been entered yet.
[username_input, password_input].forEach((item) => {
    item.addEventListener("input", () => {
        if (username_input.value && password_input.value) {
            document.getElementById("loginBtn").disabled = false;
        }
        else {
            document.getElementById("loginBtn").disabled = true;
        }
    })
});

// Enables the set up quiz button if the user has enter something in the input box for users name and disables it otherwise.
users_name_input.addEventListener("input", () => {
    if (users_name_input.value) {
        document.getElementById("startQuizBtn").disabled = false;
    }
    else {
        document.getElementById("startQuizBtn").disabled = true;
    }
});

