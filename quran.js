// quran.js
// Charge tout le Coran (arabe + traduction FR) depuis un JSON public
// Source : all-quran (fichier quran_fr.json sur jsDelivr)

const QURAN_URL = "https://cdn.jsdelivr.net/npm/all-quran@0.0.2/dist/quran_fr.json";

let quranData = null; // contiendra les 114 sourates

// Charge le JSON une seule fois et le garde en mémoire
async function loadQuran() {
  if (quranData) return quranData;

  const resp = await fetch(QURAN_URL);
  if (!resp.ok) {
    throw new Error("Impossible de charger le Coran");
  }
  quranData = await resp.json();
  return quranData;
}

// Renvoie la liste des sourates (pour l’écran “liste des sourates”)
async function getQuranChapters() {
  const data = await loadQuran();
  // data est un tableau de 114 objets
  return data.map(surah => ({
    id: surah.id,
    name: surah.name, // nom arabe
    transliteration: surah.transliteration,
    translation: surah.translation, // nom français
    total_verses: surah.total_verses
  }));
}

// Renvoie UNE sourate avec tous ses versets
async function getSurahById(id) {
  const data = await loadQuran();
  const num = Number(id);
  return data.find(s => s.id === num);
}

