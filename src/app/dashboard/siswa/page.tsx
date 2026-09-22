"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { labData } from '@/data/labData';
import AnnouncementBanner from './AnnouncementBanner';

export default function SiswaDashboard() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userScores, setUserScores] = useState<any[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserProfile(user);
      
      fetch('/api/scores?_t=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const myScores = data.filter((s: any) => s.username === user.username);
          setUserScores(myScores);
        })
        .catch(err => console.error(err));
    }
  }, []);

  
  useEffect(() => {
    if (!userProfile) return;
    const ping = () => {
      fetch('/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userProfile.username })
      }).catch(() => {});
    };
    ping();
    const interval = setInterval(ping, 60000);
    const handleUnload = () => {
      // Use sendBeacon for reliable delivery when closing tab
      navigator.sendBeacon('/api/ping', JSON.stringify({ username: userProfile.username, logout: true }));
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [userProfile]);


  
  const handleLogout = async () => {
    if (userProfile && userProfile.username) {
      await fetch('/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userProfile.username, logout: true })
      }).catch(() => {});
    }
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };


  // Strict check logic (same as Raport)
  const isModuleStrictlyTuntas = (modulId: string) => {
    const isLatihanDone = userScores.some(s => s.materiId === modulId);
    
    const labChallenges = userScores.filter(s => s.materiId.startsWith(modulId + "-lab-chal"));
    const doneChalIds = new Set(labChallenges.map(c => c.materiId));
    
    const labDef = (labData as any)[modulId];
    const totalChallenges = labDef && labDef.challenges ? labDef.challenges.length : 0;
    
    const isLabDone = totalChallenges === 0 ? true : (doneChalIds.size >= totalChallenges);
    
    return isLatihanDone && isLabDone;
  };

  const getModulStatus = (modulId: string, index: number, semester: number) => {
    const tuntas = isModuleStrictlyTuntas(modulId);
    if (tuntas) return 'Selesai';
    
    if (semester === 1) {
      if (index === 0) return 'Proses';
      const prevModulId = `s1-p${index}`;
      const prevTuntas = isModuleStrictlyTuntas(prevModulId);
      return prevTuntas ? 'Proses' : 'Terkunci';
    }
    
    if (semester === 2) {
      if (index === 0) {
        const isS1Done = isModuleStrictlyTuntas('s1-p12');
        return isS1Done ? 'Proses' : 'Terkunci';
      }
      const prevModulId = `s2-p${index}`;
      const prevTuntas = isModuleStrictlyTuntas(prevModulId);
      return prevTuntas ? 'Proses' : 'Terkunci';
    }
    
    return 'Terkunci'; 
  };

  const semester1Titles = [
    "Pengantar Berpikir Komputasional", "Algoritma dan Pseudocode", "Pengenalan Bahasa Pemrograman (Python)",
    "Variabel dan Tipe Data", "Operator Logika dan Aritmatika", "Percabangan (If/Else)",
    "Perulangan (For/While)", "Fungsi dan Prosedur", "Struktur Data Dasar (List, Array)",
    "Penanganan Error (Debugging)", "Studi Kasus Algoritma Terapan", "Projek Nyata: Membuat Kalkulator Pintar"
  ];
  
  const semester2Titles = [
    "Sejarah dan Konsep Dasar AI", "Machine Learning vs Tradisional", "Supervised Learning (Klasifikasi)", 
    "Supervised Learning (Regresi)", "Unsupervised Learning (Clustering)", "Pengantar Jaringan Saraf Tiruan (ANN)",
    "Deep Learning & Computer Vision", "Natural Language Processing (NLP)", "Reinforcement Learning & AI Agents", 
    "Generative AI & Etika AI", "AIoT (AI & Internet of Things)", "Deployment AI & API"
  ];

  const semester1 = semester1Titles.map((title, i) => {
    const id = `s1-p${i+1}`;
    return {
      id, pertemuan: i + 1, title, semester: 1, 
      hasMateri: true, hasLatihan: true, hasPraktek: i === 11, hasLab: true, 
      status: getModulStatus(id, i, 1)
    };
  });

  const semester2 = semester2Titles.map((title, i) => {
    const id = `s2-p${i+1}`;
    return {
      id, pertemuan: i + 1, title, semester: 2, 
      hasMateri: true, hasLatihan: true, hasPraktek: i === 11, hasLab: true, 
      status: getModulStatus(id, i, 2)
    };
  });

  const renderCard = (modul: any) => {
    let borderTheme = modul.semester === 1 ? 'border-sky-200' : 'border-fuchsia-200';
    let gradientBg = "bg-slate-800/50 backdrop-blur-sm";
    let icon = "\uD83D\uDD12";
    
    // Status visual
    if (modul.status === 'Selesai') {
      gradientBg = "bg-emerald-950/30 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
      icon = "\u2705"; } else if (modul.status === 'Proses') {
      gradientBg = "bg-slate-800/80 border-sky-400/50 ring-2 ring-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-[1.02]";
      icon = "\u25B6\uFE0F"; } else {
      gradientBg = "bg-[#0f172a] border-slate-700/50 opacity-60";
      icon = "\uD83D\uDD12";
    }

    return (
      <div key={modul.id} className={`relative flex flex-col p-6 rounded-3xl border ${borderTheme} ${gradientBg} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-slate-950 border border-slate-700 text-white text-xs shadow-[0_0_10px_rgba(0,0,0,0.5)] font-black px-3 py-1.5 rounded-xl shadow-sm">
            P{modul.pertemuan}
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
        
                  <h3 className="text-lg font-black text-white mb-2 leading-tight drop-shadow-md">
            {modul.title}
          </h3>
          
          {modul.status !== 'Terkunci' && (
            <div className="flex gap-2 mb-3 mt-1">
              {(() => {
                const latihanScore = userScores.find(s => s.materiId === modul.id)?.score || 0;
                const labChallenges = userScores.filter(s => s.materiId.startsWith(modul.id + "-lab-chal"));
                const labDef = (labData as any)[modul.id];
                const totalChallenges = labDef && labDef.challenges ? labDef.challenges.length : 0;
                const labTotal = labChallenges.reduce((acc, curr) => acc + curr.score, 0);
                const maxLabScore = labDef && labDef.challenges ? labDef.challenges.reduce((sum, chal) => sum + (chal.poin || 0), 0) : 0;
                const labScore = labTotal;
                
                return (
                  <>
                    <div className="flex-1 bg-slate-900/50 rounded-lg py-1.5 px-3 border border-slate-700/50 flex justify-between items-center shadow-inner">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Latihan</span>
                      <span className="text-sm font-black text-sky-400">{latihanScore}</span>
                    </div>
                    {totalChallenges > 0 && (
                      <div className="flex-1 bg-slate-900/50 rounded-lg py-1.5 px-3 border border-slate-700/50 flex justify-between items-center shadow-inner">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lab</span>
                        <span className="text-sm font-black text-fuchsia-400">{labScore}<span className="text-[10px] font-normal text-fuchsia-400/70">/{maxLabScore}</span></span>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {modul.hasMateri && (
            <Link 
              href={modul.status === 'Terkunci' ? '#' : `/dashboard/siswa/materi/${modul.id}`}
              className={`flex-1 text-center py-2.5 rounded-xl text-sm font-bold transition ${
                modul.status === 'Terkunci' ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-900 shadow-md'
              }`}
            >
              📖 Materi
            </Link>
          )}
          {modul.hasLab && (
            <Link 
              href={modul.status === 'Terkunci' ? '#' : `/dashboard/siswa/lab/${modul.id}`}
              className={`flex-1 text-center py-2.5 rounded-xl text-sm font-bold transition border ${
                modul.status === 'Terkunci' ? 'border-slate-200 text-slate-400 cursor-not-allowed' : 'border-blue-500 text-blue-700 hover:bg-blue-50'
              }`}
            >
              💻 Lab
            </Link>
          )}
          {modul.hasLatihan && (
            <Link 
              href={modul.status === 'Terkunci' ? '#' : `/dashboard/siswa/latihan/${modul.id}`}
              className={`flex-1 text-center py-2.5 rounded-xl text-sm font-bold transition border ${
                modul.status === 'Terkunci' ? 'border-slate-200 text-slate-400 cursor-not-allowed' : 'border-indigo-500 text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              📝 Kuis
            </Link>
          )}
        </div>
      </div>
    );
  };

  if (!userProfile) return <div className="min-h-screen flex items-center justify-center font-sans text-white bg-[#0f172a]">Memuat dashboard...</div>;

  // Correct calculation for Modul Tuntas and EXP
  const completedModulesCount = [...semester1, ...semester2].filter(m => m.status === 'Selesai').length;
  // EXP: Sum of ALL scores (Latihan + Lab) multiplied by 10.
  const totalExp = userScores.reduce((acc, curr) => acc + (curr.score || 0), 0) * 10;

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans text-slate-200 pb-20">
      <AnnouncementBanner />
      {/* Gamified Hero Banner */}
      <div className="relative overflow-hidden bg-slate-900 pt-16 pb-16 px-6 md:px-10 rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-600 p-1 shadow-xl shadow-indigo-500/30 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            </div>
            <div>
              <div className="text-sky-300 font-bold uppercase tracking-widest text-sm mb-1">Level {Math.floor(totalExp / 1000) + 1} Novice</div>
              <h1 className="text-3xl md:text-4xl font-black text-white">{userProfile.fullName}</h1>
              <p className="text-slate-400 mt-1 font-medium">{userProfile.kelas} ' ID: {userProfile.username}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center justify-center gap-6 w-full sm:w-auto">
              <div className="text-center">
                <div className="text-xs font-bold text-sky-200 uppercase">Modul Tuntas</div>
                <div className="text-2xl font-black text-white">{completedModulesCount}<span className="text-lg text-slate-400">/24</span></div>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-center">
                <div className="text-xs font-bold text-amber-200 uppercase">Poin EXP</div>
                <div className="text-2xl font-black text-amber-400">{totalExp.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Link href="/dashboard/leaderboard" className="px-6 py-2.5 text-center text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <span>🏆</span> Leaderboard
              </Link>
              <div className="flex gap-2">
                <Link href="/dashboard/siswa/raport" className="flex-1 px-4 py-2 text-center text-slate-900 bg-white hover:bg-sky-50 rounded-xl font-bold shadow-lg transition-colors text-sm">
                  📊 Raport
                </Link>
                <button onClick={handleLogout} className="flex-1 px-4 py-2 text-center text-white bg-slate-800 hover:bg-slate-700 rounded-xl font-bold border border-slate-700 transition-colors text-sm">Keluar</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Course Map */}
      <div className="max-w-6xl mx-auto px-6 mt-8 relative z-10">
        
        {/* Semester 1 */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl font-black">1</div>
            <div>
              <h2 className="text-2xl font-black text-white">Semester 1</h2>
              <p className="text-slate-400 font-medium">Berpikir Komputasional & Python Dasar</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {semester1.map(renderCard)}
          </div>
        </div>

        {/* Semester 2 */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center text-xl font-black">2</div>
            <div>
              <h2 className="text-2xl font-black text-white">Semester 2</h2>
              <p className="text-slate-400 font-medium">Kecerdasan Artifisial & Machine Learning</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {semester2.map(renderCard)}
          </div>
        </div>
        
      </div>
      
      {/* Footer */}
      <footer className="mt-16 pb-8 text-center relative z-10">
        <p className="text-sm font-bold text-slate-400 mb-1">
          LMS KKA (Koding & Kecerdasan Artifisial)
        </p>
        <p className="text-xs font-semibold text-slate-500">
          Design by Adiningtyas Yuli Purwanto, S.Kom
        </p>
      </footer>
      
    </div>
  );
}

