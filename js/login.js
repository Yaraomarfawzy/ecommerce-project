///login js
let loginbutton = document.getElementById("login");
 let emailinput = document.getElementById("Email");
let passwordinput = document.getElementById("Password");
let errormessage = document.getElementById("errormessage");
let errormessage2 = document.getElementById("errormessage2");


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
        if (!emailinput) {
            errormessage.textContent = "Email is required!";
            errormessage.style.color = "red";
            errormessage.style.fontWeight = "bold";
            return;
        }
        
        if (!passwordinput) {
            errormessage2.textContent = "Password is required!";
            errormessage2.style.color = "red";
            errormessage2.style.fontWeight = "bold";
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
