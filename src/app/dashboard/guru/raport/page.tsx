import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { labData } from '@/data/labData';

function getStudentsData() {
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  let users: any[] = [];
  if (fs.existsSync(dbPath)) {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    users = JSON.parse(rawData).users || [];
  }

  const scoresPath = path.join(process.cwd(), 'data', 'scores.json');
  let scores: any[] = [];
  if (fs.existsSync(scoresPath)) {
    const rawScores = fs.readFileSync(scoresPath, 'utf8');
    scores = JSON.parse(rawScores);
  }

  const students = users.filter((u: any) => u.role === 'siswa');

  return students.map((student: any) => {
    const studentScores = scores.filter((s: any) => s.username === student.username);
    let modulesCompleted = 0;
    
    for (let sem = 1; sem <= 2; sem++) {
      for (let p = 1; p <= 12; p++) {
        const key = `s${sem}-p${p}`;
        const latihanEntry = studentScores.find((s: any) => s.materiId === key);
        const labChallenges = studentScores.filter((s: any) => s.materiId.startsWith(key + '-lab-chal'));
        
        const hasLatihan = latihanEntry ? true : false;
        const labDef = (labData as any)[key];
        const totalLabNeeded = labDef && labDef.challenges ? labDef.challenges.length : 0;
        const isLabComplete = totalLabNeeded === 0 || labChallenges.length >= totalLabNeeded;
        
        if (hasLatihan && isLabComplete) modulesCompleted++;
      }
    }

    const s1Latihans = studentScores.filter((s: any) => s.materiId.startsWith('s1-p') && !s.materiId.includes('-lab-chal'));
    const s2Latihans = studentScores.filter((s: any) => s.materiId.startsWith('s2-p') && !s.materiId.includes('-lab-chal'));
    
    const avgS1 = s1Latihans.length > 0 ? Math.round(s1Latihans.reduce((a, b) => a + b.score, 0) / s1Latihans.length) : 0;
    const avgS2 = s2Latihans.length > 0 ? Math.round(s2Latihans.reduce((a, b) => a + b.score, 0) / s2Latihans.length) : 0;

    let overallAvg = 0;
    if (avgS1 > 0 && avgS2 > 0) overallAvg = Math.round((avgS1 + avgS2) / 2);
    else if (avgS1 > 0) overallAvg = avgS1;
    else if (avgS2 > 0) overallAvg = avgS2;

    return {
      id: student.id || student.username,
      username: student.username,
      name: student.fullName,
      kelas: student.kelas,
      modulesTaken: modulesCompleted,
      average: overallAvg,
      isActive: student.isActive !== false
    };
  });
}

export const dynamic = 'force-dynamic';

export default async function GuruRaport() {
  const students = getStudentsData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Rekap Nilai Siswa</h1>
            <p className="text-slate-500 mt-1">Pantau perkembangan dan nilai evaluasi seluruh siswa KKA yang terdaftar.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/guru" className="px-6 py-2.5 text-slate-600 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-all">
              Kembali ke Dasbor
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5 font-bold">Nama Siswa</th>
                <th className="px-8 py-5 font-bold">Username</th>
                <th className="px-8 py-5 font-bold">Kelas</th>
                <th className="px-8 py-5 font-bold text-center">Modul Diselesaikan</th>
                <th className="px-8 py-5 font-bold text-center">Rata-rata Keseluruhan</th>
                <th className="px-8 py-5 font-bold text-center">Status Keaktifan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Belum ada siswa yang terdaftar di database.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-800">{student.name}</td>
                    <td className="px-8 py-5 text-slate-500 font-mono text-sm">@{student.username}</td>
                    <td className="px-8 py-5 font-semibold text-slate-600">{student.kelas}</td>
                    <td className="px-8 py-5 text-center">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-full text-sm">
                        {student.modulesTaken} / 24 Modul
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-lg text-slate-700">{student.average > 0 ? student.average : '-'}</td>
                    <td className="px-8 py-5 text-center">
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
