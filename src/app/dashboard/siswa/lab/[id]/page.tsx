"use client";

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { labData } from '@/data/labData';

export default function VirtualLab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = labData[id] || { 
    title: "Sandbox Virtual Lab", 
    challenges: [{
      id: 1,
      title: "Area Percobaan",
      prompt: "Silakan praktekkan kode Python apapun di sini. Sistem hanya akan memvalidasi apakah ada perintah cetak (print).",
      checks: ['print'],
      simOut: "Program berjalan sukses.",
      successMsg: "Sukses jalan!",
      poin: 0,
      answerCode: "print('Halo')",
      penalty: 0
    }]
  };
  
  const [currentChalIndex, setCurrentChalIndex] = useState(0);
  const challenge = data.challenges[currentChalIndex];
  
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);
  
  const [showAnswer, setShowAnswer] = useState(false);
  const [penaltyApplied, setPenaltyApplied] = useState(false);
  const penaltyRef = useRef(false);
  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      
      // Check if already completed this virtual lab
      fetch('/api/scores?_t=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(scores => {
          const myScores = scores.filter((s: any) => s.username === user.username && s.materiId.startsWith(id + "-lab-chal"));
          // If the student has as many scores for this lab as there are challenges, they've finished it
          if (myScores.length >= data.challenges.length && data.challenges.length > 0) {
            setAlreadyCompleted(true);
            const sum = myScores.reduce((acc: number, curr: any) => acc + curr.score, 0);
            setTotalEarned(sum);
          } else if (myScores.length > 0) {
            // Jump to the latest uncompleted challenge automatically (e.g. if myScores is 2, index goes to 2 which is challenge 3)
            setCurrentChalIndex(myScores.length);
          }
        })
        .catch(console.error);
    }
  }, [id, data.challenges.length]);
  
  // Reset state on challenge change
  useEffect(() => {
    setCode("");
    setOutput("");
    setIsSuccess(false);
    setShowAnswer(false);
    setPenaltyApplied(false);
    penaltyRef.current = false;
  }, [currentChalIndex]);

  const handleShowAnswer = () => {
    if (confirm("Apakah Anda yakin ingin melihat kunci jawaban? Poin Anda akan dikurangi " + challenge.penalty + " poin untuk tantangan ini.")) {
      setShowAnswer(true);
      setPenaltyApplied(true);
      penaltyRef.current = true;
      setCode(challenge.answerCode);
    }
  };
  
  const handleRun = async () => {
    if (isSuccess) return;
    setOutput("Running script...");
    setIsSuccess(false);
    
    setTimeout(async () => {
      let simOut = "";
      let cleaned = code.replace(/'/g, '"');
      
      let allChecksPass = true;
      for (const check of challenge.checks) {
        if (!cleaned.includes(check.replace(/'/g, '"'))) {
          allChecksPass = false;
          break;
        }
      }
      
      if (allChecksPass && code.trim().length > 0) {
        simOut = challenge.simOut;
        setIsSuccess(true);
        
        let finalPoin = challenge.poin;
        if (penaltyRef.current) {
          finalPoin = Math.max(0, finalPoin - challenge.penalty);
        }
        
        if (currentUser && finalPoin > 0) {
          setIsSubmitting(true);
          try {
            await fetch('/api/scores', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: currentUser.username,
                fullName: currentUser.fullName,
                kelas: currentUser.kelas,
                materiId: id + "-lab-chal" + challenge.id,
                score: finalPoin
              })
            });
          } catch (e) {
            console.error(e);
          }
          setIsSubmitting(false);
        }
      } else {
        if (code.trim().length === 0) {
          simOut = "Error: Kode kosong.";
        } else if (!code.includes("print")) {
          simOut = "Error: Tidak ada perintah cetak (print).";
        } else {
          simOut = "Output belum sesuai atau kode kurang tepat. Silakan cek lagi logika dan penulisannya.";
        }
      }
      
      setOutput(simOut);
    }, 800);
  };
  
  const [labCompleted, setLabCompleted] = useState(false);

  const handleNextChallenge = () => {
    if (currentChalIndex < data.challenges.length - 1) {
      setCurrentChalIndex(prev => prev + 1);
    } else {
      setLabCompleted(true);
    }
  };
  
  if (labCompleted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-200">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">Virtual Lab Selesai!</h2>
          <p className="text-lg text-slate-600 mb-8">
            Selamat! Kamu telah menyelesaikan semua tantangan pemrograman di <strong>{data.title}</strong>. 
            Skor total kamu telah berhasil dikirim ke Dasbor Guru.
          </p>
          <Link href="/dashboard/siswa" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1">
            Kembali ke Dasbor Siswa
          </Link>
        </div>
      </div>
    );
  }
  
  if (alreadyCompleted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-200">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">Akses Terkunci</h2>
          <p className="text-lg text-slate-600 mb-8">
            Kamu sudah pernah menyelesaikan Virtual Lab untuk <strong>{data.title}</strong> sebelumnya. 
            <br/><br/>
            Skor total yang telah kamu kumpulkan di lab ini adalah: <strong className="text-indigo-600">{totalEarned} EXP</strong>.
          </p>
          <Link href="/dashboard/siswa" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1">
            Kembali ke Dasbor Siswa
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <span className="text-4xl">👨‍💻</span> {data.title}
          </h1>
          <Link href="/dashboard/siswa" className="text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 px-4 py-2 rounded-xl transition-colors">
            Kembali
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex gap-2">
            {data.challenges.map((c, i) => (
              <div key={c.id} className={`w-10 h-3 rounded-full ${i < currentChalIndex ? 'bg-emerald-500' : i === currentChalIndex ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-500">
            Tantangan {currentChalIndex + 1} / {data.challenges.length}
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-6 text-white border-b-4 border-slate-900 relative">
            <h2 className="font-black text-xl mb-2 text-indigo-400">#{challenge.id} {challenge.title}</h2>
            <p className="text-lg leading-relaxed text-slate-300">{challenge.prompt}</p>
            
            <div className="mt-5 flex items-center justify-between">
              <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/50 px-4 py-1.5 rounded-full text-sm font-bold">
                ⭐ {penaltyApplied ? Math.max(0, challenge.poin - challenge.penalty) : challenge.poin} Poin
              </div>
              
              {!isSuccess && !showAnswer && challenge.poin > 0 && (
                <button 
                  onClick={handleShowAnswer}
                  className="text-xs font-bold text-rose-300 hover:text-rose-200 bg-rose-900/40 hover:bg-rose-900/60 px-3 py-1.5 rounded-lg transition-colors border border-rose-800"
                >
                  Bocoran Kunci Jawaban (-{challenge.penalty} Poin)
                </button>
              )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2">
            <div className="p-0 border-r border-slate-200 bg-[#1e1e1e] flex flex-col">
              <div className="bg-[#2d2d2d] text-slate-400 text-xs py-2 px-4 font-mono flex items-center justify-between border-b border-[#404040]">
                <span>script.py</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <textarea 
                className="flex-1 w-full p-4 bg-[#1e1e1e] text-emerald-400 font-mono text-sm resize-none focus:outline-none focus:ring-0"
                placeholder="# Ketik kodemu di sini..."
                rows={12}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                disabled={isSuccess}
              ></textarea>
              <div className="p-4 bg-[#252526] border-t border-[#404040]">
                <button 
                  onClick={handleRun}
                  disabled={isSuccess}
                  className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${isSuccess ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                >
                  {isSuccess ? '✔️ Sudah Selesai' : '▶️ Jalankan Kode'}
                </button>
              </div>
            </div>
            
            <div className="bg-slate-900 flex flex-col">
              <div className="bg-slate-800 text-slate-400 text-xs py-2 px-4 font-mono border-b border-slate-700">
                Console Output
              </div>
              <div className={`p-4 font-mono text-sm flex-1 whitespace-pre-wrap ${output.includes("Error") || output.includes("belum sesuai") ? 'text-rose-400' : 'text-slate-300'}`}>
                {output || <span className="text-slate-600 opacity-50">Belum ada output.</span>}
              </div>
            </div>
          </div>
        </div>
        
        {isSuccess && (
          <div className="mt-8 bg-emerald-100 border-2 border-emerald-300 p-6 rounded-2xl animate-fade-in-up">
            <h3 className="text-xl font-black text-emerald-800 mb-2 flex items-center gap-2">
              🎉 Berhasil!
            </h3>
            <p className="text-emerald-700 font-medium mb-3">{challenge.successMsg}</p>
            {challenge.poin > 0 && (
              <div className="inline-block bg-emerald-200 text-emerald-900 font-bold px-4 py-2 rounded-xl mb-4 border border-emerald-300">
                {isSubmitting ? "⏳ Menyimpan poin..." : "+" + (penaltyApplied ? Math.max(0, challenge.poin - challenge.penalty) : challenge.poin) + " EXP ditambahkan ke skormu!"}
              </div>
            )}
            <div>
              <button 
                onClick={handleNextChallenge}
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/30"
              >
                {currentChalIndex < data.challenges.length - 1 ? 'Lanjut Tantangan Berikutnya 🚀' : 'Selesaikan & Kembali ke Dashboard 🎉'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
