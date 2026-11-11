'use strict';

/* =========================================================
   BANK SOAL & KONTEN SEJARAH – Penjaga Kebun Nusantara
   Setiap soal: s = mapel, era = zaman (khusus Sejarah),
   a = indeks jawaban benar (sebelum diacak),
   id / en = teks bahasa Indonesia / Inggris:
     q = pertanyaan, o = pilihan, e = pembahasan
   ========================================================= */

const SUBJECTS = {
  sejarah:   { color: '#9C2F2F', emo: '📜', id: 'Sejarah', en: 'History' },
  mtk:       { color: '#2F6FB0', emo: '➗', id: 'Matematika', en: 'Mathematics' },
  bindo:     { color: '#A84A14', emo: '📝', id: 'B. Indonesia', en: 'Indonesian' },
  bing:      { color: '#6B3FA0', emo: '💬', id: 'B. Inggris', en: 'English' },
  pancasila: { color: '#7A5D00', emo: '🦅', id: 'Pancasila', en: 'Pancasila' },
  kik:       { color: '#1F7A63', emo: '💡', id: 'KIK', en: 'KIK (Entrepreneurship)' },
  rpl:       { color: '#34405A', emo: '💻', id: 'Kejuruan RPL', en: 'Software Eng. (RPL)' }
};

/* Peluang muncul tiap mapel. Sejarah ditonjolkan. */
const SUBJECT_WEIGHT = { sejarah: 40, mtk: 10, bindo: 10, bing: 10, pancasila: 10, kik: 10, rpl: 10 };

/* ---------- 5 zaman = 5 hari ---------- */
const ERAS = [
  {
    emo: '🏯', years: { id: 'Abad ke-7 sampai ke-15', en: '7th to 15th century' },
    name: { id: 'Kerajaan Nusantara', en: 'Kingdoms of the Archipelago' },
    story: {
      id: 'Kerajaan Sriwijaya menguasai jalur laut dari Sumatra, lalu Majapahit di Jawa Timur menyatukan banyak wilayah Nusantara. Kerajaan-kerajaan ini makmur berkat perdagangan dan pertanian padi.',
      en: 'The Srivijaya kingdom ruled the sea routes from Sumatra, and later Majapahit in East Java united much of the archipelago. These kingdoms prospered through trade and rice farming.'
    },
    effect: { id: 'Kerajaan agraris: padi dan pisang bisa ditanam.', en: 'Agrarian kingdoms: rice and bananas can be planted.' }
  },
  {
    emo: '⛵', years: { id: '1511 sampai 1799', en: '1511 to 1799' },
    name: { id: 'Jalur Rempah dan VOC', en: 'The Spice Route and the VOC' },
    story: {
      id: 'Rempah Nusantara seperti pala dan cengkih diburu bangsa Eropa. Portugis merebut Malaka pada 1511, lalu Belanda mendirikan VOC pada 1602 dan memonopoli perdagangan rempah.',
      en: 'Spices such as nutmeg and cloves drew Europeans to the archipelago. Portugal captured Malacca in 1511, then the Dutch founded the VOC in 1602 and monopolised the spice trade.'
    },
    effect: { id: 'Jagung dan cabai yang dibawa bangsa Eropa dari Amerika pada abad ke-16 kini bisa ditanam.', en: 'Corn and chili, brought from the Americas by Europeans in the 16th century, can now be planted.' }
  },
  {
    emo: '⛓️', years: { id: '1830 sampai 1870', en: '1830 to 1870' },
    name: { id: 'Masa Tanam Paksa', en: 'The Forced Cultivation System' },
    story: {
      id: 'Gubernur Jenderal Johannes van den Bosch menerapkan Tanam Paksa (Cultuurstelsel). Petani wajib menyisihkan seperlima tanahnya untuk tanaman ekspor seperti kopi, tebu, dan nila.',
      en: 'Governor-General Johannes van den Bosch introduced the Cultivation System (Cultuurstelsel). Farmers had to set aside one fifth of their land for export crops such as coffee, sugarcane, and indigo.'
    },
    effect: { id: 'Kopi dan tebu bisa ditanam. Aturan Tanam Paksa: setiap panen kelima diserahkan kepada pemerintah kolonial.', en: 'Coffee and sugarcane unlocked. Forced Cultivation rule: every fifth harvest is handed to the colonial government.' }
  },
  {
    emo: '✊', years: { id: '1901 sampai 1928', en: '1901 to 1928' },
    name: { id: 'Pergerakan Nasional', en: 'The National Awakening' },
    story: {
      id: 'Politik Etis (1901) membawa program edukasi, irigasi, dan emigrasi. Kaum terpelajar mendirikan Budi Utomo pada 1908, dan para pemuda mengikrarkan Sumpah Pemuda pada 1928.',
      en: 'The Ethical Policy (1901) brought education, irrigation, and emigration programmes. Educated Indonesians founded Budi Utomo in 1908, and young people declared the Youth Pledge in 1928.'
    },
    effect: { id: 'Program irigasi: air di tanah bertahan 30% lebih lama.', en: 'Irrigation programme: water stays in the soil 30% longer.' }
  },
  {
    emo: '🇮🇩', years: { id: '1945', en: '1945' },
    name: { id: 'Proklamasi Kemerdekaan', en: 'Proclamation of Independence' },
    story: {
      id: 'Soekarno dan Mohammad Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945. Rakyat bersatu mempertahankannya, termasuk dalam Pertempuran Surabaya pada 10 November 1945.',
      en: 'Soekarno and Mohammad Hatta proclaimed Indonesian independence on 17 August 1945. The people united to defend it, including in the Battle of Surabaya on 10 November 1945.'
    },
    effect: { id: 'Semangat kemerdekaan: semua harga jual naik 30%.', en: 'Spirit of independence: all selling prices rise 30%.' }
  }
];

