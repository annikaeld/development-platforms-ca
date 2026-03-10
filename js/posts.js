// API_BASE is defined in auth.js

let allArticles = []; // Store articles for sorting

function setupAuthUI() {
  const authBtn = document.getElementById("auth-btn");
  const writeBtn = document.getElementById("write-btn");
  const greeting = document.getElementById("user-greeting");

  if (!authBtn) return;

  if (isLoggedIn()) {
    const user = getUser();
    authBtn.textContent = "Log Out";
    authBtn.onclick = logout;
    if (writeBtn) {
      writeBtn.hidden = false;
      writeBtn.onclick = openCreateModal;
    }
    if (greeting && user) greeting.textContent = `Hello, ${user.email}`;
  } else {
    authBtn.textContent = "Log In";
    authBtn.onclick = () => {
      window.location.href = "login.html";
    };
    if (writeBtn) writeBtn.hidden = true;
    if (greeting) greeting.textContent = "";
  }
}

async function loadArticles() {
  const container = document.getElementById("articles-container");
  if (!container) return;

  container.innerHTML = '<p class="loading">Loading articles…</p>';

  try {
    const res = await fetch(`${API_BASE}/articles`);
    const data = await res.json();

    if (!res.ok) {
      container.innerHTML =
        '<p class="error-text">Failed to load articles.</p>';
      return;
    }

    // supports either [] or { articles: [] }
    const articles = Array.isArray(data) ? data : data.articles || [];

    if (!articles.length) {
      container.innerHTML =
        '<p class="no-articles">No articles yet. Be the first to write one!</p>';
      return;
    }

    allArticles = articles;
    renderArticles();
  } catch (error) {
    console.error("loadArticles error:", error);
    container.innerHTML =
      '<p class="error-text">Could not connect to the server.</p>';
  }
}

function renderArticles() {
  const container = document.getElementById("articles-container");
  if (!container) return;

  const sortSelect = document.getElementById("sort-select");
  const sortValue = sortSelect ? sortSelect.value : "date-desc";

  const sorted = sortArticles(allArticles, sortValue);

  container.innerHTML = "";
  sorted.forEach((article) => {
    container.appendChild(buildArticleCard(article));
  });
}

function sortArticles(articles, sortBy) {
  const copy = [...articles];

  switch (sortBy) {
    case "date-desc":
      return copy.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    case "date-asc":
      return copy.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    case "category-asc":
      return copy.sort((a, b) =>
        (a.category || "").localeCompare(b.category || ""),
      );
    case "category-desc":
      return copy.sort((a, b) =>
        (b.category || "").localeCompare(a.category || ""),
      );
    default:
      return copy;
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

  // Open modal on click
  card.addEventListener("click", () => openArticleModal(article));

  return card;
}

// ── Modal functions ──
let currentArticle = null; // Store current article for delete

function openArticleModal(article) {
  const modal = document.getElementById("article-modal");
  if (!modal) return;

  currentArticle = article; // Store for delete action

  const date = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("modal-category").textContent =
    article.category || "General";
  document.getElementById("modal-title").textContent = article.title || "";
  document.getElementById("modal-body").textContent = article.body || "";
  document.getElementById("modal-meta").textContent = `Published on ${date}`;

  // Show delete button only if user is the author
  const deleteBtn = document.getElementById("modal-delete-btn");
  if (deleteBtn) {
    const user = getUser();
    const isAuthor = user && article.submitted_by === user.id;
    deleteBtn.hidden = !isAuthor;
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeArticleModal() {
  const modal = document.getElementById("article-modal");
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  currentArticle = null;
}

async function deleteArticle() {
  if (!currentArticle) return;

  const confirmed = confirm("Are you sure you want to delete this article?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_BASE}/articles/${currentArticle.id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (!res.ok) {
      const data = await res.json();
      if (res.status === 401 || res.status === 403) {
        alert(data.error || "You cannot delete this article.");
        return;
      }
      alert(data.error || "Failed to delete article.");
      return;
    }

    closeArticleModal();
    loadArticles();
  } catch (error) {
    console.error("Delete error:", error);
    alert("Could not connect to the server.");
  }
}

// ── Create Article Modal ──
function openCreateModal() {
  const modal = document.getElementById("create-modal");
  if (!modal) return;

  // Reset form
  const form = document.getElementById("create-form");
  if (form) form.reset();
  const errorMsg = document.getElementById("create-error");
  const successMsg = document.getElementById("create-success");
  if (errorMsg) errorMsg.textContent = "";
  if (successMsg) successMsg.textContent = "";

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  // Focus first input
  document.getElementById("post-title")?.focus();
}

function closeCreateModal() {
  const modal = document.getElementById("create-modal");
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
}

function setupModal() {
  // Article modal
  const articleModal = document.getElementById("article-modal");
  if (articleModal) {
    articleModal
      .querySelector(".modal-backdrop")
      ?.addEventListener("click", closeArticleModal);
    articleModal
      .querySelector(".modal-close")
      ?.addEventListener("click", closeArticleModal);

    // Delete button
    const deleteBtn = document.getElementById("modal-delete-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", deleteArticle);
    }
  }

  // Create modal
  const createModal = document.getElementById("create-modal");
  if (createModal) {
    createModal
      .querySelector(".modal-backdrop")
      ?.addEventListener("click", closeCreateModal);
    createModal
      .querySelector(".modal-close")
      ?.addEventListener("click", closeCreateModal);
  }

  // Escape key closes any open modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (articleModal && !articleModal.hidden) closeArticleModal();
      if (createModal && !createModal.hidden) closeCreateModal();
    }
  });
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
      loadArticles();
      setTimeout(() => {
        closeCreateModal();
      }, 1000);
    } catch {
      errorMsg.textContent =
        "Could not connect to the server. Please try again later.";
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str || ""));
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuthUI();
  setupCreateForm();
  setupModal();
  loadArticles();

  // Sort dropdown
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", renderArticles);
  }
});
