///login js
let loginbutton = document.getElementById("login");
 let emailinput = document.getElementById("Email");
let passwordinput = document.getElementById("Password");

console.log(loginbutton);
  emailinput.addEventListener("input", () => {
            successmessage.textContent = "";
        });

        passwordinput.addEventListener("input", () => {
            successmessage.textContent = "";
        });

if (loginbutton) {
    loginbutton.addEventListener("click", function () {
        let storedEmail = localStorage.getItem("Email");
        let storedPassword = localStorage.getItem("Password");
        let successmessage = document.getElementById("successmessage");
        
    

        let emailinput = document.getElementById("Email").value;
        let passwordinput = document.getElementById("Password").value;
      
        console.log(emailinput);
        if (!emailinput || !passwordinput) {
            successmessage.textContent = "Please fill in all fields!";
            successmessage.style.color = "red";
            successmessage.style.fontWeight = "bold";
            return;
        }
        

        if (emailinput === storedEmail && passwordinput === storedPassword) {
            successmessage.textContent = "Login successful";
             setInterval(() => {
            location.href = "index.html";
        }, 1500);
            
        } else {
            successmessage.textContent = "Invalid email or password ";
            successmessage.style.color = "red";
            successmessage.style.fontWeight = "bold";
        }
       
    });
}
