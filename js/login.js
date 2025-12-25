///login js
let loginbutton = document.getElementById("login");
console.log(loginbutton);


if (loginbutton) {
    loginbutton.addEventListener("click", function () {
        let storedEmail = localStorage.getItem("Email");
        let storedPassword = localStorage.getItem("Password");
        let successmessage = document.getElementById("successmessage");

        let emailinput = document.getElementById("Email").value;
        let passwordinput = document.getElementById("Password").value;

        if (emailinput === storedEmail && passwordinput === storedPassword) {
            successmessage.textContent = "Login successful";
        } else {
            successmessage.textContent = "Invalid email or password ";
        }
        setInterval(() => {
            location.href = "index.html";
        }, 1500);
    });
}
