"use client";

import { useEffect, useState } from "react";

interface StudentRank {
  id: string;
  username: string;
  name: string;
  kelas: string;
  modulesCompleted: number;
  xp: number;
}

export default function LeaderboardUI({ data }: { data: StudentRank[] }) {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  const handleBack = () => {
    if (currentUser?.role === 'guru') {
      window.location.href = '/dashboard/guru';
    } else if (currentUser?.role === 'siswa') {
      window.location.href = '/dashboard/siswa';
    } else {
      window.location.href = '/';
    }
  };

  const top3 = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 drop-shadow-sm">
              🏆 Hall of Fame
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Papan Peringkat Siswa KKA Tertinggi</p>
          </div>
          <button 
            onClick={handleBack}
            className="px-6 py-2.5 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl font-bold transition-all shadow-lg border border-slate-700"
          >
            Kembali
          </button>
        </header>

        {data.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700 backdrop-blur-md">
            <p className="text-slate-400 text-lg">Belum ada data siswa.</p>
          </div>
        ) : (
          <>
            {/* Podium Top 3 */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 mb-16 mt-8">
              {/* Rank 2 - Silver */}
              {top3[1] && (
                <div className="flex flex-col items-center order-2 md:order-1 transform transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(226,232,240,0.4)] mb-3 z-10 font-black text-slate-500 border-4 border-slate-300">2</div>
                  <div className="bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-t-2xl p-6 pb-12 w-48 text-center border-t border-x border-slate-600 shadow-xl backdrop-blur-sm">
                    <p className="font-bold text-white text-lg truncate w-full">{top3[1].name}</p>
                    <p className="text-xs text-slate-400 mt-1">{top3[1].kelas}</p>
                    <div className="mt-4 inline-block px-3 py-1 bg-slate-900/50 rounded-lg border border-slate-600">
                      <p className="text-sm font-black text-slate-300">{top3[1].xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rank 1 - Gold */}
              {top3[0] && (
                <div className="flex flex-col items-center order-1 md:order-2 transform transition-transform hover:-translate-y-2 relative">
                  <div className="absolute -top-10 text-4xl animate-bounce">👑</div>
                  <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(251,191,36,0.6)] mb-3 z-10 font-black text-amber-800 border-4 border-amber-200">1</div>
                  <div className="bg-gradient-to-t from-amber-900/80 to-amber-700/80 rounded-t-2xl p-6 pb-20 w-56 text-center border-t border-x border-amber-500/50 shadow-[0_-10px_30px_rgba(251,191,36,0.2)] backdrop-blur-sm">
                    <p className="font-black text-white text-xl truncate w-full">{top3[0].name}</p>
                    <p className="text-sm text-amber-200/80 mt-1">{top3[0].kelas}</p>
                    <div className="mt-4 inline-block px-4 py-1.5 bg-amber-950/50 rounded-lg border border-amber-500/30">
                      <p className="text-base font-black text-amber-400">{top3[0].xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rank 3 - Bronze */}
              {top3[2] && (
                <div className="flex flex-col items-center order-3 md:order-3 transform transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(180,83,9,0.4)] mb-3 z-10 font-black text-amber-200 border-4 border-amber-600">3</div>
                  <div className="bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-t-2xl p-6 pb-8 w-48 text-center border-t border-x border-slate-600 shadow-xl backdrop-blur-sm">
                    <p className="font-bold text-white text-lg truncate w-full">{top3[2].name}</p>
                    <p className="text-xs text-slate-400 mt-1">{top3[2].kelas}</p>
                    <div className="mt-4 inline-block px-3 py-1 bg-slate-900/50 rounded-lg border border-slate-600">
                      <p className="text-sm font-black text-amber-600/80">{top3[2].xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Ranks */}
            {others.length > 0 && (
              <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700 p-2 sm:p-6 shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider border-b border-slate-700/50">
                        <th className="p-4 font-semibold text-center w-16">Peringkat</th>
                        <th className="p-4 font-semibold">Nama Siswa</th>
                        <th className="p-4 font-semibold hidden sm:table-cell">Kelas</th>
                        <th className="p-4 font-semibold text-center hidden md:table-cell">Modul Tuntas</th>
                        <th className="p-4 font-semibold text-right">Total XP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                      {others.map((student, index) => {
                        const rank = index + 4;
                        const isMe = currentUser?.username === student.username;
                        
                        return (
                          <tr key={student.id} className={`transition-colors hover:bg-slate-700/30 ${isMe ? 'bg-indigo-900/30' : ''}`}>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/50 text-slate-300 font-black text-sm border border-slate-600">
                                {rank}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-inner">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-200">
                                    {student.name}
                                    {isMe && <span className="ml-2 text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Anda</span>}
                                  </p>
                                  <p className="text-xs text-slate-500 font-mono">@{student.username}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-slate-400 font-medium hidden sm:table-cell">{student.kelas}</td>
                            <td className="p-4 text-center hidden md:table-cell">
                              <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-bold border border-slate-600">
                                {student.modulesCompleted}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                {student.xp.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
