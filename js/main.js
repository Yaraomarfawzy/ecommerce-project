let registerbutton = document.getElementById("RegisterButton");
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

registerbutton.addEventListener("click", function () {
    let emailinput = document.getElementById("Email").value;
    let passwordinput = document.getElementById("Password").value;
    let errormessage = document.getElementById("errormessage");
    let errormessage2 = document.getElementById("errormessage2");
    let successmessage = document.getElementById("successmessage");

    if (!emailRegex.test(emailinput)) {
        errormessage.textContent = "Invalid email address!";
        errormessage.style.color = "red";
        errormessage.style.fontWeight = "bold";
        // else {
        //     errormessage.textContent = "valid email address!";
        // errormessage.style.color = "red";
        // errormessage.style.fontWeight = "bold";
        // }
        return;
    }
    if (!passwordRegex.test(passwordinput)) {
        errormessage2.textContent = "Password must be at least 8 characters, including uppercase, lowercase, a number, and a symbol.";
        errormessage2.style.color = "red";
        errormessage2.style.fontWeight = "bold";
        return;
    }
    

    localStorage.setItem("Email", emailinput);
    localStorage.setItem("Password", passwordinput);

    console.log(emailinput, passwordinput);
    successmessage.textContent = "Registration successful!";
    successmessage.style.color = "green";
    successmessage.style.fontWeight = "bold";
    setInterval(() => {
    location.href = "../page/login.html";
    }, 1500);

});


