// 99 Noms d'Allah avec translittération et sens en français
const names99 = [
  // 1–10
  { name: "ٱللّٰه", translit: "Allah", meaning: "Le Dieu, Celui qui est adoré" }, // 1
  { name: "ٱلرَّحْمَٰن", translit: "Ar-Raḥmân", meaning: "Le Tout-Miséricordieux" }, // 2
  { name: "ٱلرَّحِيم", translit: "Ar-Raḥîm", meaning: "Le Très-Miséricordieux" }, // 3
  { name: "ٱلْمَلِك", translit: "Al-Malik", meaning: "Le Souverain, le Roi" }, // 4
  { name: "ٱلْقُدُّوس", translit: "Al-Quddûs", meaning: "Le Très-Saint" }, // 5
  { name: "ٱلسَّلَام", translit: "As-Salâm", meaning: "La Paix, Celui qui épargne" }, // 6
  { name: "ٱلْمُؤْمِن", translit: "Al-Mu’min", meaning: "Le Rassurant, Celui qui accorde la foi" }, // 7
  { name: "ٱلْمُهَيْمِن", translit: "Al-Muhaymin", meaning: "Le Protecteur suprême" }, // 8
  { name: "ٱلْعَزِيز", translit: "Al-‘Azîz", meaning: "Le Tout-Puissant, le Digne de gloire" }, // 9
  { name: "ٱلْجَبَّار", translit: "Al-Jabbâr", meaning: "Le Contraignant, Celui qui dompte" }, // 10

  // 11–20
  { name: "ٱلْمُتَكَبِّر", translit: "Al-Mutakabbir", meaning: "Le Suprêmement Grand" }, // 11
  { name: "ٱلْخَالِق", translit: "Al-Khâliq", meaning: "Le Créateur" }, // 12
  { name: "ٱلْبَارِئ", translit: "Al-Bâri’", meaning: "Le Producteur, Celui qui façonne du néant" }, // 13
  { name: "ٱلْمُصَوِّر", translit: "Al-Muṣawwir", meaning: "Le Formateur, Celui qui donne la forme" }, // 14
  { name: "ٱلْغَفَّار", translit: "Al-Ghaffâr", meaning: "Le Grand Pardonneur" }, // 15
  { name: "ٱلْقَهَّار", translit: "Al-Qahhâr", meaning: "Le Dominateur suprême" }, // 16
  { name: "ٱلْوَهَّاب", translit: "Al-Wahhâb", meaning: "Le Très-Donateur" }, // 17
  { name: "ٱلرَّزَّاق", translit: "Ar-Razzâq", meaning: "Le Grand Pourvoyeur" }, // 18
  { name: "ٱلْفَتَّاح", translit: "Al-Fattâḥ", meaning: "Celui qui ouvre, qui accorde la victoire" }, // 19
  { name: "ٱلْعَلِيم", translit: "Al-‘Alîm", meaning: "L’Omniscient" }, // 20

  // 21–30
  { name: "ٱلْقَابِض", translit: "Al-Qâbiḍ", meaning: "Celui qui restreint, qui retire" }, // 21
  { name: "ٱلْبَاسِط", translit: "Al-Bâsiṭ", meaning: "Celui qui étend largement Ses dons" }, // 22
  { name: "ٱلْخَافِض", translit: "Al-Khâfiḍ", meaning: "Celui qui abaisse" }, // 23
  { name: "ٱلرَّافِع", translit: "Ar-Râfi‘", meaning: "Celui qui élève" }, // 24
  { name: "ٱلْمُعِزّ", translit: "Al-Mu‘izz", meaning: "Celui qui donne la puissance et l’honneur" }, // 25
  { name: "ٱلْمُذِلّ", translit: "Al-Mudhîll", meaning: "Celui qui humilie" }, // 26
  { name: "ٱلسَّمِيع", translit: "As-Samî‘", meaning: "L’Audient, Celui qui entend tout" }, // 27
  { name: "ٱلْبَصِير", translit: "Al-Baṣîr", meaning: "Le Clairvoyant, Celui qui voit tout" }, // 28
  { name: "ٱلْحَكَم", translit: "Al-Ḥakam", meaning: "Le Juge, l’Arbitre" }, // 29
  { name: "ٱلْعَدْل", translit: "Al-‘Adl", meaning: "Le Parfaitement Juste" }, // 30

  // 31–40
  { name: "ٱللَّطِيف", translit: "Al-Laṭîf", meaning: "Le Très Subtil, le Bienveillant" }, // 31
  { name: "ٱلْخَبِير", translit: "Al-Khabîr", meaning: "Le Très Informé, le Parfaitement Connaisseur" }, // 32
  { name: "ٱلْحَلِيم", translit: "Al-Ḥalîm", meaning: "Le Très-Doux, le Longanime" }, // 33
  { name: "ٱلْعَظِيم", translit: "Al-‘Aẓîm", meaning: "Le Sublime, le Magnifique" }, // 34
  { name: "ٱلْغَفُور", translit: "Al-Ghafûr", meaning: "Le Très Pardonneur" }, // 35
  { name: "ٱلشَّكُور", translit: "Ash-Shakûr", meaning: "Le Très Reconnaissant (envers les œuvres de Ses serviteurs)" }, // 36
  { name: "ٱلْعَلِيّ", translit: "Al-‘Aliyy", meaning: "Le Très-Haut" }, // 37
  { name: "ٱلْكَبِير", translit: "Al-Kabîr", meaning: "Le Très-Grand" }, // 38
  { name: "ٱلْحَفِيظ", translit: "Al-Ḥafîẓ", meaning: "Le Gardien" }, // 39
  { name: "ٱلْمُقِيت", translit: "Al-Muqît", meaning: "Le Nourrisseur, Celui qui entretient" }, // 40

  // 41–50
  { name: "ٱلْحَسِيب", translit: "Al-Ḥasîb", meaning: "Le Suffisant, Celui qui tient compte" }, // 41
  { name: "ٱلْجَلِيل", translit: "Al-Jalîl", meaning: "Le Majestueux" }, // 42
  { name: "ٱلْكَرِيم", translit: "Al-Karîm", meaning: "Le Très Généreux, le Noble" }, // 43
  { name: "ٱلرَّقِيب", translit: "Ar-Raqîb", meaning: "Le Vigilant, Celui qui observe tout" }, // 44
  { name: "ٱلْمُجِيب", translit: "Al-Mujîb", meaning: "Celui qui répond (aux invocations)" }, // 45
  { name: "ٱلْوَاسِع", translit: "Al-Wâsi‘", meaning: "L’Immense, Celui dont la grâce englobe tout" }, // 46
  { name: "ٱلْحَكِيم", translit: "Al-Ḥakîm", meaning: "Le Parfaitement Sage" }, // 47
  { name: "ٱلْوَدُود", translit: "Al-Wadûd", meaning: "Le Très Aimant" }, // 48
  { name: "ٱلْمَجِيد", translit: "Al-Majîd", meaning: "Le Tout-Glorieux, le Très Noble" }, // 49
  { name: "ٱلْبَاعِث", translit: "Al-Bâ‘ith", meaning: "Celui qui ressuscite (les morts)" }, // 50

  // 51–60
  { name: "ٱلشَّهِيد", translit: "Ash-Shahîd", meaning: "Le Témoin" }, // 51
  { name: "ٱلْحَقّ", translit: "Al-Ḥaqq", meaning: "La Vérité" }, // 52
  { name: "ٱلْوَكِيل", translit: "Al-Wakîl", meaning: "Le Gérant, le Garant" }, // 53
  { name: "ٱلْقَوِيّ", translit: "Al-Qawiyy", meaning: "Le Très Fort" }, // 54
  { name: "ٱلْمَتِين", translit: "Al-Matîn", meaning: "Le Très Ferme, le Solidement Puissant" }, // 55
  { name: "ٱلْوَلِيّ", translit: "Al-Waliyy", meaning: "Le Protecteur, l’Ami proche" }, // 56
  { name: "ٱلْحَمِيد", translit: "Al-Ḥamîd", meaning: "Le Digne de louange" }, // 57
  { name: "ٱلْمُحْصِي", translit: "Al-Muḥṣî", meaning: "Le Comptable, Celui qui dénombre" }, // 58
  { name: "ٱلْمُبْدِئ", translit: "Al-Mubdi’", meaning: "Celui qui fait apparaître (la création) en premier" }, // 59
  { name: "ٱلْمُعِيد", translit: "Al-Mu‘îd", meaning: "Celui qui refait revenir, qui ramène" }, // 60

  // 61–70
  { name: "ٱلْمُحْيِي", translit: "Al-Muḥyî", meaning: "Celui qui donne la vie" }, // 61
  { name: "ٱلْمُمِيت", translit: "Al-Mumît", meaning: "Celui qui donne la mort" }, // 62
  { name: "ٱلْحَيّ", translit: "Al-Ḥayy", meaning: "Le Vivant" }, // 63
  { name: "ٱلْقَيُّوم", translit: "Al-Qayyûm", meaning: "Celui qui subsiste par Lui-même et fait subsister toute chose" }, // 64
  { name: "ٱلْوَاجِد", translit: "Al-Wâjid", meaning: "Celui qui trouve, qui possède tout" }, // 65
  { name: "ٱلْوَاحِد", translit: "Al-Wâḥid", meaning: "L’Unique" }, // 66
  { name: "ٱلصَّمَد", translit: "As-Ṣamad", meaning: "Le Maître absolu, Celui vers qui tout se tourne" }, // 67
  { name: "ٱلْقَادِر", translit: "Al-Qâdir", meaning: "Le Tout-Puissant, Celui qui est capable de tout" }, // 68
  { name: "ٱلْمُقْتَدِر", translit: "Al-Muqtadir", meaning: "Le Très Puissant, le Tout-Puissant en acte" }, // 69
  { name: "ٱلْمُقَدِّم", translit: "Al-Muqaddim", meaning: "Celui qui fait avancer, qui met en avant" }, // 70

  // 71–80
  { name: "ٱلْمُؤَخِّر", translit: "Al-Mu’akhkhir", meaning: "Celui qui retarde, qui met en arrière" }, // 71
  { name: "ٱلْأَوَّل", translit: "Al-Awwal", meaning: "Le Premier (sans début)" }, // 72
  { name: "ٱلْآخِر", translit: "Al-Âkhir", meaning: "Le Dernier (sans fin)" }, // 73
  { name: "ٱلظَّاهِر", translit: "Aẓ-Ẓâhir", meaning: "L’Apparent, le Manifeste" }, // 74
  { name: "ٱلْبَاطِن", translit: "Al-Bâṭin", meaning: "Le Caché, l’Intime" }, // 75
  { name: "ٱلْوَالِي", translit: "Al-Wâlî", meaning: "Le Gouverneur, le Protecteur" }, // 76
  { name: "ٱلْمُتَعَالِي", translit: "Al-Muta‘âlî", meaning: "Le Très Élevé, au-dessus de tout" }, // 77
  { name: "ٱلْبَرّ", translit: "Al-Barr", meaning: "Le Très Bon, le Bienfaiteur" }, // 78
  { name: "ٱلتَّوَّاب", translit: "At-Tawwâb", meaning: "Celui qui accueille le repentir" }, // 79
  { name: "ٱلْمُنتَقِم", translit: "Al-Muntaqim", meaning: "Celui qui châtie les injustes" }, // 80

  // 81–90
  { name: "ٱلْعَفُوّ", translit: "Al-‘Afûw", meaning: "Le Très Indulgent, Celui qui efface les fautes" }, // 81
  { name: "ٱلرَّؤُوف", translit: "Ar-Ra’ûf", meaning: "Le Très Compatissant" }, // 82
  { name: "مَالِكُ ٱلْمُلْك", translit: "Mâlik-ul-Mulk", meaning: "Le Possesseur du Royaume" }, // 83
  { name: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَام", translit: "Dhu-l-Jalâl wa-l-Ikrâm", meaning: "Le Détenteur de la Majesté et de la Générosité" }, // 84
  { name: "ٱلْمُقْسِط", translit: "Al-Muqsiṭ", meaning: "Le Très Équitable" }, // 85
  { name: "ٱلْجَامِع", translit: "Al-Jâmi‘", meaning: "Celui qui rassemble" }, // 86
  { name: "ٱلْغَنِيّ", translit: "Al-Ghaniyy", meaning: "Le Riche, Celui qui se suffit à Lui-même" }, // 87
  { name: "ٱلْمُغْنِي", translit: "Al-Mughnî", meaning: "Celui qui enrichit" }, // 88
  { name: "ٱلْمَانِع", translit: "Al-Mâni‘", meaning: "Celui qui empêche, qui protège" }, // 89
  { name: "ٱلضَّارّ", translit: "Aḍ-Ḍârr", meaning: "Celui qui peut nuire (avec sagesse et justice)" }, // 90

  // 91–99
  { name: "ٱلنَّافِع", translit: "An-Nâfi‘", meaning: "Celui qui accorde le bien et l’utilité" }, // 91
  { name: "ٱلنُّور", translit: "An-Nûr", meaning: "La Lumière" }, // 92
  { name: "ٱلْهَادِي", translit: "Al-Hâdî", meaning: "Le Guide" }, // 93
  { name: "ٱلْبَدِيع", translit: "Al-Badî‘", meaning: "L’Incomparable Innovateur" }, // 94
  { name: "ٱلْبَاقِي", translit: "Al-Bâqî", meaning: "Le Permanent, Celui qui demeure" }, // 95
  { name: "ٱلْوَارِث", translit: "Al-Wârith", meaning: "L’Héritier, Celui à qui tout revient" }, // 96
  { name: "ٱلرَّشِيد", translit: "Ar-Rashîd", meaning: "Le Guide vers la droiture" }, // 97
  { name: "ٱلصَّبُور", translit: "As-Ṣabûr", meaning: "Le Très Patient" } // 98 (Allah étant le Nom suprême compté séparément)
];
