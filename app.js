// app.js

let currentView = "home"; // home | chapitre | sousChapitre | search
let currentChapitreId = null;
let currentSousChapitreId = null;

const mainView = document.getElementById("mainView");

// Libellés courts pour les chapitres
const chapitreLabels = {
  "chapitre_1": "Sommeil",
  "chapitre_2": "Matin et soir",
  "chapitre_3": "purifications",
  "chapitre_4": "prière",
  "chapitre_5": "jeûne",
  "chapitre_6": "pèlerinage",
  "chapitre_7": "évènements naturels",
  "chapitre_8": "salut",
  "chapitre_9": "l’argent",
  "chapitre_10": "invocations adressées aux gens",
  "chapitre_11": "invocations liées aux évènements heureux ou malheureux",
  "chapitre_12": "invocations protectrices",
  "chapitre_13": "invocations liées à la nourriture et la boisson",
  "chapitre_14": "invocations liées au mariage et aux enfants",
  "chapitre_15": "invocations liées aux états d’âme",
  "chapitre_16": "invocations liées à la maladie",
  "chapitre_17": "invocations liées à la mort",
  "chapitre_18": "invocations liées aux lieux",
  "chapitre_19": "invocations liées aux sorties et voyages"
};

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
} else if (view === "coran") {
  showQuranHome();
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

    // Utilise le libellé court si défini, sinon le titre complet
    const label = chapitreLabels[chap.id] || chap.titre;
    title.textContent = label;

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

  // --- Header avec bouton retour + titre du chapitre ---
  const header = document.createElement("div");
  header.className = "view-header";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "←";
  backBtn.addEventListener("click", showHome);

  const title = document.createElement("div");
  title.className = "view-title";

  // Nom court du chapitre (Sommeil, Matin etc.)
  const headerLabel = chapitreLabels[chapitre.id] || chapitre.titre;
  title.textContent = headerLabel;

  header.appendChild(backBtn);
  header.appendChild(title);

  // --- Liste directe de toutes les invocations du chapitre ---
  const list = document.createElement("div");
  list.className = "invocation-list";

  chapitre.sousChapitres.forEach(sc => {
    sc.invocations.forEach(inv => {
      list.appendChild(
        renderInvocationCard(inv, chapitre.titre, sc.titre)
      );
    });
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
// ---- Affichage du Coran ----

// Page : liste des 114 sourates
async function showQuranHome() {
  currentView = "coran";

  const container = document.createElement("div");

  const title = document.createElement("div");
  title.className = "view-title";
  title.textContent = "Coran";
  container.appendChild(title);

  const list = document.createElement("div");
  list.className = "subchapter-list";

  const loading = document.createElement("div");
  loading.className = "search-info";
  loading.textContent = "Chargement des sourates...";
  list.appendChild(loading);

  container.appendChild(list);

  mainView.innerHTML = "";
  mainView.appendChild(container);

  try {
    const chapters = await getQuranChapters();

    list.innerHTML = ""; // on enlève le texte “chargement...”

    chapters.forEach(ch => {
      const card = document.createElement("div");
      card.className = "subchapter-card";
      card.dataset.id = ch.id;

      const t = document.createElement("div");
      t.className = "subchapter-title";
      t.textContent = `${ch.id}. ${ch.name} (${ch.translation})`;

      const count = document.createElement("div");
      count.className = "subchapter-count";
      count.textContent = `${ch.total_verses} verset(s)`;

      card.appendChild(t);
      card.appendChild(count);

      card.addEventListener("click", () => showSurah(ch.id));

      list.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    list.innerHTML = "";
    const err = document.createElement("div");
    err.className = "search-info";
    err.textContent =
      "Erreur lors du chargement du Coran. Vérifie ta connexion internet.";
    list.appendChild(err);
  }
}

// Page : une sourate complète
async function showSurah(surahId) {
  currentView = "coran-sourate";

  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "view-header";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "←";
  backBtn.addEventListener("click", showQuranHome);

  const title = document.createElement("div");
  title.className = "view-title";
  title.textContent = "Sourate " + surahId;

  header.appendChild(backBtn);
  header.appendChild(title);

  const list = document.createElement("div");
  list.className = "invocation-list";

  const loading = document.createElement("div");
  loading.className = "search-info";
  loading.textContent = "Chargement de la sourate...";
  list.appendChild(loading);

  container.appendChild(header);
  container.appendChild(list);

  mainView.innerHTML = "";
  mainView.appendChild(container);

  try {
    const surah = await getSurahById(surahId);
    if (!surah) {
      list.innerHTML = "";
      const err = document.createElement("div");
      err.className = "search-info";
      err.textContent = "Sourate introuvable.";
      list.appendChild(err);
      return;
    }

    // Met à jour le titre avec le nom de la sourate
    title.textContent = `${surah.id}. ${surah.name} (${surah.translation})`;

    list.innerHTML = "";

    surah.verses.forEach(v => {
      const card = document.createElement("div");
      card.className = "invocation-card";

      const num = document.createElement("div");
      num.className = "invocation-meta";
      num.textContent = `Verset ${v.id}`;

      const arabic = document.createElement("div");
      arabic.className = "invocation-arabic";
      arabic.textContent = v.text;

      const translation = document.createElement("div");
      translation.className = "invocation-translation";
      translation.textContent = v.translation;

      card.appendChild(num);
      card.appendChild(arabic);
      card.appendChild(translation);

      list.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    list.innerHTML = "";
    const err = document.createElement("div");
    err.className = "search-info";
    err.textContent =
      "Erreur lors du chargement de la sourate. Vérifie ta connexion internet.";
    list.appendChild(err);
  }
}
// ---- Horaires de prière ----

const PRAYER_API_BASE = "https://api.aladhan.com/v1/timingsByCity";

async function fetchPrayerTimes(city = "Lyon", country = "France") {
  const url =
    `${PRAYER_API_BASE}?city=${encodeURIComponent(city)}` +
    `&country=${encodeURIComponent(country)}&method=12`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error("Erreur API horaires de prière");
  }
  const data = await resp.json();
  if (data.code !== 200) {
    throw new Error("Réponse invalide API");
  }
  return data.data; // contient date + timings
}

function showPrayerPage() {
  currentView = "priere";

  const container = document.createElement("div");

  const title = document.createElement("div");
  title.className = "view-title";
  title.textContent = "Horaires de prière";
  container.appendChild(title);

  // ---- Formulaire ville ----
  const form = document.createElement("div");
  form.style.marginTop = "8px";
  form.style.marginBottom = "12px";
  form.style.fontSize = "13px";

  const label = document.createElement("label");
  label.textContent = "Ville : ";
  label.setAttribute("for", "prayerCityInput");

  const input = document.createElement("input");
  input.id = "prayerCityInput";
  input.type = "text";
  input.placeholder = "Ex : Lyon, Paris...";
  input.style.padding = "4px 6px";
  input.style.borderRadius = "4px";
  input.style.border = "1px solid #ccc";

  const savedCity = localStorage.getItem("prayerCity") || "Lyon";
  input.value = savedCity;

  const btn = document.createElement("button");
  btn.textContent = "Mettre à jour";
  btn.style.marginLeft = "8px";
  btn.style.padding = "4px 8px";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.backgroundColor = "#00897b";
  btn.style.color = "#fff";
  btn.style.fontSize = "12px";

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(btn);

  container.appendChild(form);

  // ---- Zone d'affichage des horaires ----
  const info = document.createElement("div");
  info.className = "search-info";
  info.textContent = "Chargement des horaires...";
  container.appendChild(info);

  const list = document.createElement("div");
  list.className = "invocation-list";
  container.appendChild(list);

  mainView.innerHTML = "";
  mainView.appendChild(container);

  async function load(cityName) {
    info.textContent = "Chargement des horaires...";
    list.innerHTML = "";

    try {
      const data = await fetchPrayerTimes(cityName, "France");
      const t = data.timings;
      const dateText = data.date.readable;

      info.textContent = `${cityName} – ${dateText}`;

      const rows = [
        ["Fajr", t.Fajr],
        ["Chourouq", t.Sunrise],
        ["Dhuhr", t.Dhuhr],
        ["Asr", t.Asr],
        ["Maghrib", t.Maghrib],
        ["Isha", t.Isha]
      ];

      rows.forEach(([label, time]) => {
        const card = document.createElement("div");
        card.className = "invocation-card";

        const nameEl = document.createElement("div");
        nameEl.className = "invocation-title";
        nameEl.textContent = label;

        const timeEl = document.createElement("div");
        timeEl.className = "invocation-meta";
        timeEl.textContent = time;

        card.appendChild(nameEl);
        card.appendChild(timeEl);
        list.appendChild(card);
      });
    } catch (e) {
      console.error(e);
      info.textContent =
        "Erreur lors du chargement des horaires. Vérifie ta connexion internet.";
      list.innerHTML = "";
    }
  }

  // Charger les horaires au démarrage
  load(savedCity);

  // Quand on clique sur "Mettre à jour"
  btn.addEventListener("click", () => {
    const cityName = input.value.trim() || "Lyon";
    localStorage.setItem("prayerCity", cityName);
    load(cityName);
  });
}

// ---- Pages simples pour les autres onglets ----
function showSimplePage(view) {
  // Cas spécial : on a une vraie page pour la prière
  if (view === "priere") {
    showPrayerPage();
    return;
  }

  const container = document.createElement("div");

  const title = document.createElement("div");
  title.className = "view-title";
  if (view === "99noms") title.textContent = "99 Noms (à compléter)";
  else if (view === "autre") title.textContent = "Autre (à compléter)";
  else title.textContent = "(à compléter)";
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


// ---- PWA service worker (désactivé temporairement pour éviter le vieux cache) ----
/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .catch(err => console.error("SW registration failed", err));
  });
}
*/


// ---- Démarrage ----
document.addEventListener("DOMContentLoaded", () => {
  showHome();
});
