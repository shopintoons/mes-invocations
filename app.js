// app.js

let currentView = "home"; // home | chapitre | sousChapitre | search
let currentChapitreId = null;
let currentSousChapitreId = null;

const mainView = document.getElementById("mainView");
const searchBar = document.getElementById("searchBar");
const searchToggleBtn = document.getElementById("searchToggleBtn");
const searchInput = document.getElementById("searchInput");
const searchClearBtn = document.getElementById("searchClearBtn");
const bottomNavButtons = document.querySelectorAll(".bottom-nav .nav-item");

// ---- Navigation bas ----
bottomNavButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    bottomNavButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const view = btn.getAttribute("data-view");
    if (view === "invocations") {
      showHome();
    } else {
      showSimplePage(view);
    }
  });
});

// ---- Recherche ----
if (searchToggleBtn) {
  searchToggleBtn.addEventListener("click", () => {
    searchBar.classList.toggle("hidden");
    if (!searchBar.classList.contains("hidden")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      showHome();
    }
  });
}

if (searchClearBtn) {
  searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    searchInput.focus();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();
    if (value.length === 0) {
      showHome();
    } else {
      const results = searchInvocations(value);
      showSearchResults(value, results);
    }
  });
}

// ---- Fonctions de rendu ----
function showHome() {
  currentView = "home";
  currentChapitreId = null;
  currentSousChapitreId = null;

  const grid = document.createElement("div");
  grid.className = "chapter-grid";

  invocationsData.forEach(chap => {
    const card = document.createElement("div");
    card.className = "chapter-card";
    card.dataset.id = chap.id;

    const img = document.createElement("img");
    img.src = chap.icone || "icons/default.png";
    img.alt = chap.titre;

    const title = document.createElement("div");
    title.className = "chapter-card-title";
    title.textContent = chap.titre;

    card.appendChild(img);
    card.appendChild(title);
    card.addEventListener("click", () => showChapitre(chap.id));

    grid.appendChild(card);
  });

  mainView.innerHTML = "";
  mainView.appendChild(grid);
}

function showChapitre(chapitreId) {
  currentView = "chapitre";
  currentChapitreId = chapitreId;
  const chapitre = invocationsData.find(c => c.id === chapitreId);
  if (!chapitre) return;

  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "view-header";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "←";
  backBtn.addEventListener("click", showHome);

  const title = document.createElement("div");
  title.className = "view-title";
  title.textContent = chapitre.titre;

  header.appendChild(backBtn);
  header.appendChild(title);

  const list = document.createElement("div");
  list.className = "subchapter-list";

  chapitre.sousChapitres.forEach(sc => {
    const card = document.createElement("div");
    card.className = "subchapter-card";
    card.dataset.id = sc.id;

    const t = document.createElement("div");
    t.className = "subchapter-title";
    t.textContent = sc.titre;

    const count = document.createElement("div");
    count.className = "subchapter-count";
    count.textContent = `${sc.invocations.length} invocation(s)`;

    card.appendChild(t);
    card.appendChild(count);

    card.addEventListener("click", () =>
      showSousChapitre(chapitre.id, sc.id)
    );

    list.appendChild(card);
  });

  container.appendChild(header);
  container.appendChild(list);

  mainView.innerHTML = "";
  mainView.appendChild(container);
}

function showSousChapitre(chapitreId, sousChapitreId) {
  currentView = "sousChapitre";
  currentChapitreId = chapitreId;
  currentSousChapitreId = sousChapitreId;

  const chapitre = invocationsData.find(c => c.id === chapitreId);
  if (!chapitre) return;
  const sc = chapitre.sousChapitres.find(s => s.id === sousChapitreId);
  if (!sc) return;

  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "view-header";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "←";
  backBtn.addEventListener("click", () => showChapitre(chapitreId));

  const title = document.createElement("div");
  title.className = "view-title";
  title.textContent = sc.titre;

  header.appendChild(backBtn);
  header.appendChild(title);

  const list = document.createElement("div");
  list.className = "invocation-list";

  sc.invocations.forEach(inv => {
    list.appendChild(renderInvocationCard(inv, chapitre.titre, sc.titre));
  });

  container.appendChild(header);
  container.appendChild(list);

  mainView.innerHTML = "";
  mainView.appendChild(container);
}

// Carte pour une invocation
function renderInvocationCard(inv, chapitreTitre, sousChapitreTitre) {
  const card = document.createElement("div");
  card.className = "invocation-card";

  const title = document.createElement("div");
  title.className = "invocation-title";
  title.textContent = inv.titre;

  const arabic = document.createElement("div");
  arabic.className = "invocation-arabic";
  arabic.textContent = inv.arabe || "";

  const translit = document.createElement("div");
  translit.className = "invocation-translit";
  translit.textContent = inv.transliteration || "";

  const translation = document.createElement("div");
  translation.className = "invocation-translation";
  translation.textContent = inv.traduction || "";

  const meta = document.createElement("div");
  meta.className = "invocation-meta";
  const refText = inv.reference ? ` | Réf: ${inv.reference}` : "";
  meta.textContent = `${chapitreTitre} > ${sousChapitreTitre}${refText}`;

  card.appendChild(title);
  if (inv.arabe) card.appendChild(arabic);
  if (inv.transliteration) card.appendChild(translit);
  if (inv.traduction) card.appendChild(translation);
  card.appendChild(meta);

  return card;
}

// ---- Recherche globale ----
function searchInvocations(keyword) {
  const results = [];

  invocationsData.forEach(chapitre => {
    chapitre.sousChapitres.forEach(sc => {
      sc.invocations.forEach(inv => {
        const haystack =
          (inv.titre || "") +
          " " +
          (inv.arabe || "") +
          " " +
          (inv.transliteration || "") +
          " " +
          (inv.traduction || "") +
          " " +
          (inv.motsCles || []).join(" ");

        if (haystack.toLowerCase().includes(keyword)) {
          results.push({
            chapitreTitre: chapitre.titre,
            sousChapitreTitre: sc.titre,
            invocation: inv
          });
        }
      });
    });
  });

  return results;
}

function showSearchResults(keyword, results) {
  currentView = "search";

  const container = document.createElement("div");

  const info = document.createElement("div");
  info.className = "search-info";
  info.textContent = `${results.length} résultat(s) pour « ${keyword} »`;
  container.appendChild(info);

  const list = document.createElement("div");
  list.className = "invocation-list";

  results.forEach(r => {
    list.appendChild(
      renderInvocationCard(
        r.invocation,
        r.chapitreTitre,
        r.sousChapitreTitre
      )
    );
  });

  container.appendChild(list);

  mainView.innerHTML = "";
  mainView.appendChild(container);
}

// ---- Pages simples pour les autres onglets ----
function showSimplePage(view) {
  const container = document.createElement("div");

  const title = document.createElement("div");
  title.className = "view-title";
  if (view === "coran") title.textContent = "Coran (à compléter)";
  else if (view === "priere") title.textContent = "Prière (à compléter)";
  else if (view === "99noms") title.textContent = "99 Noms (à compléter)";
  else if (view === "autre") title.textContent = "Autre (à compléter)";
  container.appendChild(title);

  const p = document.createElement("p");
  p.style.fontSize = "13px";
  p.style.marginTop = "8px";
  p.textContent =
    "On ajoutera ici plus tard le contenu correspondant.";
  container.appendChild(p);

  mainView.innerHTML = "";
  mainView.appendChild(container);
}

// ---- PWA service worker ----
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .catch(err => console.error("SW registration failed", err));
  });
}

// ---- Démarrage ----
document.addEventListener("DOMContentLoaded", () => {
  showHome();
});
