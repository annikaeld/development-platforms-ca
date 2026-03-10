document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const errorMsg = document.getElementById("error-msg");
  const successMsg = document.getElementById("success-msg");

  if (isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";
    successMsg.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorMsg.textContent = data.error || "Registration failed. Please try again.";
        return;
      }

      successMsg.textContent = "Account created! Redirecting to login…";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } catch {
      errorMsg.textContent = "Could not connect to the server. Please try again later.";
    }
  });
});
