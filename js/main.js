let registerbutton = document.getElementById("RegisterButton");

let emailField = document.getElementById("Email");
let passwordField = document.getElementById("Password");

let errormessage = document.getElementById("errormessage");
let errormessage2 = document.getElementById("errormessage2");
let successmessage = document.getElementById("successmessage");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;


emailField.addEventListener("input", () => {
    errormessage.textContent = "";
});

passwordField.addEventListener("input", () => {
    errormessage.textContent = "";
    errormessage2.textContent = "";
});


registerbutton.addEventListener("click", function () {
    let emailinput = emailField.value.trim();
    let passwordinput = passwordField.value.trim();

    errormessage.textContent = "";
    errormessage2.textContent = "";
    successmessage.textContent = "";

    if (emailinput === "" || passwordinput === "") {
        errormessage.textContent = "Please fill in all fields!";
        errormessage.style.color = "red";
        errormessage.style.fontWeight = "bold";
        return;
    }

    if (emailinput.length < 6) {
        errormessage.textContent = "Email must be at least 6 characters!";
        errormessage.style.color = "red";
        errormessage.style.fontWeight = "bold";
        return;
    }

    if (!emailRegex.test(emailinput)) {
        errormessage.textContent = "Invalid email address!";
        errormessage.style.color = "red";
        errormessage.style.fontWeight = "bold";
        return;
    }

    if (!passwordRegex.test(passwordinput)) {
        errormessage2.textContent =
            "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.";
        errormessage2.style.color = "red";
        errormessage2.style.fontWeight = "bold";
        return;
    }

    localStorage.setItem("Email", emailinput);
    localStorage.setItem("Password", passwordinput);

    successmessage.textContent = "Registration successful!";
    successmessage.style.color = "green";
    successmessage.style.fontWeight = "bold";

    setTimeout(() => {
        location.href = "login.html";
    }, 1500);
});
