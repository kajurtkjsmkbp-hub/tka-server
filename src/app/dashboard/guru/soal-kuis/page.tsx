"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { bankSoalAsli } from "@/app/dashboard/siswa/latihan/[id]/bankSoal";

interface ModulMeta {
  key: string;
  pertemuan: number;
  semester: number;
  title: string;
  category: string;
  icon: string;
  competency: string;
}

const MODUL_LIST: ModulMeta[] = [
  // Semester 1
  { key: "s1-p1", pertemuan: 1, semester: 1, title: "Pengantar Berpikir Komputasional", category: "Algoritma & Logika", icon: "🧠", competency: "Memahami 4 pilar computational thinking: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma." },
  { key: "s1-p2", pertemuan: 2, semester: 1, title: "Algoritma dan Pseudocode", category: "Perancangan Solusi", icon: "📐", competency: "Menganalisis notasi pseudocode standar, simbol-simbol flowchart, dan trace table logika." },
  { key: "s1-p3", pertemuan: 3, semester: 1, title: "Pengenalan Bahasa Pemrograman (Python)", category: "Koding Dasar", icon: "🐍", competency: "Mengenal sintaks Python, fungsi print/input, indentasi PEP 8, interpreter, dan komentar." },
  { key: "s1-p4", pertemuan: 4, semester: 1, title: "Variabel dan Tipe Data", category: "Koding Dasar", icon: "📦", competency: "Menguasai int, float, str, bool, type casting, manipulasi string, dan f-string." },
  { key: "s1-p5", pertemuan: 5, semester: 1, title: "Operator Logika dan Aritmatika", category: "Operasi Komputasi", icon: "➕", competency: "Menguasai operator aritmatika, perbandingan, logika (and/or/not), dan hierarki prioritas (PEMDAS)." },
  { key: "s1-p6", pertemuan: 6, semester: 1, title: "Percabangan (If/Else)", category: "Alur Kontrol", icon: "🔀", competency: "Menerapkan struktur if, if-elif-else, nested if, dan ekspresi ternary pada studi kasus." },
  { key: "s1-p7", pertemuan: 7, semester: 1, title: "Perulangan (For/While)", category: "Alur Kontrol", icon: "🔁", competency: "Menguasai perulangan for, while, fungsi range(), break, continue, dan pola akumulator." },
  { key: "s1-p8", pertemuan: 8, semester: 1, title: "Fungsi dan Prosedur", category: "Modularitas Kode", icon: "⚙️", competency: "Merancang fungsi def, parameter default, *args/**kwargs, return value, dan lambda function." },
  { key: "s1-p9", pertemuan: 9, semester: 1, title: "Struktur Data Dasar (List, Tuple, Dict, Set)", category: "Manajemen Data", icon: "🗃️", competency: "Menguasai manipulasi List, sifat immutable Tuple, pasangan Key-Value Dict, dan keunikan Set." },
  { key: "s1-p10", pertemuan: 10, semester: 1, title: "Penanganan Error (Debugging)", category: "Kualitas Kode", icon: "🛡️", competency: "Mendiagnosa Syntax/Runtime/Logic Error, menerapkan try-except-finally, dan teknik debugging." },
  { key: "s1-p11", pertemuan: 11, semester: 1, title: "Studi Kasus Algoritma Terapan", category: "Algoritma Terapan", icon: "📊", competency: "Menganalisis Linear Search, Binary Search, Bubble/Insertion Sort, dan efisiensi Big-O." },
  { key: "s1-p12", pertemuan: 12, semester: 1, title: "Projek Nyata: Membuat Kalkulator Pintar", category: "Projek Integrasi", icon: "🧮", competency: "Mengintegrasikan seluruh kompetensi Python Semester 1 ke dalam aplikasi kalkulator modular yang robust." },

  // Semester 2
  { key: "s2-p1", pertemuan: 1, semester: 2, title: "Sejarah dan Konsep Dasar AI", category: "Pengantar AI", icon: "🤖", competency: "Memahami tonggak sejarah AI, Turing Test, Narrow vs AGI, Dartmouth Conference, dan AI Winter." },
  { key: "s2-p2", pertemuan: 2, semester: 2, title: "Machine Learning vs Tradisional", category: "Konsep Dasar ML", icon: "📈", competency: "Membedakan paradigma data-driven vs rule-based, split train/val/test, overfitting, dan underfitting." },
  { key: "s2-p3", pertemuan: 3, semester: 2, title: "Supervised Learning (Klasifikasi)", category: "Supervised Learning", icon: "🎯", competency: "Menguasai KNN, Decision Tree, Random Forest, Naive Bayes, Confusion Matrix, dan metrik F1-Score." },
  { key: "s2-p4", pertemuan: 4, semester: 2, title: "Supervised Learning (Regresi)", category: "Supervised Learning", icon: "📉", competency: "Menguasai Regresi Linear, MSE, RMSE, R-Squared, Gradient Descent, dan Regularisasi Lasso/Ridge." },
  { key: "s2-p5", pertemuan: 5, semester: 2, title: "Unsupervised Learning (Clustering)", category: "Unsupervised Learning", icon: "🧩", competency: "Menganalisis K-Means, Elbow Method, Silhouette Score, Hierarchical Clustering, DBSCAN, dan PCA." },
  { key: "s2-p6", pertemuan: 6, semester: 2, title: "Pengantar Jaringan Saraf Tiruan (ANN)", category: "Deep Learning Dasar", icon: "⚡", competency: "Memahami neuron buatan, arsitektur MLP, fungsi aktivasi ReLU/Softmax, Backpropagation, dan Optimizer." },
  { key: "s2-p7", pertemuan: 7, semester: 2, title: "Deep Learning & Computer Vision", category: "Visi Komputer", icon: "👁️", competency: "Memahami arsitektur CNN, filter konvolusi, pooling, augmentasi citra, Transfer Learning, dan YOLO." },
  { key: "s2-p8", pertemuan: 8, semester: 2, title: "Natural Language Processing (NLP)", category: "Pengolahan Bahasa", icon: "💬", competency: "Menguasai tokenisasi, TF-IDF, Word2Vec, Sentiment Analysis, LSTM, dan arsitektur Transformer." },
  { key: "s2-p9", pertemuan: 9, semester: 2, title: "Reinforcement Learning & AI Agents", category: "Pembelajaran Penguatan", icon: "🎮", competency: "Memahami siklus Agen-Environment, Reward, Q-Learning, DQN, eksplorasi vs eksploitasi, dan AI otonom." },
  { key: "s2-p10", pertemuan: 10, semester: 2, title: "Generative AI & Etika AI", category: "GenAI & Regulasi", icon: "✨", competency: "Mempelajari LLM, Prompt Engineering, Model Difusi, Deepfake, bias algoritma, dan regulasi etika AI." },
  { key: "s2-p11", pertemuan: 11, semester: 2, title: "AIoT (AI & Internet of Things)", category: "Sistem Tertanam & IoT", icon: "📡", competency: "Mengintegrasikan sensor, mikrokontroler ESP32, Edge Computing, protokol MQTT, dan TinyML." },
  { key: "s2-p12", pertemuan: 12, semester: 2, title: "Deployment AI & API", category: "Rekayasa Produksi", icon: "🚀", competency: "Merancang REST API dengan FastAPI, Docker container, status code HTTP, MLOps, dan monitoring server." }
];

