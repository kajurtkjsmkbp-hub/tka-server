import Link from 'next/link';
import StudentTable from './StudentTable';
import fs from 'fs';
import path from 'path';
import { labData } from '@/data/labData';
import AnnouncementManager from './AnnouncementManager';
import TeacherManager from './TeacherManager';

function getStudentsData() {
  // Read Users DB
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  let users: any[] = [];
  if (fs.existsSync(dbPath)) {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    users = JSON.parse(rawData).users || [];
  }

  // Read Scores DB
  const scoresPath = path.join(process.cwd(), 'data', 'scores.json');
  let scores: any[] = [];
  if (fs.existsSync(scoresPath)) {
    const rawScores = fs.readFileSync(scoresPath, 'utf8');
    scores = JSON.parse(rawScores);
  }

  // Filter only students
  const students = users.filter((u: any) => u.role === 'siswa');

  return students.map((student: any) => {
    const studentScores = scores.filter((s: any) => s.username === student.username);

    // Build per-module scores for S1 (s1-p1 to s1-p12) and S2 (s2-p1 to s2-p12)
    const moduleScores: Record<string, { latihan: number | null, lab: number | null }> = {};
    let modulesCompleted = 0;
    
    for (let sem = 1; sem <= 2; sem++) {
      for (let p = 1; p <= 12; p++) {
        const key = `s${sem}-p${p}`;
        
        // Latihan score
        const latihanEntry = studentScores.find((s: any) => s.materiId === key);
        const latihanScore = latihanEntry ? latihanEntry.score : null;
        
        // Lab score (sum of individual challenges)
        const labChallenges = studentScores.filter((s: any) => s.materiId.startsWith(key + '-lab-chal'));
        const labScore = labChallenges.length > 0 ? labChallenges.reduce((sum: number, c: any) => sum + c.score, 0) : null;
        
        moduleScores[key] = { latihan: latihanScore, lab: labScore };
        
        // Check strict completion: latihan done AND all lab challenges done
        const hasLatihan = latihanScore !== null;
        const labDef = (labData as any)[key];
        const totalLabNeeded = labDef && labDef.challenges ? labDef.challenges.length : 0;
        const labChalsDone = labChallenges.length;
        const isLabComplete = totalLabNeeded === 0 || labChalsDone >= totalLabNeeded;
        
        if (hasLatihan && isLabComplete) {
          modulesCompleted++;
        }
      }
    }

    const calculateSemesterGrade = (semester: number) => {
      let totalLatihan = 0;
      let sumMaxLatihan = 12 * 100;
      let totalLab = 0;
      let sumMaxLab = 0;

      for (let p = 1; p <= 12; p++) {
        const key = `s${semester}-p${p}`;
        totalLatihan += moduleScores[key].latihan || 0;
        totalLab += moduleScores[key].lab || 0;
        const labDef = (labData as any)[key];
        sumMaxLab += labDef && labDef.challenges ? labDef.challenges.reduce((sum: number, c: any) => sum + (c.poin || 0), 0) : 0;
      }

      const avgLatihan = sumMaxLatihan > 0 ? (totalLatihan / sumMaxLatihan) * 100 : 0;
      const avgLab = sumMaxLab > 0 ? (totalLab / sumMaxLab) * 100 : 0;
      return Number(((avgLatihan + avgLab) / 2).toFixed(1));
    };

    const avgS1 = calculateSemesterGrade(1);
    const avgS2 = calculateSemesterGrade(2);

    return {
      id: student.id || student.username,
      username: student.username,
      name: student.fullName,
      kelas: student.kelas,
      modulesTaken: modulesCompleted,
      scoreS1: avgS1,
      scoreS2: avgS2,
      moduleScores,
      isActive: student.isActive !== false
    };
  });
}

function getTeachersData() {
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  if (fs.existsSync(dbPath)) {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const users = JSON.parse(rawData).users || [];
    return users.filter((u: any) => u.role === 'guru').map((t: any) => ({
      id: t.id || t.username,
      username: t.username,
      fullName: t.fullName,
      isActive: t.isActive !== false
    }));
  }
  return [];
}

export const dynamic = 'force-dynamic';

export default async function GuruDashboard() {
  const students = getStudentsData();
  const teachers = getTeachersData();

  let totalScore = 0;
  let countWithScore = 0;
  students.forEach((s: any) => {
    if (s.scoreS1 > 0 || s.scoreS2 > 0) {
      totalScore += (s.scoreS1 + s.scoreS2) / ((s.scoreS1 > 0 ? 1 : 0) + (s.scoreS2 > 0 ? 1 : 0));
      countWithScore++;
    }
  });
  const avgClass = countWithScore > 0 ? Math.round(totalScore / countWithScore) : 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Modern Gradient Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 pt-16 pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Portal Guru KKA</h1>
              <p className="text-indigo-200 mt-2 text-lg">Pantau dan kelola progres belajar siswa dengan mudah.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              <Link href="/dashboard/leaderboard" className="px-5 py-2.5 text-white bg-amber-500 hover:bg-amber-600 rounded-full font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all hover:scale-105 flex items-center gap-2">
                <span>🏆</span> Leaderboard
              </Link>
              <Link href="/dashboard/guru/raport" className="px-5 py-2.5 text-indigo-900 bg-white hover:bg-indigo-50 rounded-full font-bold shadow-lg transition-all hover:scale-105">
                Buku Nilai
              </Link>
              <Link href="/" className="px-5 py-2.5 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full font-bold border border-white/20 transition-all">
                Keluar
              </Link>
            </div>
          </header>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-20">
        {/* Statistik Cepat */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Total Siswa Terdaftar</p>
              <p className="text-3xl font-black text-slate-800">{students.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Modul Belajar</p>
              <p className="text-3xl font-black text-slate-800">24</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Siswa Aktif</p>
              <p className="text-3xl font-black text-slate-800">{students.filter((s: any) => s.modulesTaken > 0).length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Rata-rata Kelas</p>
              <p className="text-3xl font-black text-slate-800">{avgClass}</p>
            </div>
          </div>
        </div>
        
        {/* Broadcast Pengumuman */}
        <div className="mb-12">
          <AnnouncementManager />
        </div>

        {/* Manajemen Guru */}
        <TeacherManager initialTeachers={teachers} />

        {/* Monitoring Siswa */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-white/50">
            <h2 className="text-2xl font-bold text-slate-800">Pemantauan Progres & Nilai Siswa</h2>
            <p className="text-slate-500 text-sm mt-1">Progres modul, nilai latihan & lab per pertemuan, semester 1 & 2.</p>
          </div>
          
          <StudentTable initialStudents={students} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 pb-8 text-center">
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
