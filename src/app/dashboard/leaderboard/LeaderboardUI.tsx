"use client";

import { useEffect, useState, useMemo } from "react";

interface StudentRank {
  id: string;
  username: string;
  name: string;
  kelas: string;
  guruPengampu?: string;
  modulesCompleted: number;
  xp: number;
}

export default function LeaderboardUI({ 
  data, 
  teachers = [] 
}: { 
  data: StudentRank[];
  teachers?: any[];
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        setCurrentUser(user);
      } catch (e) {}
    }
  }, []);

  // Tentukan daftar kelas yang boleh diakses oleh user ini
  const { availableClasses, isStudent, isAllClasses } = useMemo(() => {
    if (!currentUser) {
      const allFound = Array.from(new Set(data.map(s => s.kelas).filter(Boolean))).sort();
      return { availableClasses: allFound, isStudent: false, isAllClasses: true };
    }

    // JIKA SISWA: Hanya boleh melihat kelasnya sendiri!
    if (currentUser.role === 'siswa') {
      const studentClass = currentUser.kelas ? [currentUser.kelas.trim()] : [];
      return { 
        availableClasses: studentClass, 
        isStudent: true, 
        isAllClasses: false 
      };
    }

    // JIKA GURU:
    const teacherObj = teachers.find(t => t.username === currentUser.username);
    const teacherClasses = teacherObj?.classes || currentUser.classes || [];
    const hasAll = teacherClasses.length === 0 || teacherClasses.includes('SEMUA');

    if (hasAll) {
      const allFound = Array.from(new Set(data.map(s => s.kelas).filter(Boolean))).sort();
      return { availableClasses: allFound, isStudent: false, isAllClasses: true };
    }

    return { 
      availableClasses: teacherClasses, 
      isStudent: false, 
      isAllClasses: false 
    };
  }, [currentUser, data, teachers]);

  // Set default kelas yang aktif saat inisialisasi
  useEffect(() => {
    if (availableClasses.length > 0) {
      if (!selectedClass || !availableClasses.includes(selectedClass)) {
        setSelectedClass(availableClasses[0]);
      }
    }
  }, [availableClasses, selectedClass]);

  const activeClass = selectedClass || (availableClasses.length > 0 ? availableClasses[0] : "");

  // Saring data siswa KHUSUS untuk kelas aktif dan ambil HANYA TOP 3 (Peringkat 1, 2, 3)
  const top3 = useMemo(() => {
    if (!activeClass) return [];
    const inClass = data.filter(s => s.kelas && s.kelas.trim() === activeClass.trim());
    const sorted = inClass.sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      return b.modulesCompleted - a.modulesCompleted;
    });
    // HANYA ambil 3 siswa teratas (Top 3), selebihnya jangan ditampilkan!
    return sorted.slice(0, 3);
  }, [data, activeClass]);

  const handleBack = () => {
    if (currentUser?.role === 'guru') {
      window.location.href = '/dashboard/guru';
    } else if (currentUser?.role === 'siswa') {
      window.location.href = '/dashboard/siswa';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-8 relative overflow-hidden text-slate-100">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[140px] opacity-25 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[140px] opacity-25 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-6 border-b border-slate-800">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <span>🏆</span> Top 3 Hall of Fame
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 drop-shadow-sm">
              Papan Peringkat Kelas
            </h1>
            <p className="text-slate-400 mt-1.5 text-sm md:text-base font-medium">
              Apresiasi 3 Siswa Terbaik (Juara 1, 2, dan 3) per Rombel Kelas
            </p>
          </div>
          <button 
            onClick={handleBack}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl font-bold transition-all shadow-lg border border-slate-700 flex items-center gap-2 text-sm"
          >
            <span>↩️</span> Kembali
          </button>
        </header>

        {/* Bar Pemilihan / Keterangan Kelas */}
        <div className="mb-10 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 md:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center text-xl shrink-0">
              🏫
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                {isStudent ? "Rombel Kelas Anda" : "Menampilkan Peringkat Kelas"}
              </p>
              <p className="text-lg font-black text-white">
                Kelas {activeClass || "Belum Dipilih"}
              </p>
            </div>
          </div>

          {/* Kontrol Kelas: Jika Siswa, terkunci ke kelasnya sendiri. Jika Guru, bisa memilih kelas yang diajar */}
          <div>
            {isStudent ? (
              <div className="px-4 py-2 bg-indigo-600/30 border border-indigo-500/50 rounded-xl text-indigo-200 text-xs font-bold flex items-center gap-2">
                <span>🔒</span> Terkunci ke Kelas Anda
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:block">
                  Pilih Kelas:
                </label>
                <select
                  value={activeClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2.5 bg-slate-900 border border-indigo-500/50 rounded-xl text-sm font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-inner min-w-[170px]"
                >
                  {availableClasses.map((cls: string) => (
                    <option key={cls} value={cls}>Kelas {cls}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Konten Podium Top 3 */}
        {top3.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 rounded-3xl border border-slate-700/60 backdrop-blur-md shadow-xl my-8">
            <span className="text-5xl block mb-3">🎓</span>
            <p className="text-slate-300 text-lg font-bold">Belum Ada Data Nilai di Kelas {activeClass}</p>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              Siswa di kelas ini belum memiliki riwayat pengerjaan kuis atau tantangan virtual lab.
            </p>
          </div>
        ) : (
          <div className="my-8">
            {/* Podium Peringkat 1, 2, 3 */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-5 md:gap-8 mb-12">
              
              {/* Peringkat 2 (Perak - Juara 2) */}
              {top3[1] && (
                <div className="w-full md:w-64 flex flex-col items-center order-2 md:order-1 transform transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(226,232,240,0.5)] mb-3 z-10 font-black text-slate-600 border-4 border-slate-300">
                    2
                  </div>
                  <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700/90 rounded-t-3xl p-6 pb-12 text-center border-t border-x border-slate-500/40 shadow-2xl backdrop-blur-md">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-600/40 text-slate-300 border border-slate-500/30 mb-2 inline-block">
                      🥈 Juara 2 Kelas
                    </span>
                    <p className="font-extrabold text-white text-lg truncate w-full" title={top3[1].name}>
                      {top3[1].name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">@{top3[1].username}</p>
                    <p className="text-xs text-indigo-300 font-semibold mt-1">Kelas {top3[1].kelas}</p>

                    <div className="mt-4 px-3 py-1.5 bg-slate-900/70 rounded-xl border border-slate-600/60 inline-block">
                      <p className="text-base font-black text-slate-200">{top3[1].xp.toLocaleString()} XP</p>
                      <p className="text-[10px] text-slate-400">{top3[1].modulesCompleted} Modul Tuntas</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Peringkat 1 (Emas - Juara 1) */}
              {top3[0] && (
                <div className="w-full md:w-72 flex flex-col items-center order-1 md:order-2 transform transition-transform hover:-translate-y-2 relative">
                  <div className="absolute -top-10 text-4xl animate-bounce">👑</div>
                  <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-4xl shadow-[0_0_35px_rgba(251,191,36,0.7)] mb-3 z-10 font-black text-amber-900 border-4 border-amber-200">
                    1
                  </div>
                  <div className="w-full bg-gradient-to-t from-amber-950/90 via-amber-900/80 to-amber-800/90 rounded-t-3xl p-6 pb-20 text-center border-t-2 border-x border-amber-400/60 shadow-[0_-10px_40px_rgba(251,191,36,0.25)] backdrop-blur-md ring-1 ring-amber-400/30">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400/30 text-amber-300 border border-amber-400/50 mb-2 inline-block">
                      🥇 Juara 1 Kelas
                    </span>
                    <p className="font-black text-white text-xl truncate w-full" title={top3[0].name}>
                      {top3[0].name}
                    </p>
                    <p className="text-xs text-amber-200/80 font-mono mt-0.5">@{top3[0].username}</p>
                    <p className="text-xs text-amber-300 font-bold mt-1">Kelas {top3[0].kelas}</p>

                    <div className="mt-4 px-4 py-2 bg-amber-950/80 rounded-xl border border-amber-500/50 inline-block shadow-inner">
                      <p className="text-lg font-black text-amber-300">{top3[0].xp.toLocaleString()} XP</p>
                      <p className="text-[11px] text-amber-200/80 font-medium">{top3[0].modulesCompleted} Modul Tuntas</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Peringkat 3 (Perunggu - Juara 3) */}
              {top3[2] && (
                <div className="w-full md:w-64 flex flex-col items-center order-3 md:order-3 transform transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(180,83,9,0.5)] mb-3 z-10 font-black text-amber-200 border-4 border-amber-600">
                    3
                  </div>
                  <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700/90 rounded-t-3xl p-6 pb-10 text-center border-t border-x border-slate-500/40 shadow-2xl backdrop-blur-md">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-900/40 text-amber-300 border border-amber-700/40 mb-2 inline-block">
                      🥉 Juara 3 Kelas
                    </span>
                    <p className="font-extrabold text-white text-lg truncate w-full" title={top3[2].name}>
                      {top3[2].name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">@{top3[2].username}</p>
                    <p className="text-xs text-indigo-300 font-semibold mt-1">Kelas {top3[2].kelas}</p>

                    <div className="mt-4 px-3 py-1.5 bg-slate-900/70 rounded-xl border border-slate-600/60 inline-block">
                      <p className="text-base font-black text-amber-500">{top3[2].xp.toLocaleString()} XP</p>
                      <p className="text-[10px] text-slate-400">{top3[2].modulesCompleted} Modul Tuntas</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Pemberitahuan Kebijakan Privasi (Hanya Top 3 yang Ditampilkan) */}
        <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-5 text-center text-slate-400 text-xs sm:text-sm leading-relaxed backdrop-blur-sm max-w-2xl mx-auto shadow-lg">
          <p className="font-bold text-slate-300 flex items-center justify-center gap-2 mb-1">
            <span>🔒</span> Kebijakan Privasi Papan Peringkat Kelas
          </p>
          <p>
            Sesuai kebijakan akademik, papan peringkat hanya menampilkan <strong>Peringkat 1, 2, dan 3 (Top 3)</strong> per kelas. Peringkat di luar 3 besar tidak dipublikasikan untuk menjaga kenyamanan dan motivasi belajar seluruh siswa.
          </p>
        </div>
      </div>
    </div>
  );
}
