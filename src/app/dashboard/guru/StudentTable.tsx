"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { exportStudentPDF, exportClassPDF } from './pdfExport';

interface ModuleScore {
  latihan: number | null;
  lab: number | null;
}

interface Student {
  id: string;
  username: string;
  name: string;
  kelas: string;
  modulesTaken: number;
  scoreS1: number;
  scoreS2: number;
  moduleScores: Record<string, ModuleScore>;
  isActive: boolean;
}

export default function StudentTable({ initialStudents }: { initialStudents: Student[] }) {
  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const router = useRouter();

  const [onlineStatus, setOnlineStatus] = useState<Record<string, { time: number, isOnline: boolean }>>({});
  const [serverTime, setServerTime] = useState<number>(Date.now());

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const res = await fetch('/api/ping?_t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setOnlineStatus(data.online);
          setServerTime(data.now || Date.now());
        }
      } catch (e) {}
    };
    fetchOnlineStatus();
    const interval = setInterval(fetchOnlineStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const getOnlineDisplay = (username: string) => {
    const statusData = onlineStatus[username];
    if (!statusData) return (
      <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 w-max" title="Belum pernah login">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
        <span className="text-[10px] font-bold text-slate-500 tracking-wide">OFFLINE</span>
      </div>
    );

    const { time, isOnline } = statusData;
    const diffSeconds = Math.floor((serverTime - time) / 1000);

    if (isOnline) {
      return (
        <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 w-max" title="Sedang Online">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-emerald-600 tracking-wide">ONLINE</span>
        </div>
      );
    } else {
      let timeText = "";
      if (diffSeconds < 60) timeText = "Baru saja";
      else if (diffSeconds < 3600) timeText = Math.floor(diffSeconds / 60) + " mnt lalu";
      else if (diffSeconds < 86400) timeText = Math.floor(diffSeconds / 3600) + " jam lalu";
      else timeText = Math.floor(diffSeconds / 86400) + " hr lalu";

      const dateObj = new Date(time);
      const exactTime = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

      return (
        <div className="flex flex-col gap-0.5 w-max">
          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 w-max" title="Sedang Offline">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
            <span className="text-[10px] font-bold text-slate-500 tracking-wide">OFFLINE</span>
          </div>
          <span className="text-[9.5px] text-slate-400 font-semibold px-1">{timeText} ({exactTime})</span>
        </div>
      );
    }
  };

  const handleEdit = (student: any) => {
    setEditingStudent({ ...student });
  };

  const handleSave = async () => {
    if (!editingStudent) return;
    try {
      const res = await fetch(`/api/users/${editingStudent.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: editingStudent.name,
          kelas: editingStudent.kelas,
          isActive: editingStudent.isActive,
        }),
      });
      if (res.ok) {
        setStudents(students.map(s => s.username === editingStudent.username ? editingStudent : s));
        setEditingStudent(null);
        router.refresh();
      } else {
        alert('Gagal mengedit siswa');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat mengedit');
    }
  };

  const handleToggleActive = async (student: any) => {
    try {
      const newActiveStatus = !student.isActive;
      const res = await fetch(`/api/users/${student.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newActiveStatus }),
      });
      if (res.ok) {
        setStudents(students.map(s => s.username === student.username ? { ...s, isActive: newActiveStatus } : s));
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      alert('Gagal mengubah status');
    }
  };

  const handleDelete = async (student: any) => {
    if (!confirm(`Yakin ingin menghapus siswa ${student.name}? Semua data akan hilang!`)) return;
    try {
      const res = await fetch(`/api/users/${student.username}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents(students.filter(s => s.username !== student.username));
        router.refresh();
      } else {
        alert('Gagal menghapus siswa');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat menghapus');
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'bg-slate-50 text-slate-300';
    if (score >= 75) return 'bg-emerald-50 text-emerald-700 font-bold';
    if (score > 0) return 'bg-amber-50 text-amber-700 font-bold';
    return 'bg-rose-50 text-rose-500 font-bold';
  };

  const progressPercent = (taken: number) => Math.round((taken / 24) * 100);

  const [selectedClass, setSelectedClass] = useState<string>('Semua Kelas');
  
  const uniqueClasses = ['Semua Kelas', ...Array.from(new Set(students.map(s => s.kelas))).sort()];
  const filteredStudents = selectedClass === 'Semua Kelas' ? students : students.filter(s => s.kelas === selectedClass);

  return (
    <div className="pb-32">
      {/* Filter & Export Bar */}
      <div className="px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="classFilter" className="text-sm font-semibold text-slate-600">Pilih Kelas:</label>
          <select 
            id="classFilter"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm min-w-[150px]"
          >
            {uniqueClasses.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => exportClassPDF(filteredStudents, selectedClass)} 
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          {selectedClass === 'Semua Kelas' ? 'Export PDF Seluruh Kelas' : `Export PDF Kelas ${selectedClass}`}
        </button>
      </div>

      {/* Student Cards */}
      <div className="divide-y divide-slate-100">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-slate-400">Belum ada siswa terdaftar di kelas ini</div>
        ) : filteredStudents.map((student) => {
          const pct = progressPercent(student.modulesTaken);
          const isExpanded = expandedStudent === student.username;

          return (
            <div key={student.id} className={`${!student.isActive ? 'opacity-50' : ''}`}>
              {/* Main Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-8 py-5 hover:bg-slate-50/80 transition-colors">
                {/* Avatar + Name + Status */}
                <div className="flex items-center gap-3 min-w-[260px]">
                  <div className={`w-11 h-11 rounded-full ${student.isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'} font-bold flex items-center justify-center uppercase text-sm flex-shrink-0`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{student.name} {!student.isActive && <span className="text-xs text-rose-500 font-normal">(Nonaktif)</span>}</div>
                    <div className="text-xs text-slate-400 font-mono">@{student.username}</div>
                    <div className="mt-1">{getOnlineDisplay(student.username)}</div>
                  </div>
                </div>

                {/* Kelas */}
                <div className="min-w-[70px]">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">{student.kelas}</span>
                </div>

                {/* Progress */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-600">{student.modulesTaken} / 24 Modul</span>
                    <span className={`text-xs font-black ${pct >= 100 ? 'text-emerald-600' : pct >= 50 ? 'text-indigo-600' : 'text-slate-400'}`}>{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? 'bg-emerald-500' : pct >= 50 ? 'bg-indigo-500' : 'bg-amber-400'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Rata-rata S1 & S2 */}
                <div className="flex gap-3 min-w-[140px]">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Smt 1</div>
                    <div className={`text-lg font-black ${student.scoreS1 >= 75 ? 'text-emerald-600' : student.scoreS1 > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                      {student.scoreS1 > 0 ? student.scoreS1 : '-'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Smt 2</div>
                    <div className={`text-lg font-black ${student.scoreS2 >= 75 ? 'text-emerald-600' : student.scoreS2 > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                      {student.scoreS2 > 0 ? student.scoreS2 : '-'}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="min-w-[110px] text-center">
                  {(student.scoreS1 >= 75 || student.scoreS2 >= 75) ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">LULUS KKM</span>
                  ) : (student.scoreS1 > 0 || student.scoreS2 > 0) ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">REMEDIAL</span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">BELUM ADA NILAI</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => exportStudentPDF(student)} className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm" title="Export PDF Siswa">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </button>
                  <button onClick={() => setExpandedStudent(isExpanded ? null : student.username)} className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all shadow-sm ${isExpanded ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white'}`} title="Lihat Detail Nilai">
                    <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <button onClick={() => handleEdit(student)} className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all shadow-sm" title="Edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button onClick={() => handleToggleActive(student)} className={`flex items-center justify-center w-8 h-8 rounded-lg ${student.isActive ? 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white'} transition-all shadow-sm`} title={student.isActive ? 'Nonaktifkan' : 'Aktifkan'}>
                    {student.isActive ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                  </button>
                  <button onClick={() => handleDelete(student)} className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm" title="Hapus">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>

              {/* Expanded Detail: Per-module scores */}
              {isExpanded && (
                <div className="px-8 pb-6 bg-slate-50/50">
                  {/* Semester 1 */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">1</span>
                      Semester 1 — Rata-rata: <span className={`${student.scoreS1 >= 75 ? 'text-emerald-600' : student.scoreS1 > 0 ? 'text-amber-600' : 'text-slate-400'}`}>{student.scoreS1 > 0 ? student.scoreS1 : '-'}</span>
                    </h4>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                      {Array.from({ length: 12 }, (_, i) => {
                        const key = `s1-p${i + 1}`;
                        const ms = student.moduleScores[key];
                        const latihan = ms?.latihan;
                        const lab = ms?.lab;
                        return (
                          <div key={key} className="bg-white rounded-xl border border-slate-100 p-2 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-[9px] font-bold text-slate-400 mb-1">P{i + 1}</div>
                            <div className={`text-xs rounded-md py-0.5 mb-0.5 ${getScoreColor(latihan)}`} title="Latihan">
                              {latihan !== null ? latihan : '—'}
                            </div>
                            <div className={`text-[9px] rounded-md py-0.5 ${getScoreColor(lab)}`} title="Lab">
                              {lab !== null ? lab : '—'}
                            </div>
                            <div className="flex justify-center gap-0.5 mt-1">
                              <span className="text-[7px] text-slate-300">L</span>
                              <span className="text-[7px] text-slate-300">|</span>
                              <span className="text-[7px] text-slate-300">Lab</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Semester 2 */}
                  <div>
                    <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-black">2</span>
                      Semester 2 — Rata-rata: <span className={`${student.scoreS2 >= 75 ? 'text-emerald-600' : student.scoreS2 > 0 ? 'text-amber-600' : 'text-slate-400'}`}>{student.scoreS2 > 0 ? student.scoreS2 : '-'}</span>
                    </h4>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                      {Array.from({ length: 12 }, (_, i) => {
                        const key = `s2-p${i + 1}`;
                        const ms = student.moduleScores[key];
                        const latihan = ms?.latihan;
                        const lab = ms?.lab;
                        return (
                          <div key={key} className="bg-white rounded-xl border border-slate-100 p-2 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-[9px] font-bold text-slate-400 mb-1">P{i + 1}</div>
                            <div className={`text-xs rounded-md py-0.5 mb-0.5 ${getScoreColor(latihan)}`} title="Latihan">
                              {latihan !== null ? latihan : '—'}
                            </div>
                            <div className={`text-[9px] rounded-md py-0.5 ${getScoreColor(lab)}`} title="Lab">
                              {lab !== null ? lab : '—'}
                            </div>
                            <div className="flex justify-center gap-0.5 mt-1">
                              <span className="text-[7px] text-slate-300">L</span>
                              <span className="text-[7px] text-slate-300">|</span>
                              <span className="text-[7px] text-slate-300">Lab</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Edit Data Siswa</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={editingStudent.name} 
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Kelas</label>
                <input 
                  type="text" 
                  value={editingStudent.kelas} 
                  onChange={(e) => setEditingStudent({...editingStudent, kelas: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={editingStudent.isActive} 
                  onChange={(e) => setEditingStudent({...editingStudent, isActive: e.target.checked})}
                  className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">Status Aktif</label>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setEditingStudent(null)}
                className="px-5 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
