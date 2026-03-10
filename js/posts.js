document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
  setupAuthUI();
  setupCreateForm();
});

function setupAuthUI() {
  const authBtn = document.getElementById("auth-btn");
  const createSection = document.getElementById("create-section");

  if (isLoggedIn()) {
    const user = getUser();
    authBtn.textContent = "Log Out";
    authBtn.addEventListener("click", logout);
    if (createSection) createSection.hidden = false;
    const greeting = document.getElementById("user-greeting");
    if (greeting && user) greeting.textContent = `Hello, ${user.email}`;
  } else {
    authBtn.textContent = "Log In";
    authBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
    if (createSection) createSection.hidden = true;
  }
}

async function loadArticles() {
  const container = document.getElementById("articles-container");
  container.innerHTML = '<p class="loading">Loading articles…</p>';

  try {
    const res = await fetch(`${API_BASE}/articles`);
    const articles = await res.json();

    if (!res.ok) {
      container.innerHTML = '<p class="error-text">Failed to load articles.</p>';
      return;
    }

    if (!articles.length) {
      container.innerHTML = '<p class="no-articles">No articles yet. Be the first to write one!</p>';
      return;
    }

    container.innerHTML = "";
    articles
      .reverse()
      .forEach((article) => {
        container.appendChild(buildArticleCard(article));
      });
  } catch {
    container.innerHTML = '<p class="error-text">Could not connect to the server.</p>';
  }
}

function buildArticleCard(article) {
  const card = document.createElement("article");
  card.className = "article-card";

  const date = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  card.innerHTML = `
    <span class="article-category">${escapeHtml(article.category)}</span>
    <h2 class="article-title">${escapeHtml(article.title)}</h2>
    <p class="article-body">${escapeHtml(article.body)}</p>
    <p class="article-meta">Published on ${date}</p>
  `;
  return card;
}

function setupCreateForm() {
  const form = document.getElementById("create-form");
  const errorMsg = document.getElementById("create-error");
  const successMsg = document.getElementById("create-success");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";
    successMsg.textContent = "";

    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();
    const category = document.getElementById("post-category").value.trim();

    if (!title || !body || !category) {
      errorMsg.textContent = "All fields are required.";
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/articles`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ title, body, category }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          clearAuth();
          window.location.href = "login.html";
          return;
        }
        errorMsg.textContent = data.error || "Failed to create article.";
        return;
      }

      successMsg.textContent = "Article published!";
      form.reset();
      setTimeout(() => {
        successMsg.textContent = "";
      }, 3000);
      loadArticles();
    } catch {
      errorMsg.textContent = "Could not connect to the server. Please try again later.";
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
