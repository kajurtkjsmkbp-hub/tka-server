"use client";

import { useState, useEffect, useMemo } from 'react';

export default function RaportTable({ 
  initialStudents, 
  teachers = [] 
}: { 
  initialStudents: any[];
  teachers?: any[];
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

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

  const accessibleStudents = useMemo(() => {
    if (isAllClasses) {
      return initialStudents;
    }
    return initialStudents.filter(s => {
      const matchClass = s.kelas && assignedClasses.includes(s.kelas.trim());
      const matchTeacher = s.guruPengampu && currentUser?.username && s.guruPengampu === currentUser.username;
      return matchClass || matchTeacher;
    });
  }, [initialStudents, isAllClasses, assignedClasses, currentUser]);

  const [selectedClass, setSelectedClass] = useState<string>('Semua Kelas');

  const uniqueClasses = useMemo(() => {
    if (isAllClasses) {
      const allFound = Array.from(new Set(initialStudents.map(s => s.kelas).filter(Boolean))).sort();
      return ['Semua Kelas', ...allFound];
    }
    const setOfClasses = new Set<string>();
    assignedClasses.forEach((c: any) => setOfClasses.add(String(c)));
    accessibleStudents.forEach(s => { if (s.kelas) setOfClasses.add(s.kelas); });
    return ['Semua Kelas yang Diampu', ...Array.from(setOfClasses).sort()];
  }, [isAllClasses, initialStudents, assignedClasses, accessibleStudents]);

  useEffect(() => {
    if (!uniqueClasses.includes(selectedClass)) {
      setSelectedClass(uniqueClasses[0] || 'Semua Kelas');
    }
  }, [uniqueClasses, selectedClass]);

  const filteredStudents = useMemo(() => {
    if (selectedClass === 'Semua Kelas' || selectedClass === 'Semua Kelas yang Diampu') {
      return accessibleStudents;
    }
    return accessibleStudents.filter(s => s.kelas === selectedClass);
  }, [accessibleStudents, selectedClass]);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Kelas:</label>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {uniqueClasses.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {isAllClasses ? (
            <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg border border-purple-200">
              🌟 Mode Admin: Seluruh Kelas ({filteredStudents.length} Siswa)
            </span>
          ) : (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-200">
              🏫 Mengampu: {assignedClasses.join(', ')} ({filteredStudents.length} Siswa)
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-5 font-bold">Nama Siswa</th>
                <th className="px-6 py-5 font-bold">Username</th>
                <th className="px-6 py-5 font-bold">Kelas</th>
                <th className="px-6 py-5 font-bold text-center">Modul</th>
                <th className="px-6 py-5 font-bold text-center">Raport SMT 1</th>
                <th className="px-6 py-5 font-bold text-center">Raport SMT 2</th>
                <th className="px-6 py-5 font-bold text-center">Nilai Akhir</th>
                <th className="px-6 py-5 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    <span className="text-3xl block mb-2">📭</span>
                    Tidak ada siswa terdaftar di kelas ini.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-800">{student.name}</td>
                    <td className="px-6 py-5 text-slate-500 font-mono text-sm">@{student.username}</td>
                    <td className="px-6 py-5 font-semibold text-slate-600">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-bold text-slate-700">
                        {student.kelas}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-full text-sm">
                        {student.modulesTaken} / 24
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center font-bold text-slate-700">{student.avgS1 > 0 ? student.avgS1 : '-'}</td>
                    <td className="px-6 py-5 text-center font-bold text-slate-700">{student.avgS2 > 0 ? student.avgS2 : '-'}</td>
                    <td className="px-6 py-5 text-center font-black text-lg text-blue-700 bg-blue-50/50">{student.average > 0 ? student.average : '-'}</td>
                    <td className="px-6 py-5 text-center">
                      {student.isActive ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">AKTIF</span>
                      ) : (
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">NONAKTIF</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
