"use client";

import { useState, useEffect, useMemo } from 'react';
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
  guruPengampu?: string;
  guruPengampuName?: string;
  modulesTaken: number;
  scoreS1: number;
  scoreS2: number;
  moduleScores: Record<string, ModuleScore>;
  isActive: boolean;
}

export default function StudentTable({ 
  initialStudents, 
  teachers = [] 
}: { 
  initialStudents: Student[];
  teachers?: any[];
}) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  const [onlineStatus, setOnlineStatus] = useState<Record<string, { time: number, isOnline: boolean }>>({});
  const [serverTime, setServerTime] = useState<number>(Date.now());

  useEffect(() => {
    // Baca user yang login
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }

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

  // Temukan konfigurasi guru yang sedang login
  const currentTeacherObj = useMemo(() => {
    if (!currentUser) return null;
    return teachers.find(t => t.username === currentUser.username) || null;
  }, [currentUser, teachers]);

  const assignedClasses = useMemo(() => {
    if (currentTeacherObj?.classes && Array.isArray(currentTeacherObj.classes)) {
      return currentTeacherObj.classes;
    }
    if (currentUser?.classes && Array.isArray(currentUser.classes)) {
      return currentUser.classes;
    }
    return [];
  }, [currentTeacherObj, currentUser]);

  const isAllClasses = useMemo(() => {
    return assignedClasses.length === 0 || assignedClasses.includes('SEMUA');
  }, [assignedClasses]);

  // Saring siswa yang berhak dilihat oleh guru ini
  const accessibleStudents = useMemo(() => {
    if (isAllClasses) {
      return students;
    }
    return students.filter(s => {
      const matchClass = s.kelas && assignedClasses.includes(s.kelas.trim());
      const matchTeacher = s.guruPengampu && currentUser?.username && s.guruPengampu === currentUser.username;
      return matchClass || matchTeacher;
    });
  }, [students, isAllClasses, assignedClasses, currentUser]);

  // Statistik Cepat Dihitung Khusus Guru Ini
  const stats = useMemo(() => {
    let totalScore = 0;
    let countWithScore = 0;
    accessibleStudents.forEach((s) => {
      if (s.scoreS1 > 0 || s.scoreS2 > 0) {
        totalScore += (s.scoreS1 + s.scoreS2) / ((s.scoreS1 > 0 ? 1 : 0) + (s.scoreS2 > 0 ? 1 : 0));
        countWithScore++;
      }
    });
    const avgClass = countWithScore > 0 ? Math.round(totalScore / countWithScore) : 0;
    const activeCount = accessibleStudents.filter(s => s.modulesTaken > 0).length;

    return {
      total: accessibleStudents.length,
      active: activeCount,
      average: avgClass
    };
  }, [accessibleStudents]);

  const [selectedClass, setSelectedClass] = useState<string>('Semua Kelas');

  // Daftar opsi kelas dropdown
  const uniqueClasses = useMemo(() => {
    if (isAllClasses) {
      const allFound = Array.from(new Set(students.map(s => s.kelas).filter(Boolean))).sort();
      return ['Semua Kelas', ...allFound];
    }
    // Jika guru punya kelas spesifik, gunakan kelas assigned ditambah kelas siswa yang diajar
    const setOfClasses = new Set<string>();
    assignedClasses.forEach((c: any) => setOfClasses.add(String(c)));
    accessibleStudents.forEach(s => { if (s.kelas) setOfClasses.add(s.kelas); });
    return ['Semua Kelas yang Diampu', ...Array.from(setOfClasses).sort()];
  }, [isAllClasses, students, assignedClasses, accessibleStudents]);

  // Reset selectedClass jika opsi tidak ada
  useEffect(() => {
    if (!uniqueClasses.includes(selectedClass)) {
      setSelectedClass(uniqueClasses[0] || 'Semua Kelas');
    }
  }, [uniqueClasses, selectedClass]);

  // Siswa setelah filter dropdown kelas
  const filteredStudents = useMemo(() => {
    if (selectedClass === 'Semua Kelas' || selectedClass === 'Semua Kelas yang Diampu') {
      return accessibleStudents;
    }
    return accessibleStudents.filter(s => s.kelas === selectedClass);
  }, [accessibleStudents, selectedClass]);

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

  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (student: any) => {
    setEditingStudent({ 
      ...student,
      newUsername: student.username,
      guruPengampu: student.guruPengampu || (currentUser?.username || ''),
      password: ''
    });
    setShowPassword(false);
  };

  const handleSave = async () => {
    if (!editingStudent) return;
    if (!editingStudent.name || !editingStudent.name.trim()) {
      alert('Nama lengkap tidak boleh kosong');
      return;
    }
    if (!editingStudent.newUsername || !editingStudent.newUsername.trim()) {
      alert('Username / ID Login tidak boleh kosong');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/users/${editingStudent.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: editingStudent.name.trim(),
          newUsername: editingStudent.newUsername.trim(),
          kelas: editingStudent.kelas ? editingStudent.kelas.trim() : '',
          guruPengampu: editingStudent.guruPengampu,
          isActive: editingStudent.isActive,
          password: editingStudent.password && editingStudent.password.trim() !== '' ? editingStudent.password.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const updatedTarget = editingStudent.newUsername.trim();
        const teacherObj = teachers.find(t => t.username === editingStudent.guruPengampu);

        setStudents(students.map(s => s.username === editingStudent.username ? {
          ...s,
          username: updatedTarget,
          name: editingStudent.name.trim(),
          kelas: editingStudent.kelas ? editingStudent.kelas.trim() : '',
          guruPengampu: editingStudent.guruPengampu,
          guruPengampuName: teacherObj ? teacherObj.fullName : s.guruPengampuName,
          isActive: editingStudent.isActive
        } : s));
        setEditingStudent(null);
        alert(`Data siswa "${editingStudent.name}" berhasil disimpan!`);
        router.refresh();
      } else {
        alert(data.error || 'Gagal mengedit data siswa');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan jaringan saat mengedit siswa');
    } finally {
      setIsSaving(false);
    }
  };

  const getScoreBadge = (score: number | null) => {
    if (score === null) return 'bg-slate-100 text-slate-400';
    if (score >= 75) return 'bg-emerald-50 text-emerald-700 font-bold';
    if (score > 0) return 'bg-amber-50 text-amber-700 font-bold';
    return 'bg-rose-50 text-rose-500 font-bold';
  };

  const progressPercent = (taken: number) => Math.round((taken / 24) * 100);

  return (
    <div className="space-y-8">
      {/* 4 Kartu Statistik Cepat - Khusus Guru yang Login */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 -mt-20">
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Siswa di Kelas Anda</p>
            <p className="text-3xl font-black text-slate-800">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modul Tersedia</p>
            <p className="text-3xl font-black text-slate-800">24</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Siswa Aktif Belajar</p>
            <p className="text-3xl font-black text-slate-800">{stats.active}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Kelas Anda</p>
            <p className="text-3xl font-black text-slate-800">{stats.average}</p>
          </div>
        </div>
      </div>

      {/* Kontainer Tabel Siswa */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-white/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-slate-800">Pemantauan Progres & Nilai Siswa</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                {accessibleStudents.length} Siswa Terdaftar
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              {isAllClasses ? (
                "Menampilkan seluruh data siswa dari semua rombel (Mode Administrator)."
              ) : (
                <span>
                  Disaring otomatis untuk kelas yang diampu: <strong className="text-indigo-600">{assignedClasses.join(', ')}</strong>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Filter & Export Bar */}
        <div className="px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="classFilter" className="text-sm font-semibold text-slate-600">Pilih Kelas:</label>
            <select 
              id="classFilter"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm min-w-[180px]"
            >
              {uniqueClasses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => exportClassPDF(filteredStudents, selectedClass)} 
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            {selectedClass.includes('Semua') ? 'Export PDF Nilai Kelas' : `Export PDF Kelas ${selectedClass}`}
          </button>
        </div>

        {/* Student Cards List */}
        <div className="divide-y divide-slate-100">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="text-4xl block mb-2">📭</span>
              <p className="font-semibold text-slate-500">Belum ada siswa terdaftar di kelas ini</p>
              <p className="text-xs text-slate-400 mt-1">Siswa dapat memilih kelas ini saat mendaftar akun di halaman depan.</p>
            </div>
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
                      <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        {student.name} 
                        {!student.isActive && <span className="text-xs text-rose-500 font-normal">(Nonaktif)</span>}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">@{student.username}</div>
                      <div className="mt-1">{getOnlineDisplay(student.username)}</div>
                    </div>
                  </div>

                  {/* Kelas & Guru Pengampu */}
                  <div className="flex flex-col gap-1 min-w-[140px]">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold w-max border border-slate-200">
                      🏫 {student.kelas || 'Belum Ada'}
                    </span>
                    {student.guruPengampuName && (
                      <span className="text-[11px] text-indigo-600 font-semibold truncate max-w-[150px]" title={student.guruPengampuName}>
                        👨‍🏫 {student.guruPengampuName}
                      </span>
                    )}
                  </div>

                  {/* Progress Modul */}
                  <div className="flex-1 min-w-[180px] w-full md:w-auto">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-slate-500">Modul Tuntas</span>
                      <span className="font-black text-indigo-600">{student.modulesTaken} / 24 ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Nilai Raport */}
                  <div className="flex items-center gap-4 min-w-[220px]">
                    <div className="text-center px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">SMT 1</div>
                      <div className="text-sm font-bold text-slate-700">{student.scoreS1 > 0 ? student.scoreS1 : '-'}</div>
                    </div>
                    <div className="text-center px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">SMT 2</div>
                      <div className="text-sm font-bold text-slate-700">{student.scoreS2 > 0 ? student.scoreS2 : '-'}</div>
                    </div>
                    <div className="text-center px-3 py-1 bg-indigo-50/70 rounded-lg border border-indigo-100">
                      <div className="text-[10px] text-indigo-500 font-bold uppercase">AKHIR</div>
                      <div className="text-base font-black text-indigo-600">
                        {student.scoreS1 > 0 && student.scoreS2 > 0 
                          ? Number(((student.scoreS1 + student.scoreS2) / 2).toFixed(1))
                          : (student.scoreS1 > 0 ? student.scoreS1 : (student.scoreS2 > 0 ? student.scoreS2 : '-'))
                        }
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => handleEdit(student)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => exportStudentPDF(student)}
                      className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
                    >
                      📄 PDF
                    </button>
                    <button
                      onClick={() => setExpandedStudent(isExpanded ? null : student.username)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {isExpanded ? '▲ Tutup' : '▼ Detail Nilai'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details: Nilai Per Modul */}
                {isExpanded && (
                  <div className="bg-slate-50/70 px-8 py-6 border-t border-slate-100 space-y-6">
                    {/* Semester 1 */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Semester 1: Modul P1 - P12
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {Array.from({ length: 12 }, (_, i) => {
                          const key = `s1-p${i + 1}`;
                          const sc = student.moduleScores[key] || { latihan: null, lab: null };
                          return (
                            <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
                              <div className="text-[11px] font-bold text-slate-700">P{i + 1}</div>
                              <div className="flex justify-center gap-1 mt-1 text-[11px]">
                                <span className={`px-1.5 py-0.5 rounded ${getScoreBadge(sc.latihan)}`} title="Nilai Kuis">
                                  K:{sc.latihan !== null ? sc.latihan : '-'}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded ${getScoreBadge(sc.lab)}`} title="Nilai Lab">
                                  L:{sc.lab !== null ? sc.lab : '-'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Semester 2 */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Semester 2: Modul P1 - P12
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {Array.from({ length: 12 }, (_, i) => {
                          const key = `s2-p${i + 1}`;
                          const sc = student.moduleScores[key] || { latihan: null, lab: null };
                          return (
                            <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
                              <div className="text-[11px] font-bold text-slate-700">P{i + 1}</div>
                              <div className="flex justify-center gap-1 mt-1 text-[11px]">
                                <span className={`px-1.5 py-0.5 rounded ${getScoreBadge(sc.latihan)}`} title="Nilai Kuis">
                                  K:{sc.latihan !== null ? sc.latihan : '-'}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded ${getScoreBadge(sc.lab)}`} title="Nilai Lab">
                                  L:{sc.lab !== null ? sc.lab : '-'}
                                </span>
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
      </div>

      {/* Modal Edit Siswa */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Edit Data Siswa</h3>
                <p className="text-xs text-slate-500 mt-0.5">Ubah nama, ID login, kelas, atau guru pengampu siswa</p>
              </div>
              <button 
                onClick={() => setEditingStudent(null)} 
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  value={editingStudent.name} 
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold text-slate-800"
                />
              </div>

              {/* Username / ID Login */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Username / ID Login
                </label>
                <input 
                  type="text" 
                  value={editingStudent.newUsername} 
                  onChange={(e) => setEditingStudent({...editingStudent, newUsername: e.target.value.toLowerCase().trim()})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono text-slate-800"
                />
              </div>

              {/* Reset Password */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/70">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Reset Kata Sandi (Opsional)
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={editingStudent.password || ''} 
                    onChange={(e) => setEditingStudent({...editingStudent, password: e.target.value})}
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                    className="w-full px-4 py-2.5 pr-10 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm font-mono text-slate-800"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-sm"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {/* Fast Presets */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">Preset:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingStudent({...editingStudent, password: 'siswa123'});
                      setShowPassword(true);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-800 text-[11px] font-bold rounded-lg border border-amber-300 transition-colors"
                  >
                    siswa123
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingStudent({...editingStudent, password: '123456'});
                      setShowPassword(true);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-800 text-[11px] font-bold rounded-lg border border-amber-300 transition-colors"
                  >
                    123456
                  </button>
                </div>
              </div>

              {/* Kelas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Rombel / Kelas
                </label>
                <input 
                  type="text" 
                  value={editingStudent.kelas} 
                  onChange={(e) => setEditingStudent({...editingStudent, kelas: e.target.value})}
                  placeholder="Contoh: X TE 4"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold text-slate-800"
                />
              </div>

              {/* Guru Pengampu */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Guru Pengampu
                </label>
                <select 
                  value={editingStudent.guruPengampu || ''} 
                  onChange={(e) => setEditingStudent({...editingStudent, guruPengampu: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold text-slate-800"
                >
                  <option value="">Pilih Guru Pengampu</option>
                  {teachers.map(t => (
                    <option key={t.username} value={t.username}>
                      {t.fullName} (@{t.username})
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Akun */}
              <div>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={editingStudent.isActive} 
                    onChange={(e) => setEditingStudent({...editingStudent, isActive: e.target.checked})}
                    className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Akun Siswa Aktif</span>
                    <span className="text-xs text-slate-400 block">Jika dinonaktifkan, siswa tidak dapat masuk ke sistem.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button 
                type="button"
                disabled={isSaving}
                onClick={() => setEditingStudent(null)}
                className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors text-sm"
              >
                Batal
              </button>
              <button 
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/30 text-sm flex items-center gap-2"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
