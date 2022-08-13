const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

//login and register form submission
////// todo : css for validations messages
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

loginForm.addEventListener("submit", () => {
  inputs = loginForm.getElementsByTagName("input");
  email = inputs[0].value;
  password = inputs[1].value;
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  inputs = registerForm.getElementsByTagName("input");
  confirmPassword();
  validatePassword();
  if (validationFailed) return;
  Uname = inputs[0].value;
  email = inputs[1].value;
  password = inputs[2].value;
});

//password validation
var validationFailed = false;
var confirmPassword = function () {
  if (
    document.getElementById("password").value ===
    document.getElementById("confirm-password").value
  ) {
    validationFailed = false;
  } else {
    console.log("wrong"); //error message
    validationFailed = true;
    return;
  }
};

//rgex validation for password
var validatePassword = function () {
  var newPassword = document.getElementById("password").value;
  var minNumberofChars = 6;
  var maxNumberofChars = 16;
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (
    newPassword.length < minNumberofChars ||
    newPassword.length > maxNumberofChars
  ) {
    console.log(
      "password should be between " +
        minNumberofChars +
        " and " +
        maxNumberofChars
    ); //error message
    validationFailed = true;
    return false;
  }
  if (!regularExpression.test(newPassword)) {
    console.log(
      "password should contain atleast one number and one special character"
    ); //error message
    validationFailed = true;
    return false;
  }
  validationFailed = false;
};
