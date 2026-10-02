"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { bankSoalAsli } from "./bankSoal";

const KKM = 75; // Kriteria Ketuntasan Minimal

// Fungsi untuk mengacak urutan soal (Fisher-Yates Shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fungsi untuk menyiapkan 50 soal dari bank soal yang sudah dibuat
function prepare50Soal(materiId: string, isRemidi: boolean = false) {
  const soalAsli = bankSoalAsli[materiId] || bankSoalAsli["default"];
  let selectedSoal = [];
  
  // Ambil maksimal 50 soal
  for (let i = 0; i < Math.min(soalAsli.length, 50); i++) {
    selectedSoal.push({ ...soalAsli[i], id: i + 1 });
  }

  // Jika bank soal kurang dari 50 (untuk materi yang belum di-generate penuh), fallback otomatis
  for (let i = soalAsli.length; i < 50; i++) {
    selectedSoal.push({
      id: i + 1,
      question: `Soal Pemantapan #${i + 1} (Modul ${materiId.toUpperCase()}) - Apakah logika utama dalam tahap ini?`,
      options: ["A", "B", "C", "D"],
      answer: i % 4
    });
  }

  // Saat remidi, acak urutan soal agar siswa tidak bisa menghafal posisi jawaban
  if (isRemidi) {
    selectedSoal = shuffleArray(selectedSoal);
    // Re-assign id setelah diacak
    selectedSoal = selectedSoal.map((s, idx) => ({ ...s, id: idx + 1 }));
  }

  return selectedSoal;
}