/* ---------- Kartu Arsip Sejarah (2 per zaman) ---------- */
const ARCHIVE = [
  { era: 1, emo: '⛵', id: { t: 'Sriwijaya', f: 'Kerajaan maritim di Sumatra yang berpusat di sekitar Palembang. Prasasti Kedukan Bukit (682 M) menjadi salah satu bukti tertuanya.' }, en: { t: 'Srivijaya', f: 'A maritime kingdom in Sumatra centred around Palembang. The Kedukan Bukit inscription (682 CE) is one of its oldest records.' } },
  { era: 1, emo: '🏯', id: { t: 'Majapahit', f: 'Didirikan Raden Wijaya pada 1293. Mahapatih Gajah Mada mengucapkan Sumpah Palapa untuk menyatukan Nusantara.' }, en: { t: 'Majapahit', f: 'Founded by Raden Wijaya in 1293. Chief minister Gajah Mada swore the Palapa Oath to unite the archipelago.' } },
  { era: 2, emo: '🌰', id: { t: 'Jalur Rempah', f: 'Pala, cengkih, dan lada dari Maluku dan Sumatra diburu bangsa Eropa. Portugis menguasai Malaka pada 1511.' }, en: { t: 'Spice Route', f: 'Nutmeg, cloves, and pepper from Maluku and Sumatra drew Europeans. Portugal took Malacca in 1511.' } },
  { era: 2, emo: '🚢', id: { t: 'VOC', f: 'Kongsi dagang Belanda yang didirikan pada 1602. Sejak 1619 pusatnya di Batavia. VOC dibubarkan pada akhir 1799.' }, en: { t: 'VOC', f: 'The Dutch East India Company, founded in 1602. From 1619 its base was Batavia. It was dissolved at the end of 1799.' } },
  { era: 3, emo: '⛓️', id: { t: 'Tanam Paksa', f: 'Dicetuskan Gubernur Jenderal Johannes van den Bosch pada 1830. Petani wajib menanam tanaman ekspor seperti kopi, tebu, dan nila.' }, en: { t: 'Forced Cultivation', f: 'Introduced by Governor-General Johannes van den Bosch in 1830. Farmers were forced to grow export crops such as coffee, sugarcane, and indigo.' } },
  { era: 3, emo: '📕', id: { t: 'Max Havelaar', f: 'Novel karya Multatuli (Eduard Douwes Dekker) yang terbit pada 1860 dan mengkritik penderitaan rakyat akibat sistem kolonial.' }, en: { t: 'Max Havelaar', f: 'A novel by Multatuli (Eduard Douwes Dekker), published in 1860, criticising the suffering caused by the colonial system.' } },
  { era: 4, emo: '🎓', id: { t: 'Budi Utomo', f: 'Didirikan pada 20 Mei 1908 oleh pelajar STOVIA. Tanggal ini diperingati sebagai Hari Kebangkitan Nasional.' }, en: { t: 'Budi Utomo', f: 'Founded on 20 May 1908 by STOVIA students. The date is celebrated as National Awakening Day.' } },
  { era: 4, emo: '🤝', id: { t: 'Sumpah Pemuda', f: 'Diikrarkan pada Kongres Pemuda II, 28 Oktober 1928: satu tanah air, satu bangsa, dan menjunjung bahasa persatuan, bahasa Indonesia.' }, en: { t: 'Youth Pledge', f: 'Declared at the Second Youth Congress on 28 October 1928: one homeland, one nation, and upholding the language of unity, Indonesian.' } },
  { era: 5, emo: '📢', id: { t: 'Proklamasi', f: 'Dibacakan Soekarno didampingi Mohammad Hatta pada 17 Agustus 1945 di Jalan Pegangsaan Timur 56, Jakarta.' }, en: { t: 'Proclamation', f: 'Read by Soekarno, accompanied by Mohammad Hatta, on 17 August 1945 at Jalan Pegangsaan Timur 56, Jakarta.' } },
  { era: 5, emo: '🎖️', id: { t: 'Hari Pahlawan', f: 'Pertempuran Surabaya pada 10 November 1945 diperingati setiap tahun sebagai Hari Pahlawan.' }, en: { t: 'Heroes Day', f: 'The Battle of Surabaya on 10 November 1945 is commemorated every year as Heroes Day.' } }
];

