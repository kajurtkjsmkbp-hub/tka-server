import fs from 'fs';
import path from 'path';
import { labData } from '@/data/labData';
import LeaderboardUI from './LeaderboardUI';

export const dynamic = 'force-dynamic';

function getLeaderboardData() {
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

  const students = users.filter((u: any) => u.role === 'siswa' && u.isActive !== false);

  const leaderboard = students.map((student: any) => {
    const studentScores = scores.filter((s: any) => s.username === student.username);
    let modulesCompleted = 0;
    let totalRawScore = 0;
    
    // Sum all raw scores
    studentScores.forEach((s: any) => {
      totalRawScore += (s.score || 0);
    });
    
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

    // XP Formula: Raw Score + (500 bonus per completed module)
    const xp = totalRawScore + (modulesCompleted * 500);

    return {
      id: student.id || student.username,
      username: student.username,
      name: student.fullName,
      kelas: student.kelas,
      modulesCompleted,
      xp
    };
  });

  // Sort by XP descending, then by Modules Completed descending
  return leaderboard.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    return b.modulesCompleted - a.modulesCompleted;
  });
}

export default async function LeaderboardPage() {
  const data = getLeaderboardData();
  return <LeaderboardUI data={data} />;
}
