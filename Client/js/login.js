const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

//signUpButton.addEventListener("click", () => {
// container.classList.add("right-panel-active");
//});

//signInButton.addEventListener("click", () => {
// container.classList.remove("right-panel-active");
//});
window.onload = function () {
  const auth = window.localStorage.getItem("auth");
  if (auth) {
    (async () => {
      await fetch("http://127.0.0.1:2001/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth.slice(1, -1),
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.Success == true) {
            if (data.Account == "Admin") {
              window.location = "../Admin";
              return;
            }
            if (data.Account == "Clerk") {
              window.location = "../Clerk";
              return;
            }
          }
        });
    })();
  }
};
//login and register form submission
////// todo : css for validations messages
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  inputs = loginForm.getElementsByTagName("input");
  email = inputs[0].value;
  password = inputs[1].value;
  (async () => {
    await fetch("http://127.0.0.1:2001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        window.localStorage.setItem("auth", JSON.stringify(data.Access_Token));
        console.log(data); //redirect or show error
      });
  })();
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
  (async () => {
    await fetch("http://127.0.0.1:2001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: Uname, email: email, password: password }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); //redirect or show error
      });
  })();
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
