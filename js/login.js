document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  if (isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorMsg.textContent = data.error || "Login failed. Please try again.";
        return;
      }

      saveAuth(data.token, data.user);
      window.location.href = "index.html";
    } catch {
      errorMsg.textContent = "Could not connect to the server. Please try again later.";
    }
  });
});