export default function SoalKuisGuruPage() {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedPertemuan, setSelectedPertemuan] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedAll, setExpandedAll] = useState<boolean>(true);
  const [individualExpanded, setIndividualExpanded] = useState<Record<number, boolean>>({});

  const currentModuleKey = `s${selectedSemester}-p${selectedPertemuan}`;
  const currentMeta = useMemo(() => {
    return MODUL_LIST.find(m => m.key === currentModuleKey) || MODUL_LIST[0];
  }, [currentModuleKey]);

  const questionsList = useMemo(() => {
    const raw = (bankSoalAsli as Record<string, any[]>)[currentModuleKey] || [];
    return raw;
  }, [currentModuleKey]);

  // Filter questions based on search keyword
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return questionsList.map((q, idx) => ({ ...q, originalIndex: idx + 1 }));
    }
    const qLower = searchQuery.toLowerCase();
    return questionsList
      .map((q, idx) => ({ ...q, originalIndex: idx + 1 }))
      .filter((q) => {
        return (
          q.question.toLowerCase().includes(qLower) ||
          q.options.some((opt: string) => opt.toLowerCase().includes(qLower))
        );
      });
  }, [questionsList, searchQuery]);

  const toggleExpand = (originalIdx: number) => {
    setIndividualExpanded(prev => ({
      ...prev,
      [originalIdx]: prev[originalIdx] !== undefined ? !prev[originalIdx] : false
    }));
  };

  const isExpanded = (originalIdx: number) => {
    if (individualExpanded[originalIdx] !== undefined) {
      return individualExpanded[originalIdx];
    }
    return expandedAll;
  };

  // Helper to construct a comprehensive explanation for each question
  const generateExplanation = (questionText: string, options: string[], answerIdx: number, meta: ModulMeta) => {
    const correctText = options[answerIdx];
    const optionLetter = ["A", "B", "C", "D"][answerIdx];

    // Check if the answer itself has an explanatory parenthetical note
    const hasParenthesis = correctText.includes("(") && correctText.includes(")");
    let detailNote = "";
    if (hasParenthesis) {
      const match = correctText.match(/\(([^)]+)\)/);
      if (match && match[1]) {
        detailNote = match[1];
      }
    }

    return {
      kunci: `${optionLetter}. ${correctText}`,
      topik: `${meta.category} — ${meta.title}`,
      alasan: detailNote 
        ? `Pilihan ${optionLetter} adalah jawaban yang benar secara konseptual dan teknis karena: ${detailNote}. Pilihan opsi lain merupakan distraktor yang dirancang menguji pemahaman mendalam siswa mengenai kaidah ${meta.title.toLowerCase()}.`
        : `Pilihan ${optionLetter} merupakan jawaban paling tepat berdasarkan kurikulum standar Koding & AI untuk modul '${meta.title}'. Konsep ini menguji penguasaan siswa terhadap: ${meta.competency}`
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Top Gradient Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 pt-10 pb-24 px-4 sm:px-6 md:px-10 border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <Link href="/dashboard/guru" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>🏠</span> Portal Guru
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Bank Soal & Kunci Kuis</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <Link 
                href="/dashboard/guru" 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold border border-white/15 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>⬅️</span> Dashboard
              </Link>
              <Link 
                href="/dashboard/guru/raport" 
                className="px-4 py-2 bg-white hover:bg-indigo-50 text-indigo-950 rounded-xl text-sm font-bold shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>📊</span> Buku Nilai
              </Link>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>🖨️</span> Cetak / PDF
              </button>
            </div>
          </div>

          {/* Main Title Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-widest mb-3">
                <span>📚</span> Bank Soal Resmi Kurikulum KKA
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Bank Soal & Pembahasan Kuis
              </h1>
              <p className="text-slate-300 mt-2 text-base md:text-lg max-w-2xl font-normal">
                Eksplorasi seluruh 1.200 butir soal kuis terstandarisasi (24 modul × 50 soal unik) beserta kunci jawaban valid dan pembahasan pedagogis untuk pengawasan ujian siswa.
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-white min-w-[260px] flex items-center gap-5 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-3xl">
                📝
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-200">Total Bank Soal</p>
                <p className="text-3xl font-black text-amber-300">1.200 <span className="text-base text-slate-300 font-semibold">Soal</span></p>
                <p className="text-xs text-emerald-400 font-medium mt-0.5">✓ 100% Unik & Bebas Duplikat</p>
              </div>
            </div>
          </div>

          {/* Semester Selector Tabs */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => { setSelectedSemester(1); setSelectedPertemuan(1); }}
              className={`px-6 py-3 rounded-2xl font-black text-sm md:text-base flex items-center gap-2.5 transition-all shadow-md ${
                selectedSemester === 1 
                  ? 'bg-sky-500 text-white shadow-sky-500/40 scale-105 ring-2 ring-white/30' 
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <span className="text-xl">🐍</span>
              <span>Semester 1: Koding & Pemrograman</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold ml-1">12 Modul</span>
            </button>

            <button
              onClick={() => { setSelectedSemester(2); setSelectedPertemuan(1); }}
              className={`px-6 py-3 rounded-2xl font-black text-sm md:text-base flex items-center gap-2.5 transition-all shadow-md ${
                selectedSemester === 2 
                  ? 'bg-fuchsia-600 text-white shadow-fuchsia-600/40 scale-105 ring-2 ring-white/30' 
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <span className="text-xl">🤖</span>
              <span>Semester 2: Kecerdasan Artifisial</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold ml-1">12 Modul</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 -mt-10">
        
        {/* Module Picker Carousel / Pills */}
        <div className="bg-white p-5 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span>📌</span> Pilih Pertemuan (Semester {selectedSemester}):
            </h3>
            <span className="text-xs font-bold text-slate-400">Pilih P1 s.d. P12</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {MODUL_LIST.filter(m => m.semester === selectedSemester).map((m) => {
              const isActive = selectedPertemuan === m.pertemuan;
              return (
                <button
                  key={m.key}
                  onClick={() => setSelectedPertemuan(m.pertemuan)}
                  className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between relative overflow-hidden ${
                    isActive
                      ? selectedSemester === 1
                        ? 'bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-500 ring-2 ring-sky-500/30 shadow-md'
                        : 'bg-gradient-to-br from-fuchsia-50 to-purple-50 border-fuchsia-500 ring-2 ring-fuchsia-500/30 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{m.icon}</span>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      isActive 
                        ? selectedSemester === 1 ? 'bg-sky-500 text-white' : 'bg-fuchsia-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      P{m.pertemuan}
                    </span>
                  </div>
                  <p className="text-xs font-black line-clamp-2 leading-tight text-slate-800">
                    {m.title}
                  </p>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">50 Soal</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Module Detail Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 border border-indigo-800/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10 text-9xl pointer-events-none">
            {currentMeta.icon}
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/40 rounded-full text-xs font-black uppercase tracking-wider text-indigo-200">
                Semester {currentMeta.semester} — Pertemuan {currentMeta.pertemuan}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-black text-emerald-300">
                {questionsList.length} Soal Pilihan Ganda (Tepat 50 Soal)
              </span>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-xs font-black text-amber-300">
                Standar KKM: 75
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span>{currentMeta.icon}</span>
              <span>{currentMeta.title}</span>
            </h2>

            <p className="text-indigo-200 text-sm sm:text-base mt-2 max-w-4xl font-normal leading-relaxed">
              <strong className="text-white">Standar Kompetensi:</strong> {currentMeta.competency}
            </p>
          </div>
        </div>

        {/* Action Controls & Search Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teks soal, keyword, atau opsi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Stats & Toggles */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-bold text-slate-500">
              Menampilkan <span className="text-indigo-600 font-black">{filteredQuestions.length}</span> dari {questionsList.length} soal
            </span>

            <button
              onClick={() => {
                setExpandedAll(!expandedAll);
                setIndividualExpanded({});
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
            >
              <span>{expandedAll ? "🔼" : "🔽"}</span>
              <span>{expandedAll ? "Tutup Semua Pembahasan" : "Buka Semua Pembahasan"}</span>
            </button>
          </div>

        </div>

        {/* Quick Jump Navigator (Pills 1 to 50) */}
        {!searchQuery && (
          <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>🚀 Lompat ke Nomor Soal:</span>
              <span className="text-[11px] text-slate-400 font-normal">Klik nomor untuk menuju ke soal</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {questionsList.map((_, i) => (
                <a
                  key={i}
                  href={`#soal-${i + 1}`}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-bold flex items-center justify-center transition-colors"
                >
                  {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 shadow-lg">
            <span className="text-5xl block mb-3">🔍</span>
            <h3 className="text-xl font-black text-slate-800">Tidak ada soal yang cocok</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              Kata kunci &quot;{searchQuery}&quot; tidak ditemukan pada modul ini. Silakan coba kata kunci lain.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-500 transition-all"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const originalNum = q.originalIndex;
              const open = isExpanded(originalNum);
              const expData = generateExplanation(q.question, q.options, q.answer, currentMeta);
              const optionLetters = ["A", "B", "C", "D"];

              return (
                <div 
                  key={originalNum}
                  id={`soal-${originalNum}`}
                  className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-200/90 overflow-hidden transition-all hover:border-indigo-300 scroll-mt-24"
                >
                  {/* Card Header: Question Number & Tags */}
                  <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shadow-md shadow-indigo-600/30">
                        {originalNum}
                      </span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {currentMeta.title}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-400">Pertemuan {currentMeta.pertemuan} • Soal #{originalNum} dari 50</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Kunci: Pilihan {optionLetters[q.answer]}
                      </span>
                      <button
                        onClick={() => toggleExpand(originalNum)}
                        className="px-3 py-1 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                      >
                        {open ? "Sembunyikan Pembahasan 🔼" : "Buka Pembahasan 🔽"}
                      </button>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="p-6 sm:p-8">
                    {/* Question Text */}
                    <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6 whitespace-pre-line">
                      {q.question}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isCorrect = optIdx === q.answer;
                        const letter = optionLetters[optIdx];

                        return (
                          <div
                            key={optIdx}
                            className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                              isCorrect
                                ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                                : 'bg-slate-50/60 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                              isCorrect
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-200 text-slate-600'
                            }`}>
                              {letter}
                            </span>
                            
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-950 font-bold' : 'text-slate-800'}`}>
                                {opt}
                              </p>
                              {isCorrect && (
                                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-black text-emerald-700 uppercase tracking-wider">
                                  ✓ KUNCI JAWABAN BENAR
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation / Pembahasan Box */}
                    {open && (
                      <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-sky-50/80 border border-indigo-200/80 text-slate-800">
                        <div className="flex items-center gap-2 mb-2 text-indigo-950 font-black text-sm">
                          <span className="text-base">💡</span>
                          <span>Pembahasan & Analisis Pedagogis:</span>
                        </div>
                        
                        <div className="space-y-2 text-sm leading-relaxed">
                          <p>
                            <strong className="text-indigo-900">Kunci Jawaban:</strong>{' '}
                            <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                              {expData.kunci}
                            </span>
                          </p>
                          <p className="text-slate-700">
                            <strong className="text-indigo-900">Penjelasan Ilmiah:</strong>{' '}
                            {expData.alasan}
                          </p>
                          <p className="text-xs text-slate-500 italic mt-1 border-t border-indigo-200/60 pt-2">
                            Materi Uji: {expData.topik} • Kompetensi Fase E/F Kurikulum KKA
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Footer Note */}
      <footer className="mt-20 pb-10 text-center border-t border-slate-200 pt-8">
        <p className="text-sm font-bold text-slate-500">
          Bank Soal Resmi LMS KKA (Koding & Kecerdasan Artifisial)
        </p>
        <p className="text-xs font-semibold text-slate-400 mt-1">
          Penyusun Kurikulum & Arsitektur: Adiningtyas Yuli Purwanto, S.Kom
        </p>
      </footer>

    </div>
  );
}
