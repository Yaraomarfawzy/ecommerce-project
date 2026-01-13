///login js
// js/login.js

const loginButton    = document.getElementById("login");
const emailField     = document.getElementById("Email");
const passwordField  = document.getElementById("Password");

const errorEmail     = document.getElementById("errormessage");
const errorPassword  = document.getElementById("errormessage2");
const successMessage = document.getElementById("successmessage");

// نظف الرسائل لما يبدأ يكتب
emailField.addEventListener("input", () => {
  errorEmail.textContent = "";
  successMessage.textContent = "";
});

passwordField.addEventListener("input", () => {
  errorPassword.textContent = "";
  successMessage.textContent = "";
});

if (loginButton) {
  loginButton.addEventListener("click", async () => {
    // نظف كل الرسائل أول حاجة
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    successMessage.textContent = "";

    const email    = emailField.value.trim();
    const password = passwordField.value.trim();

    if (!email) {
      errorEmail.textContent = "الإيميل مطلوب!";
      errorEmail.style.color = "red";
      return;
    }

    if (!password) {
      errorPassword.textContent = "كلمة المرور مطلوبة!";
      errorPassword.style.color = "red";
      return;
    }

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        // غالبًا 401 Unauthorized أو 400
        const errData = await response.json().catch(() => ({}));
        errorEmail.textContent = errData.message || "الإيميل أو كلمة المرور غير صحيحة!";
        errorEmail.style.color = "red";
        return;
      }

      const data = await response.json();

      // حفظ التوكنات في localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      successMessage.textContent = "تم تسجيل الدخول بنجاح! جاري التحويل...";
      successMessage.style.color = "lime";
      successMessage.style.fontWeight = "bold";

      // نقل بعد 1.5 ثانية (مرة واحدة بس)
      setTimeout(() => {
        window.location.href = "index.html"; // أو dashboard.html أو أي صفحة بعد الدخول
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      errorEmail.textContent = "مشكلة في الاتصال بالسيرفر، تأكد من الإنترنت";
      errorEmail.style.color = "red";
    }

    console.log(access_token);
    
  });
}