export default function LatihanSoalPage() {
  const params = useParams();
  const router = useRouter();
  const materiId = params.id as string;
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [existingScore, setExistingScore] = useState<number | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isRemidiMode, setIsRemidiMode] = useState(false);
  const [showRemidiOption, setShowRemidiOption] = useState(false);

  useEffect(() => {
    setQuestions(prepare50Soal(materiId));
    
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserProfile(user);
      
      // Cek apakah sudah pernah mengerjakan
      fetch('/api/scores?_t=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const myScore = data.find((s: any) => s.username === user.username && s.materiId === materiId);
          if (myScore) {
            setExistingScore(myScore.score);
            setAttemptCount(myScore.attemptCount || 1);
            
            if (myScore.score < KKM) {
              // Skor di bawah KKM - tampilkan opsi remidi
              setShowRemidiOption(true);
              setIsSubmitted(true);
              setScore(myScore.score);
            } else {
              // Skor sudah tuntas KKM
              setIsSubmitted(true);
              setScore(myScore.score);
            }
          }
        })
        .catch(err => console.error("Gagal mengambil histori nilai", err));
    }
  }, [materiId]);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });
  };

  // Mulai mode remidi
  const handleStartRemidi = () => {
    setIsRemidiMode(true);
    setIsSubmitted(false);
    setShowRemidiOption(false);
    setAnswers({});
    setScore(0);
    // Acak ulang soal untuk remidi
    setQuestions(prepare50Soal(materiId, true));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < 50) {
      const confirmSubmit = confirm(`Kamu baru menjawab ${Object.keys(answers).length} dari 50 soal. Yakin ingin mengumpulkan sekarang?`);
      if (!confirmSubmit) return;
    }

    setLoading(true);
    
    // Hitung Nilai (Benar * 2 = 100)
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctCount++;
      }
    });
    
    const finalScore = correctCount * 2;
    setScore(finalScore);
    setIsSubmitted(true);

    // Kirim Nilai ke DB
    if (userProfile) {
      try {
        const res = await fetch('/api/scores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: userProfile.username,
            fullName: userProfile.fullName,
            kelas: userProfile.kelas,
            materiId: materiId,
            score: finalScore,
            isRemidi: isRemidiMode
          })
        });
        
        if (!res.ok) {
          const errData = await res.json();
          alert(errData.error || "Terjadi kesalahan saat menyimpan nilai.");
        } else {
          setExistingScore(finalScore);
          setAttemptCount(prev => prev + 1);
          
          // Jika masih di bawah KKM setelah remidi, tampilkan opsi remidi lagi
          if (finalScore < KKM) {
            setShowRemidiOption(true);
          }
        }
      } catch (error) {
        console.error("Gagal mengirim nilai", error);
        alert("Gagal terhubung ke server. Pastikan aplikasi berjalan dengan baik.");
      }
    }
    
    setLoading(false);
  };

  if (questions.length === 0) return <div className="p-8 text-center text-slate-500">Memuat bank soal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800">
              {isRemidiMode ? "🔄 Remedial Uji Kompetensi" : "Latihan Soal Uji Kompetensi"}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Modul: {materiId.toUpperCase()} &bull; Total: 50 Soal &bull; KKM: {KKM}
              {isRemidiMode && <span className="ml-2 text-amber-600 font-bold">(Percobaan ke-{attemptCount + 1})</span>}
            </p>
          </div>
          <Link href="/dashboard/siswa" className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm">
            Kembali
          </Link>
        </div>

        {/* Modal Hasil + Remidi */}
        {isSubmitted && (
          <div className={`mb-8 p-8 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden ${
            score >= KKM 
              ? 'bg-gradient-to-br from-emerald-600 to-teal-700' 
              : 'bg-gradient-to-br from-red-600 to-rose-700'
          }`}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            {/* Hasil Skor */}
            <h2 className="text-2xl font-bold mb-2 relative z-10">
              {score >= KKM ? "✅ Hasil Uji Kompetensi" : "⚠️ Hasil Uji Kompetensi"}
            </h2>
            <div className="text-7xl font-black mb-4 relative z-10">{score}</div>
            
            {/* Status KKM */}
            {score >= KKM ? (
              <div className="relative z-10">
                <p className="text-lg font-medium mb-6 text-emerald-100">
                  🎉 Luar biasa! Kamu TUNTAS KKM ({KKM})! Kamu boleh lanjut ke pertemuan berikutnya.
                </p>
                {existingScore !== null && (
                  <div className="bg-black/20 inline-block px-4 py-3 rounded-xl">
                    <p className="text-sm font-bold text-emerald-300 mb-1">✅ Nilai Tersimpan</p>
                    <p className="text-sm text-emerald-50">Nilai kamu sudah direkam di buku rapor guru.</p>
                    {attemptCount > 1 && (
                      <p className="text-xs text-emerald-200 mt-1">Percobaan: {attemptCount}x {isRemidiMode ? '(Remidi)' : ''}</p>
                    )}
                    <Link href="/dashboard/siswa" className="inline-block mt-3 bg-white text-emerald-700 px-4 py-2 rounded-lg font-bold text-sm">
                      Kembali ke Dashboard
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative z-10">
                <p className="text-lg font-medium mb-2 text-red-100">
                  💪 Nilai kamu belum mencapai KKM ({KKM}).
                </p>
                
                {/* Peringatan Keras */}
                <div className="bg-black/30 rounded-2xl p-5 mb-6 border border-red-400/30">
                  <div className="text-4xl mb-3">📚</div>
                  <p className="text-base font-bold text-amber-300 mb-2">
                    ⚠️ Kamu BELUM BOLEH lanjut ke pertemuan berikutnya!
                  </p>
                  <p className="text-sm text-red-100 leading-relaxed">
                    Pelajari kembali materi <strong>{materiId.toUpperCase()}</strong> dengan teliti, pahami setiap konsep, 
                    lalu kerjakan remidi sampai nilai kamu mencapai <strong>minimal {KKM}</strong>.
                    Pertemuan selanjutnya akan terkunci sampai kamu tuntas.
                  </p>
                  {attemptCount > 0 && (
                    <p className="text-xs text-red-200 mt-2">
                      Sudah mencoba: {attemptCount}x | Nilai tertinggi: {existingScore || score}
                    </p>
                  )}
                </div>

                {/* Tombol Remidi */}
                {showRemidiOption && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link 
                      href={`/dashboard/siswa/materi/${materiId}`}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg"
                    >
                      📖 Pelajari Ulang Materi
                    </Link>
                    <button
                      onClick={handleStartRemidi}
                      className="bg-white hover:bg-red-50 text-red-700 px-6 py-3 rounded-xl font-bold transition-colors shadow-lg border-2 border-white/50"
                    >
                      🔄 Mulai Remedial
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info KKM Banner (saat mengerjakan) */}
        {!isSubmitted && (
          <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl flex items-center gap-3">
            <div className="text-2xl">📋</div>
            <div>
              <p className="font-bold text-amber-800 text-sm">Kriteria Ketuntasan Minimal (KKM): {KKM}</p>
              <p className="text-amber-600 text-xs">Kamu harus mendapat nilai minimal {KKM} untuk bisa lanjut ke pertemuan berikutnya. Jika belum tuntas, kamu akan diberikan kesempatan remidi.</p>
            </div>
          </div>
        )}

        {/* Daftar Soal */}
        {!isSubmitted && (
          <div className="space-y-8">
            {questions.map((q, qIndex) => (
              <div key={q.id} className={`p-6 rounded-2xl border-2 transition-all border-slate-200 bg-white shadow-sm`}>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex gap-3">
                  <span className={`${isRemidiMode ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'} px-3 py-1 rounded-lg text-sm self-start`}>{q.id}</span>
                  <span>{q.question}</span>
                </h3>
                
                <div className="space-y-3 pl-12">
                  {q.options.map((opt: string, oIndex: number) => {
                    const isSelected = answers[qIndex] === oIndex;
                    let btnStyle = "border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50";
                    if (isSelected) btnStyle = "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200";

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelectAnswer(qIndex, oIndex)}
                        className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs
                            ${isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300'}`}>
                            {isSelected && "✓"}
                          </div>
                          {opt}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Action */}
        {!isSubmitted && (
          <div className="mt-12 sticky bottom-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-xl flex items-center justify-between">
            <div className="text-slate-600 font-medium">
              Terjawab: <span className="font-black text-sky-600 text-xl">{Object.keys(answers).length}</span> / 50
              {isRemidiMode && <span className="ml-2 text-amber-600 text-sm font-bold">(Mode Remidi)</span>}
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className={`${isRemidiMode 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-amber-500/30' 
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-sky-500/30'
              } text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 disabled:opacity-50`}
            >
              {loading ? "Menyimpan Nilai..." : "Kumpulkan & Lihat Nilai"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
