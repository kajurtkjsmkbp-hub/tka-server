"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { bankSoalAsli } from "./bankSoal";

// Fungsi untuk menyiapkan 50 soal dari bank soal yang sudah dibuat
function prepare50Soal(materiId: string) {
  const soalAsli = bankSoalAsli[materiId] || bankSoalAsli["default"];
  const totalSoal = [];
  
  // Ambil maksimal 50 soal
  for (let i = 0; i < Math.min(soalAsli.length, 50); i++) {
    totalSoal.push({ ...soalAsli[i], id: i + 1 });
  }

  // Jika bank soal kurang dari 50 (untuk materi yang belum di-generate penuh), fallback otomatis
  for (let i = soalAsli.length; i < 50; i++) {
    totalSoal.push({
      id: i + 1,
      question: `Soal Pemantapan #${i + 1} (Modul ${materiId.toUpperCase()}) - Apakah logika utama dalam tahap ini?`,
      options: ["A", "B", "C", "D"],
      answer: i % 4
    });
  }
  return totalSoal;
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
            setIsSubmitted(true);
            setScore(myScore.score);
          }
        })
        .catch(err => console.error("Gagal mengambil histori nilai", err));
    }
  }, [materiId]);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted || existingScore !== null) return;
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });
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
            score: finalScore
          })
        });
        
        if (!res.ok) {
          alert("Terjadi kesalahan saat menyimpan nilai. Silakan lapor ke guru.");
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
            <h1 className="text-3xl font-black text-slate-800">Latihan Soal Uji Kompetensi</h1>
            <p className="text-slate-500 mt-2 font-medium">Modul: {materiId.toUpperCase()} &bull; Total: 50 Soal</p>
          </div>
          <Link href="/dashboard/siswa" className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm">
            Kembali
          </Link>
        </div>

        {/* Modal Histori / Hasil */}
        {isSubmitted && (
          <div className="mb-8 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <h2 className="text-2xl font-bold text-indigo-100 mb-2 relative z-10">
              {existingScore !== null ? "⚠️ Kamu Sudah Mengerjakan Latihan Ini" : "Hasil Uji Kompetensi"}
            </h2>
            <div className="text-7xl font-black mb-4 relative z-10">{score}</div>
            <p className="text-lg text-indigo-100 font-medium mb-6 relative z-10">
              {score >= 75 ? "🎉 Luar biasa! Kamu TUNTAS/LULUS KKM!" : "💪 Jangan menyerah! Kamu harus REMEDIAL (Di bawah 75)."}
            </p>
            
            {existingScore !== null ? (
              <div className="bg-black/20 inline-block px-4 py-3 rounded-xl relative z-10">
                <p className="text-sm font-bold text-sky-300 mb-1">Histori Tersimpan</p>
                <p className="text-sm text-indigo-50">Sistem mendeteksi kamu sudah pernah mensubmit tugas ini. Nilai ini sudah direkam secara permanen di buku rapor guru.</p>
                <Link href="/dashboard/siswa" className="inline-block mt-3 bg-white text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm">Kembali ke Dashboard</Link>
              </div>
            ) : (
              <div className="bg-black/20 inline-block px-4 py-3 rounded-xl relative z-10">
                <p className="text-sm font-bold text-amber-300 mb-1">🔒 Kunci Jawaban Dirahasiakan</p>
                <p className="text-sm text-indigo-50">Nilai & detail jawaban kamu telah masuk ke Dashboard Guru untuk diperiksa lebih lanjut.</p>
              </div>
            )}
          </div>
        )}

        {/* Daftar Soal */}
        <div className="space-y-8">
          {questions.map((q, qIndex) => (
            <div key={q.id} className={`p-6 rounded-2xl border-2 transition-all ${isSubmitted ? 'border-slate-300 bg-slate-50 opacity-70' : 'border-slate-200 bg-white shadow-sm'}`}>
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex gap-3">
                <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-lg text-sm self-start">{q.id}</span>
                <span>{q.question}</span>
              </h3>
              
              <div className="space-y-3 pl-12">
                {q.options.map((opt: string, oIndex: number) => {
                  const isSelected = answers[qIndex] === oIndex;

                  // Jika sudah submit, hilangkan indikator benar/salah. Tetap tunjukkan mana yang dipilih siswa saja.
                  let btnStyle = "border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50";
                  if (isSelected) btnStyle = "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200";

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelectAnswer(qIndex, oIndex)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${btnStyle} ${isSubmitted ? 'cursor-not-allowed' : ''}`}
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

        {/* Submit Action */}
        {!isSubmitted && (
          <div className="mt-12 sticky bottom-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-xl flex items-center justify-between">
            <div className="text-slate-600 font-medium">
              Terjawab: <span className="font-black text-sky-600 text-xl">{Object.keys(answers).length}</span> / 50
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-sky-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Menyimpan Nilai..." : "Kumpulkan & Lihat Nilai"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