/* ---------- Bank soal ---------- */
const QUESTIONS = [
  /* ===== SEJARAH: Zaman 1 ===== */
  { s: 'sejarah', era: 1, a: 0,
    id: { q: 'Kerajaan maritim yang berpusat di Sumatra (sekitar Palembang) sejak abad ke-7 adalah...', o: ['Sriwijaya', 'Majapahit', 'Mataram Kuno', 'Kutai'], e: 'Sriwijaya adalah kerajaan maritim yang menguasai jalur perdagangan Selat Malaka dan berpusat di sekitar Palembang.' },
    en: { q: 'Which maritime kingdom, centred in Sumatra (around Palembang), arose in the 7th century?', o: ['Srivijaya', 'Majapahit', 'Ancient Mataram', 'Kutai'], e: 'Srivijaya was a maritime kingdom that controlled trade through the Strait of Malacca, centred around Palembang.' } },
  { s: 'sejarah', era: 1, a: 0,
    id: { q: 'Sumpah Palapa untuk menyatukan Nusantara diucapkan oleh...', o: ['Gajah Mada', 'Hayam Wuruk', 'Raden Wijaya', 'Ken Arok'], e: 'Gajah Mada, mahapatih Majapahit, bersumpah tidak akan menikmati palapa sebelum Nusantara bersatu.' },
    en: { q: 'Who swore the Palapa Oath to unite the archipelago?', o: ['Gajah Mada', 'Hayam Wuruk', 'Raden Wijaya', 'Ken Arok'], e: 'Gajah Mada, chief minister of Majapahit, swore not to enjoy palapa until the archipelago was united.' } },
  { s: 'sejarah', era: 1, a: 0,
    id: { q: 'Siapa pendiri Kerajaan Majapahit pada 1293?', o: ['Raden Wijaya', 'Gajah Mada', 'Hayam Wuruk', 'Airlangga'], e: 'Raden Wijaya mendirikan Majapahit pada 1293 setelah mengusir pasukan Mongol dari Jawa.' },
    en: { q: 'Who founded the Majapahit kingdom in 1293?', o: ['Raden Wijaya', 'Gajah Mada', 'Hayam Wuruk', 'Airlangga'], e: 'Raden Wijaya founded Majapahit in 1293 after driving the Mongol forces out of Java.' } },
  { s: 'sejarah', era: 1, a: 0,
    id: { q: 'Candi Borobudur dibangun pada masa Dinasti...', o: ['Syailendra', 'Sanjaya', 'Rajasa', 'Isyana'], e: 'Borobudur adalah candi Buddha yang dibangun pada masa Dinasti Syailendra sekitar abad ke-8 sampai ke-9.' },
    en: { q: 'Borobudur Temple was built under which dynasty?', o: ['Sailendra', 'Sanjaya', 'Rajasa', 'Isyana'], e: 'Borobudur is a Buddhist temple built under the Sailendra dynasty around the 8th to 9th century.' } },
  { s: 'sejarah', era: 1, a: 0,
    id: { q: 'Kerajaan Hindu tertua di Indonesia, berdasarkan prasasti Yupa, adalah...', o: ['Kutai', 'Tarumanegara', 'Sriwijaya', 'Kediri'], e: 'Prasasti Yupa dari Kutai di Kalimantan Timur adalah bukti tertua kerajaan Hindu di Indonesia.' },
    en: { q: 'According to the Yupa inscriptions, the oldest Hindu kingdom in Indonesia is...', o: ['Kutai', 'Tarumanegara', 'Srivijaya', 'Kediri'], e: 'The Yupa inscriptions of Kutai in East Kalimantan are the oldest evidence of a Hindu kingdom in Indonesia.' } },

  /* ===== SEJARAH: Zaman 2 ===== */
  { s: 'sejarah', era: 2, a: 0,
    id: { q: 'Bangsa Eropa yang menguasai Malaka pada 1511 adalah...', o: ['Portugis', 'Belanda', 'Inggris', 'Spanyol'], e: 'Portugis di bawah Alfonso de Albuquerque merebut Malaka pada 1511.' },
    en: { q: 'Which European nation captured Malacca in 1511?', o: ['Portugal', 'The Netherlands', 'England', 'Spain'], e: 'The Portuguese under Afonso de Albuquerque captured Malacca in 1511.' } },
  { s: 'sejarah', era: 2, a: 0,
    id: { q: 'VOC didirikan pada tahun...', o: ['1602', '1511', '1799', '1830'], e: 'VOC (Vereenigde Oostindische Compagnie) didirikan pada 1602 dan dibubarkan pada akhir 1799.' },
    en: { q: 'In which year was the VOC founded?', o: ['1602', '1511', '1799', '1830'], e: 'The VOC (Dutch East India Company) was founded in 1602 and dissolved at the end of 1799.' } },
  { s: 'sejarah', era: 2, a: 0,
    id: { q: 'Sejak 1619, pusat kekuasaan VOC di Nusantara berada di...', o: ['Batavia', 'Malaka', 'Banten', 'Surabaya'], e: 'Jan Pieterszoon Coen merebut Jayakarta pada 1619 dan mengubahnya menjadi Batavia, pusat VOC.' },
    en: { q: 'From 1619, the VOC headquarters in the archipelago was in...', o: ['Batavia', 'Malacca', 'Banten', 'Surabaya'], e: 'Jan Pieterszoon Coen seized Jayakarta in 1619 and renamed it Batavia, the VOC headquarters.' } },
  { s: 'sejarah', era: 2, a: 0,
    id: { q: 'Maluku dijuluki "Kepulauan Rempah" terutama karena menghasilkan...', o: ['Pala dan cengkih', 'Kopi dan teh', 'Tebu dan nila', 'Padi dan jagung'], e: 'Pala dan cengkih dari Maluku sangat mahal di Eropa sehingga menarik bangsa Eropa datang.' },
    en: { q: 'Maluku was called the "Spice Islands" mainly because it produced...', o: ['Nutmeg and cloves', 'Coffee and tea', 'Sugarcane and indigo', 'Rice and corn'], e: 'Nutmeg and cloves from Maluku were extremely valuable in Europe and drew European traders.' } },
  { s: 'sejarah', era: 2, a: 0,
    id: { q: 'Hak istimewa VOC, seperti memonopoli perdagangan dan membentuk tentara, disebut...', o: ['Hak oktroi', 'Hak veto', 'Hak angket', 'Hak suara'], e: 'Hak oktroi diberikan pemerintah Belanda kepada VOC, termasuk monopoli dagang dan hak membentuk tentara.' },
    en: { q: "The VOC's special privileges, such as a trade monopoly and its own army, were called...", o: ['Octrooi rights', 'Veto rights', 'Inquiry rights', 'Voting rights'], e: 'The Dutch government granted the VOC octrooi rights, including a trade monopoly and the right to raise an army.' } },

  /* ===== SEJARAH: Zaman 3 ===== */
  { s: 'sejarah', era: 3, a: 0,
    id: { q: 'Sistem Tanam Paksa dicetuskan oleh...', o: ['Johannes van den Bosch', 'Herman Willem Daendels', 'Thomas Stamford Raffles', 'Jan Pieterszoon Coen'], e: 'Gubernur Jenderal Johannes van den Bosch menerapkan Tanam Paksa mulai 1830.' },
    en: { q: 'Who introduced the Forced Cultivation System?', o: ['Johannes van den Bosch', 'Herman Willem Daendels', 'Thomas Stamford Raffles', 'Jan Pieterszoon Coen'], e: 'Governor-General Johannes van den Bosch introduced it starting in 1830.' } },
  { s: 'sejarah', era: 3, a: 0,
    id: { q: 'Tanam Paksa mulai diberlakukan pada tahun...', o: ['1830', '1602', '1870', '1908'], e: 'Tanam Paksa berlaku sejak 1830 dan mulai dihapus setelah Undang-Undang Agraria 1870.' },
    en: { q: 'In which year did the Forced Cultivation System begin?', o: ['1830', '1602', '1870', '1908'], e: 'It began in 1830 and was phased out after the Agrarian Law of 1870.' } },
  { s: 'sejarah', era: 3, a: 0,
    id: { q: 'Menurut aturannya, berapa bagian tanah petani yang wajib ditanami tanaman ekspor?', o: ['Seperlima (1/5)', 'Setengah (1/2)', 'Sepertiga (1/3)', 'Seluruhnya'], e: 'Aturan resminya seperlima tanah, tetapi dalam praktiknya petani sering dipaksa menyerahkan lebih banyak.' },
    en: { q: "By the official rule, what share of a farmer's land had to grow export crops?", o: ['One fifth (1/5)', 'One half (1/2)', 'One third (1/3)', 'All of it'], e: 'Officially one fifth, but in practice farmers were often forced to give much more.' } },
  { s: 'sejarah', era: 3, a: 0,
    id: { q: 'Novel Max Havelaar yang mengkritik kolonialisme ditulis oleh...', o: ['Multatuli', 'Van Deventer', 'Daendels', 'Raffles'], e: 'Multatuli adalah nama pena Eduard Douwes Dekker. Max Havelaar terbit pada 1860.' },
    en: { q: 'Who wrote Max Havelaar, the novel that criticised colonialism?', o: ['Multatuli', 'Van Deventer', 'Daendels', 'Raffles'], e: 'Multatuli was the pen name of Eduard Douwes Dekker. Max Havelaar was published in 1860.' } },
  { s: 'sejarah', era: 3, a: 0,
    id: { q: 'Tanaman ekspor utama pada masa Tanam Paksa adalah...', o: ['Kopi, tebu, dan nila', 'Padi, jagung, dan singkong', 'Karet, sawit, dan kelapa', 'Apel, anggur, dan gandum'], e: 'Kopi, tebu, dan nila laku mahal di pasar Eropa sehingga diwajibkan untuk ditanam.' },
    en: { q: 'The main export crops under Forced Cultivation were...', o: ['Coffee, sugarcane, and indigo', 'Rice, corn, and cassava', 'Rubber, oil palm, and coconut', 'Apples, grapes, and wheat'], e: 'Coffee, sugar, and indigo sold for high prices in Europe, so farmers were forced to grow them.' } },

  /* ===== SEJARAH: Zaman 4 ===== */
  { s: 'sejarah', era: 4, a: 0,
    id: { q: 'Tiga program Politik Etis (1901) adalah...', o: ['Edukasi, irigasi, emigrasi', 'Ekonomi, industri, ekspor', 'Edukasi, industri, ekspor', 'Irigasi, imigrasi, investasi'], e: 'Politik Etis dikenal sebagai "Trias van Deventer": edukasi, irigasi, dan emigrasi.' },
    en: { q: 'The three programmes of the Ethical Policy (1901) were...', o: ['Education, irrigation, emigration', 'Economy, industry, export', 'Education, industry, export', 'Irrigation, immigration, investment'], e: 'Known as the "Van Deventer trias": education, irrigation, and emigration.' } },
  { s: 'sejarah', era: 4, a: 0,
    id: { q: 'Budi Utomo berdiri pada tanggal...', o: ['20 Mei 1908', '28 Oktober 1928', '17 Agustus 1945', '1 Juni 1945'], e: 'Budi Utomo didirikan pelajar STOVIA pada 20 Mei 1908, yang kini diperingati sebagai Hari Kebangkitan Nasional.' },
    en: { q: 'When was Budi Utomo founded?', o: ['20 May 1908', '28 October 1928', '17 August 1945', '1 June 1945'], e: 'STOVIA students founded Budi Utomo on 20 May 1908, now National Awakening Day.' } },
  { s: 'sejarah', era: 4, a: 0,
    id: { q: 'Sumpah Pemuda diikrarkan pada...', o: ['Kongres Pemuda II, 28 Oktober 1928', 'Kongres Pemuda I, 1926', 'Sidang BPUPKI, 1945', 'Pendirian Budi Utomo, 1908'], e: 'Sumpah Pemuda diikrarkan pada Kongres Pemuda II, 28 Oktober 1928.' },
    en: { q: 'The Youth Pledge was declared at...', o: ['The Second Youth Congress, 28 October 1928', 'The First Youth Congress, 1926', 'The BPUPKI session, 1945', 'The founding of Budi Utomo, 1908'], e: 'It was declared at the Second Youth Congress on 28 October 1928.' } },
  { s: 'sejarah', era: 4, a: 0,
    id: { q: 'Lagu Indonesia Raya pertama kali diperdengarkan oleh W.R. Supratman pada...', o: ['Kongres Pemuda II 1928', 'Proklamasi 1945', 'Berdirinya Budi Utomo 1908', 'Konferensi Asia Afrika 1955'], e: 'W.R. Supratman memainkan Indonesia Raya dengan biola pada penutupan Kongres Pemuda II, 28 Oktober 1928.' },
    en: { q: 'W.R. Supratman first performed "Indonesia Raya" at...', o: ['The Second Youth Congress, 1928', 'The Proclamation, 1945', 'The founding of Budi Utomo, 1908', 'The Asian-African Conference, 1955'], e: 'He played it on the violin at the close of the Second Youth Congress on 28 October 1928.' } },

  /* ===== SEJARAH: Zaman 5 ===== */
  { s: 'sejarah', era: 5, a: 0,
    id: { q: 'Teks Proklamasi dibacakan di...', o: ['Jalan Pegangsaan Timur 56', 'Lapangan Ikada', 'Rengasdengklok', 'Gedung Sate'], e: 'Proklamasi dibacakan di kediaman Soekarno, Jalan Pegangsaan Timur 56, Jakarta, pada 17 Agustus 1945.' },
    en: { q: 'Where was the Proclamation text read?', o: ['Jalan Pegangsaan Timur 56', 'Ikada Field', 'Rengasdengklok', 'Gedung Sate'], e: "It was read at Soekarno's home, Jalan Pegangsaan Timur 56, Jakarta, on 17 August 1945." } },
  { s: 'sejarah', era: 5, a: 0,
    id: { q: 'Naskah Proklamasi yang ditulis tangan Soekarno kemudian diketik oleh...', o: ['Sayuti Melik', 'Mohammad Hatta', 'Ahmad Soebardjo', 'Sutan Sjahrir'], e: 'Sayuti Melik mengetik naskah Proklamasi dengan beberapa perubahan ejaan dan kata.' },
    en: { q: "Who typed the Proclamation text from Soekarno's handwritten draft?", o: ['Sayuti Melik', 'Mohammad Hatta', 'Ahmad Soebardjo', 'Sutan Sjahrir'], e: 'Sayuti Melik typed the text, with a few changes in spelling and wording.' } },
  { s: 'sejarah', era: 5, a: 0,
    id: { q: 'Hari Pahlawan pada 10 November memperingati...', o: ['Pertempuran Surabaya', 'Bandung Lautan Api', 'Pertempuran Ambarawa', 'Serangan Umum 1 Maret'], e: 'Pertempuran Surabaya pada 10 November 1945 adalah salah satu pertempuran terbesar mempertahankan kemerdekaan.' },
    en: { q: 'Heroes Day on 10 November commemorates...', o: ['The Battle of Surabaya', 'Bandung Sea of Fire', 'The Battle of Ambarawa', 'The 1 March General Offensive'], e: 'The Battle of Surabaya on 10 November 1945 was one of the largest battles to defend independence.' } },
  { s: 'sejarah', era: 5, a: 0,
    id: { q: 'Peristiwa ketika golongan muda membawa Soekarno dan Hatta ke luar Jakarta sebelum Proklamasi disebut peristiwa...', o: ['Rengasdengklok', 'Linggarjati', 'Renville', 'Madiun'], e: 'Pada 16 Agustus 1945, golongan muda membawa Soekarno dan Hatta ke Rengasdengklok agar segera memproklamasikan kemerdekaan.' },
    en: { q: 'The event in which young activists took Soekarno and Hatta out of Jakarta before the Proclamation is called...', o: ['The Rengasdengklok incident', 'Linggarjati', 'Renville', 'Madiun'], e: 'On 16 August 1945, the youth took them to Rengasdengklok to push for an immediate proclamation.' } },

  /* ===== MATEMATIKA ===== */
  { s: 'mtk', a: 0,
    id: { q: 'Kamu membeli 6 benih jagung seharga 8 koin per benih. Berapa total biayanya?', o: ['48 koin', '42 koin', '54 koin', '14 koin'], e: '6 × 8 = 48 koin.' },
    en: { q: 'You buy 6 corn seeds at 8 coins each. What is the total cost?', o: ['48 coins', '42 coins', '54 coins', '14 coins'], e: '6 × 8 = 48 coins.' } },
  { s: 'mtk', a: 0,
    id: { q: 'Kamu menjual 5 kopi seharga 48 koin per buah. Modal benihnya 5 × 18 koin. Berapa labanya?', o: ['150 koin', '240 koin', '90 koin', '330 koin'], e: 'Pendapatan 5 × 48 = 240. Biaya 5 × 18 = 90. Laba 240 − 90 = 150 koin.' },
    en: { q: 'You sell 5 coffee at 48 coins each. Seeds cost 5 × 18 coins. What is the profit?', o: ['150 coins', '240 coins', '90 coins', '330 coins'], e: 'Revenue 5 × 48 = 240. Cost 5 × 18 = 90. Profit 240 − 90 = 150 coins.' } },
  { s: 'mtk', a: 0,
    id: { q: 'Harga cabai 28 koin naik 25%. Berapa harga barunya?', o: ['35 koin', '33 koin', '53 koin', '30 koin'], e: '25% dari 28 = 7. Harga baru 28 + 7 = 35 koin.' },
    en: { q: 'The price of chili is 28 coins and rises by 25%. What is the new price?', o: ['35 coins', '33 coins', '53 coins', '30 coins'], e: '25% of 28 = 7. New price 28 + 7 = 35 coins.' } },
  { s: 'mtk', a: 0,
    id: { q: 'Sebuah sawah berbentuk persegi panjang berukuran 12 m × 8 m. Berapa luasnya?', o: ['96 m²', '40 m²', '20 m²', '86 m²'], e: 'Luas persegi panjang = panjang × lebar = 12 × 8 = 96 m².' },
    en: { q: 'A rectangular rice field measures 12 m × 8 m. What is its area?', o: ['96 m²', '40 m²', '20 m²', '86 m²'], e: 'Area = length × width = 12 × 8 = 96 m².' } },
  { s: 'mtk', a: 0,
    id: { q: 'Pada masa Tanam Paksa, 1/5 dari 40 karung panen diserahkan. Berapa karung yang tersisa untuk petani?', o: ['32 karung', '8 karung', '35 karung', '20 karung'], e: '1/5 × 40 = 8 diserahkan. Sisanya 40 − 8 = 32 karung.' },
    en: { q: 'Under Forced Cultivation, 1/5 of 40 sacks of harvest is handed over. How many sacks remain for the farmer?', o: ['32 sacks', '8 sacks', '35 sacks', '20 sacks'], e: '1/5 × 40 = 8 handed over. 40 − 8 = 32 sacks remain.' } },
  { s: 'mtk', a: 0,
    id: { q: 'Hasil panen tiga hari berturut-turut adalah 12, 15, dan 18. Berapa rata-ratanya?', o: ['15', '45', '14', '16'], e: '(12 + 15 + 18) ÷ 3 = 45 ÷ 3 = 15.' },
    en: { q: 'Harvests on three days were 12, 15, and 18. What is the average?', o: ['15', '45', '14', '16'], e: '(12 + 15 + 18) ÷ 3 = 45 ÷ 3 = 15.' } },

  /* ===== BAHASA INDONESIA ===== */
  { s: 'bindo', a: 0,
    id: { q: 'Manakah kata baku yang benar?', o: ['Analisis', 'Analisa', 'Analysis', 'Analisys'], e: 'Menurut KBBI, bentuk bakunya adalah "analisis".' },
    en: { q: 'Which is the standard Indonesian spelling?', o: ['Analisis', 'Analisa', 'Analysis', 'Analisys'], e: 'According to the KBBI dictionary, the standard form is "analisis".' } },
  { s: 'bindo', a: 0,
    id: { q: 'Manakah penulisan "di" yang benar?', o: ['Pupuk disimpan di gudang.', 'Pupuk di simpan digudang.', 'Pupuk disimpan digudang.', 'Pupuk di simpan di gudang.'], e: '"di" sebagai awalan kata kerja ditulis serangkai (disimpan), sedangkan "di" sebagai kata depan tempat ditulis terpisah (di gudang).' },
    en: { q: 'Which sentence uses "di" correctly in Indonesian?', o: ['Pupuk disimpan di gudang.', 'Pupuk di simpan digudang.', 'Pupuk disimpan digudang.', 'Pupuk di simpan di gudang.'], e: '"di" as a verb prefix is joined (disimpan); "di" as a preposition of place is separate (di gudang).' } },
  { s: 'bindo', a: 0,
    id: { q: 'Manakah kata baku yang benar?', o: ['Risiko', 'Resiko', 'Resico', 'Risico'], e: 'Bentuk baku menurut KBBI adalah "risiko".' },
    en: { q: 'Which is the standard Indonesian spelling?', o: ['Risiko', 'Resiko', 'Resico', 'Risico'], e: 'The KBBI standard form is "risiko" (risk).' } },
  { s: 'bindo', a: 0,
    id: { q: 'Manakah kalimat efektif?', o: ['Para petani sedang memanen padi.', 'Para petani-petani sedang memanen padi.', 'Para petani sedang memanen padi-padi yang menguning padinya.', 'Sedang para petani memanen-manen padi.'], e: '"Para" sudah menunjukkan jamak, jadi kata "petani" tidak perlu diulang.' },
    en: { q: 'Which Indonesian sentence is effective (concise and correct)?', o: ['Para petani sedang memanen padi.', 'Para petani-petani sedang memanen padi.', 'Para petani sedang memanen padi-padi yang menguning padinya.', 'Sedang para petani memanen-manen padi.'], e: '"Para" already marks the plural, so "petani" should not be repeated.' } },
  { s: 'bindo', a: 0,
    id: { q: 'Manakah penulisan huruf kapital yang benar?', o: ['Sumpah Pemuda diikrarkan pada 28 Oktober 1928.', 'sumpah pemuda diikrarkan pada 28 oktober 1928.', 'Sumpah pemuda diikrarkan pada 28 Oktober 1928.', 'Sumpah Pemuda diikrarkan pada 28 oktober 1928.'], e: 'Nama peristiwa sejarah dan nama bulan diawali huruf kapital.' },
    en: { q: 'Which sentence uses capital letters correctly?', o: ['Sumpah Pemuda diikrarkan pada 28 Oktober 1928.', 'sumpah pemuda diikrarkan pada 28 oktober 1928.', 'Sumpah pemuda diikrarkan pada 28 Oktober 1928.', 'Sumpah Pemuda diikrarkan pada 28 oktober 1928.'], e: 'Names of historical events and months start with a capital letter.' } },
  { s: 'bindo', a: 0,
    id: { q: 'Manakah kata baku yang benar?', o: ['Jadwal', 'Jadual', 'Jadwel', 'Jaduwal'], e: 'Bentuk baku menurut KBBI adalah "jadwal".' },
    en: { q: 'Which is the standard Indonesian spelling?', o: ['Jadwal', 'Jadual', 'Jadwel', 'Jaduwal'], e: 'The KBBI standard form is "jadwal" (schedule).' } },

  /* ===== BAHASA INGGRIS ===== */
  { s: 'bing', a: 0,
    id: { q: 'Bahasa Inggris dari "panen" adalah...', o: ['Harvest', 'Plant', 'Seed', 'Water'], e: '"Harvest" berarti panen. "Plant" = menanam, "seed" = benih, "water" = air/menyiram.' },
    en: { q: 'What is "panen" in English?', o: ['Harvest', 'Plant', 'Seed', 'Water'], e: '"Panen" means harvest. Plant = menanam, seed = benih, water = air/menyiram.' } },
  { s: 'bing', a: 0,
    id: { q: 'Terjemahan yang benar untuk "Petani menyiram tanaman setiap pagi" adalah...', o: ['The farmer waters the plants every morning.', 'The farmer water the plants every morning.', 'The farmer watered plants every mornings.', 'The farmers is watering plant every morning.'], e: 'Kebiasaan memakai simple present. Subjek tunggal "the farmer" membuat kata kerjanya mendapat -s: "waters".' },
    en: { q: 'Choose the correct sentence.', o: ['The farmer waters the plants every morning.', 'The farmer water the plants every morning.', 'The farmer watered plants every mornings.', 'The farmers is watering plant every morning.'], e: 'Habits use the simple present. A singular subject takes -s: "waters".' } },
  { s: 'bing', a: 0,
    id: { q: 'Bentuk lampau (past tense) dari "plant" adalah...', o: ['Planted', 'Planting', 'Plants', 'Plant'], e: '"Plant" adalah kata kerja beraturan, jadi bentuk lampaunya ditambah -ed: "planted".' },
    en: { q: 'What is the past tense of "plant"?', o: ['Planted', 'Planting', 'Plants', 'Plant'], e: '"Plant" is a regular verb, so its past tense adds -ed: "planted".' } },
  { s: 'bing', a: 0,
    id: { q: 'Pembeli asing bertanya, "How much is the coffee?" Artinya...', o: ['Berapa harga kopinya?', 'Berapa banyak kopi yang kamu minum?', 'Di mana kopinya?', 'Apakah kopinya enak?'], e: '"How much is ...?" dipakai untuk menanyakan harga.' },
    en: { q: 'A buyer asks, "How much is the coffee?" What do they want to know?', o: ['The price of the coffee', 'How much coffee you drink', 'Where the coffee is', 'Whether the coffee tastes good'], e: '"How much is ...?" asks about the price.' } },
  { s: 'bing', a: 0,
    id: { q: '"Indonesia ____ its independence on August 17, 1945." Kata yang tepat adalah...', o: ['proclaimed', 'proclaims', 'will proclaim', 'is proclaiming'], e: 'Peristiwa yang sudah selesai di masa lalu memakai simple past: "proclaimed".' },
    en: { q: '"Indonesia ____ its independence on August 17, 1945." Choose the right word.', o: ['proclaimed', 'proclaims', 'will proclaim', 'is proclaiming'], e: 'A finished past event uses the simple past: "proclaimed".' } },
  { s: 'bing', a: 0,
    id: { q: 'Lawan kata dari "dry" adalah...', o: ['Wet', 'Hot', 'Old', 'Soft'], e: '"Dry" berarti kering, lawannya "wet" yang berarti basah.' },
    en: { q: 'What is the opposite of "dry"?', o: ['Wet', 'Hot', 'Old', 'Soft'], e: 'The opposite of dry is wet.' } },

  /* ===== PANCASILA ===== */
  { s: 'pancasila', a: 0,
    id: { q: 'Lambang sila ketiga Pancasila adalah...', o: ['Pohon beringin', 'Bintang', 'Rantai', 'Kepala banteng'], e: 'Sila ke-3, Persatuan Indonesia, dilambangkan dengan pohon beringin.' },
    en: { q: 'What symbolises the third principle of Pancasila?', o: ['A banyan tree', 'A star', 'A chain', "A bull's head"], e: 'The third principle, Unity of Indonesia, is symbolised by a banyan tree.' } },
  { s: 'pancasila', a: 0,
    id: { q: 'Kelompok tani mengambil keputusan jadwal tanam bersama-sama melalui musyawarah. Ini mencerminkan sila ke-...', o: ['4', '1', '2', '5'], e: 'Sila ke-4: Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan.' },
    en: { q: 'A farmers’ group decides its planting schedule through deliberation (musyawarah). Which principle does this reflect?', o: ['4th', '1st', '2nd', '5th'], e: 'The 4th principle: democracy guided by wisdom in deliberation and representation.' } },
  { s: 'pancasila', a: 0,
    id: { q: 'Hasil panen dibagi secara adil kepada semua anggota kelompok tani. Ini mencerminkan sila ke-...', o: ['5', '3', '4', '2'], e: 'Sila ke-5: Keadilan sosial bagi seluruh rakyat Indonesia.' },
    en: { q: 'The harvest is shared fairly among all members of the farmers’ group. Which principle does this reflect?', o: ['5th', '3rd', '4th', '2nd'], e: 'The 5th principle: social justice for all Indonesian people.' } },
  { s: 'pancasila', a: 0,
    id: { q: 'Hari Lahir Pancasila diperingati setiap tanggal...', o: ['1 Juni', '17 Agustus', '1 Oktober', '28 Oktober'], e: 'Hari Lahir Pancasila diperingati setiap 1 Juni, merujuk pada pidato Soekarno di sidang BPUPKI pada 1 Juni 1945.' },
    en: { q: 'Pancasila Birth Day is commemorated on...', o: ['1 June', '17 August', '1 October', '28 October'], e: "It is commemorated on 1 June, marking Soekarno's speech to the BPUPKI on 1 June 1945." } },
  { s: 'pancasila', a: 0,
    id: { q: 'Mengutamakan persatuan dan kesatuan bangsa di atas kepentingan pribadi sesuai dengan sila ke-...', o: ['3', '1', '2', '4'], e: 'Sila ke-3: Persatuan Indonesia.' },
    en: { q: 'Putting national unity above personal interest matches which principle?', o: ['3rd', '1st', '2nd', '4th'], e: 'The 3rd principle: the Unity of Indonesia.' } },
  { s: 'pancasila', a: 0,
    id: { q: 'Bunyi sila kedua Pancasila adalah...', o: ['Kemanusiaan yang adil dan beradab', 'Persatuan Indonesia', 'Ketuhanan Yang Maha Esa', 'Keadilan sosial bagi seluruh rakyat Indonesia'], e: 'Sila ke-2 berbunyi "Kemanusiaan yang adil dan beradab" dan dilambangkan dengan rantai.' },
    en: { q: 'What is the second principle of Pancasila?', o: ['Just and civilised humanity', 'The unity of Indonesia', 'Belief in the One and Only God', 'Social justice for all Indonesian people'], e: 'The 2nd principle is "Just and civilised humanity", symbolised by a chain.' } },

  /* ===== KIK (Kreativitas, Inovasi, dan Kewirausahaan) ===== */
  { s: 'kik', a: 0,
    id: { q: 'Rumus laba yang benar adalah...', o: ['Pendapatan − biaya', 'Biaya − pendapatan', 'Pendapatan + biaya', 'Harga × biaya'], e: 'Laba adalah selisih pendapatan dengan seluruh biaya yang dikeluarkan.' },
    en: { q: 'Which is the correct formula for profit?', o: ['Revenue − costs', 'Costs − revenue', 'Revenue + costs', 'Price × costs'], e: 'Profit is revenue minus all costs.' } },
  { s: 'kik', a: 0,
    id: { q: 'Huruf S, W, O, T dalam analisis SWOT adalah...', o: ['Strengths, Weaknesses, Opportunities, Threats', 'Sales, Work, Output, Time', 'Strategy, Wealth, Offer, Target', 'Supply, Wages, Orders, Trade'], e: 'SWOT menilai kekuatan, kelemahan, peluang, dan ancaman sebuah usaha.' },
    en: { q: 'What do S, W, O, T stand for in a SWOT analysis?', o: ['Strengths, Weaknesses, Opportunities, Threats', 'Sales, Work, Output, Time', 'Strategy, Wealth, Offer, Target', 'Supply, Wages, Orders, Trade'], e: 'SWOT assesses a business’s strengths, weaknesses, opportunities, and threats.' } },
  { s: 'kik', a: 0,
    id: { q: 'Petani mengolah tebu menjadi gula aren kemasan dengan merek sendiri. Ini contoh...', o: ['Inovasi produk dan nilai tambah', 'Pemborosan bahan', 'Monopoli pasar', 'Penurunan kualitas'], e: 'Mengolah bahan mentah menjadi produk bermerek menambah nilai jual. Inilah inovasi produk.' },
    en: { q: 'A farmer turns sugarcane into branded packaged sugar. This is an example of...', o: ['Product innovation and added value', 'Wasting materials', 'A market monopoly', 'Lowering quality'], e: 'Processing raw goods into a branded product adds value. That is product innovation.' } },
  { s: 'kik', a: 0,
    id: { q: 'Uang yang dipakai untuk membeli bibit dan pupuk termasuk...', o: ['Biaya produksi', 'Laba', 'Pendapatan', 'Omzet'], e: 'Bibit dan pupuk adalah biaya yang dikeluarkan untuk menghasilkan produk, yaitu biaya produksi.' },
    en: { q: 'Money spent on seeds and fertiliser counts as...', o: ['Production costs', 'Profit', 'Revenue', 'Turnover'], e: 'Seeds and fertiliser are costs of making the product: production costs.' } },
  { s: 'kik', a: 0,
    id: { q: 'Kelompok konsumen yang menjadi sasaran penjualan sebuah produk disebut...', o: ['Target pasar', 'Modal usaha', 'Saluran distribusi', 'Harga pokok'], e: 'Target pasar adalah kelompok pembeli yang paling mungkin membeli produkmu.' },
    en: { q: 'The group of customers a product is aimed at is called the...', o: ['Target market', 'Business capital', 'Distribution channel', 'Cost price'], e: 'The target market is the group most likely to buy your product.' } },
  { s: 'kik', a: 0,
    id: { q: 'Gagal panen tidak membuat seorang wirausahawan berhenti, ia mencoba cara baru. Sikap ini disebut...', o: ['Pantang menyerah', 'Mudah puas', 'Bergantung pada orang lain', 'Takut mencoba'], e: 'Pantang menyerah dan mau belajar dari kegagalan adalah ciri penting wirausahawan.' },
    en: { q: 'A crop failure does not stop an entrepreneur; she tries a new method. This attitude is called...', o: ['Perseverance', 'Complacency', 'Dependence on others', 'Fear of trying'], e: 'Perseverance and learning from failure are key traits of an entrepreneur.' } },

  /* ===== KEJURUAN RPL ===== */
  { s: 'rpl', a: 0,
    code: 'if (tanah == "kering") {\n  siram();\n}',
    id: { q: 'Kapan fungsi siram() dijalankan pada kode ini?', o: ['Ketika tanah kering', 'Setiap saat', 'Ketika tanah basah', 'Tidak pernah'], e: 'Perintah if hanya menjalankan isinya ketika kondisinya bernilai benar, yaitu tanah == "kering".' },
    en: { q: 'When does siram() (water) run in this code?', o: ['When the soil is dry', 'All the time', 'When the soil is wet', 'Never'], e: 'An if statement only runs its body when the condition is true: soil == "dry".' } },
  { s: 'rpl', a: 0,
    code: 'for (let i = 0; i < 3; i++) {\n  tanam();\n}',
    id: { q: 'Berapa kali fungsi tanam() dijalankan?', o: ['3 kali', '2 kali', '4 kali', '1 kali'], e: 'Perulangan berjalan untuk i = 0, 1, dan 2, jadi tiga kali.' },
    en: { q: 'How many times does tanam() (plant) run?', o: ['3 times', '2 times', '4 times', 'Once'], e: 'The loop runs for i = 0, 1, and 2: three times.' } },
  { s: 'rpl', a: 0,
    code: 'let kebun = ["padi", "jagung", "kopi"];\nconsole.log(kebun[1]);',
    id: { q: 'Apa yang ditampilkan kode ini?', o: ['jagung', 'padi', 'kopi', 'undefined'], e: 'Indeks array dimulai dari 0, jadi kebun[1] adalah elemen kedua: "jagung".' },
    en: { q: 'What does this code print?', o: ['jagung', 'padi', 'kopi', 'undefined'], e: 'Array indexes start at 0, so kebun[1] is the second element: "jagung".' } },
  { s: 'rpl', a: 0,
    id: { q: 'Tipe data yang hanya bernilai true atau false adalah...', o: ['Boolean', 'String', 'Integer', 'Array'], e: 'Boolean hanya memiliki dua nilai: true (benar) dan false (salah).' },
    en: { q: 'Which data type can only be true or false?', o: ['Boolean', 'String', 'Integer', 'Array'], e: 'A Boolean has only two values: true and false.' } },
  { s: 'rpl', a: 0,
    id: { q: 'Tag HTML untuk membuat tombol yang bisa diklik adalah...', o: ['<button>', '<table>', '<img>', '<title>'], e: 'Tag <button> membuat tombol yang bisa diklik dan diakses dengan keyboard.' },
    en: { q: 'Which HTML tag creates a clickable button?', o: ['<button>', '<table>', '<img>', '<title>'], e: 'The <button> tag creates a clickable, keyboard-accessible button.' } },
  { s: 'rpl', a: 0,
    id: { q: 'Urutan langkah logis dan sistematis untuk menyelesaikan masalah disebut...', o: ['Algoritma', 'Kompiler', 'Variabel', 'Database'], e: 'Algoritma adalah urutan langkah untuk menyelesaikan masalah, sebelum ditulis menjadi kode program.' },
    en: { q: 'A logical, step-by-step sequence for solving a problem is called an...', o: ['Algorithm', 'Compiler', 'Variable', 'Database'], e: 'An algorithm is a sequence of steps to solve a problem, written before the program code.' } }
];
