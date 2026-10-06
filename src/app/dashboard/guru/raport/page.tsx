import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { labData } from '@/data/labData';
import RaportTable from './RaportTable';

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

    const calculateSemesterGrade = (semester: number) => {
      let totalLatihan = 0;
      let sumMaxLatihan = 12 * 100;
      let totalLab = 0;
      let sumMaxLab = 0;

      for (let p = 1; p <= 12; p++) {
        const key = `s${semester}-p${p}`;
        const latihanEntry = studentScores.find((s: any) => s.materiId === key);
        const labChallenges = studentScores.filter((s: any) => s.materiId.startsWith(key + '-lab-chal'));
        
        totalLatihan += latihanEntry ? latihanEntry.score : 0;
        
        // Sum lab scores
        labChallenges.forEach(c => {
          totalLab += c.score;
        });
        const labDef = (labData as any)[key];
        sumMaxLab += labDef && labDef.challenges ? labDef.challenges.reduce((sum: number, c: any) => sum + (c.poin || 0), 0) : 0;
      }

      const avgLatihan = sumMaxLatihan > 0 ? (totalLatihan / sumMaxLatihan) * 100 : 0;
      const avgLab = sumMaxLab > 0 ? (totalLab / sumMaxLab) * 100 : 0;
      return Number(((avgLatihan + avgLab) / 2).toFixed(1));
    };

    const avgS1 = calculateSemesterGrade(1);
    const avgS2 = calculateSemesterGrade(2);

    let overallAvg: number = 0;
    if (avgS1 > 0 && avgS2 > 0) overallAvg = Number(((avgS1 + avgS2) / 2).toFixed(1));
    else if (avgS1 > 0) overallAvg = avgS1;
    else if (avgS2 > 0) overallAvg = avgS2;

    return {
      id: student.id || student.username,
      username: student.username,
      name: student.fullName,
      kelas: student.kelas,
      guruPengampu: student.guruPengampu || '',
      guruPengampuName: student.guruPengampuName || '',
      modulesTaken: modulesCompleted,
      avgS1,
      avgS2,
      average: overallAvg,
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

export default async function GuruRaport() {
  const students = getStudentsData();
  const teachers = getTeachersData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Buku Nilai / Raport Siswa</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Rekapitulasi nilai latihan kuis dan virtual lab per semester yang disaring khusus untuk kelas yang Anda ajar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/dashboard/guru/soal-kuis" className="px-4 py-2.5 text-white bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all flex items-center gap-1.5 shadow-sm text-sm">
              <span>📝</span> Soal & Kunci
            </Link>
            <Link href="/dashboard/guru" className="px-5 py-2.5 text-slate-700 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm">
              Kembali ke Dasbor
            </Link>
          </div>
        </header>

        <RaportTable initialStudents={students} teachers={teachers} />
      </div>
    </div>
  );
}
