import Link from 'next/link';
import StudentTable from './StudentTable';
import fs from 'fs';
import path from 'path';
import { labData } from '@/data/labData';
import AnnouncementManager from './AnnouncementManager';
import TeacherManager from './TeacherManager';
import TeacherHeader from './TeacherHeader';

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
      guruPengampu: student.guruPengampu || '',
      guruPengampuName: student.guruPengampuName || '',
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
      classes: Array.isArray(t.classes) ? t.classes : (t.classes ? [t.classes] : []),
      isActive: t.isActive !== false
    }));
  }
  return [];
}

export const dynamic = 'force-dynamic';

export default async function GuruDashboard() {
  const students = getStudentsData();
  const teachers = getTeachersData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Modern Gradient Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 pt-16 pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <TeacherHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Monitoring Siswa & Statistik (Dinamis Sesuai Kelas Guru yang Login) */}
        <div className="mb-12">
          <StudentTable initialStudents={students} teachers={teachers} />
        </div>

        {/* Akses Cepat Bank Soal & Kunci Jawaban */}
        <div className="mb-12 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-indigo-950/20 border border-indigo-700/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
              📝
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                <span>⭐</span> Bank Soal Resmi
              </div>
              <h3 className="text-2xl font-black text-white">Bank Soal Kuis & Kunci Jawaban (1.200 Soal)</h3>
              <p className="text-indigo-200 text-sm mt-1 max-w-2xl font-normal">
                Pantau 50 soal pilihan ganda per pertemuan (Semester 1 P1-P12 & Semester 2 P1-P12) lengkap dengan kunci jawaban terverifikasi dan analisis pembahasan pedagogis.
              </p>
            </div>
          </div>
          <Link 
            href="/dashboard/guru/soal-kuis" 
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-2xl font-black shadow-lg shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-2 shrink-0 text-sm md:text-base"
          >
            <span>🔍</span> Buka Bank Soal & Kunci
          </Link>
        </div>

        {/* Broadcast Pengumuman */}
        <div className="mb-12">
          <AnnouncementManager />
        </div>

        {/* Manajemen Guru & Pembagian Kelas */}
        <TeacherManager initialTeachers={teachers} />
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
