import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


const dbPath = path.join(process.cwd(), 'data', 'scores.json');

// Helper untuk membaca DB
function readDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Helper untuk menulis DB (Atomic Write)
function writeDB(data: any) {
  const tempPath = dbPath + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
  fs.renameSync(tempPath, dbPath);
}

// POST: Simpan skor baru atau update skor remidi
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, fullName, kelas, materiId, score, isRemidi } = body;

    if (!username || !materiId || score === undefined) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const scores = readDB();
    
    // Cek apakah siswa sudah pernah mengerjakan materi ini
    const existingIndex = scores.findIndex((s: any) => s.username === username && s.materiId === materiId);
    
    if (existingIndex >= 0) {
      const existing = scores[existingIndex];
      
      // Hanya izinkan remidi jika skor sebelumnya < KKM (75)
      if (isRemidi) {
        if (existing.score >= 75) {
          return NextResponse.json({ error: 'Nilai sudah tuntas KKM, tidak bisa remidi.' }, { status: 400 });
        }
        
        // Update skor remidi - simpan skor tertinggi
        const bestScore = Math.max(existing.score, score);
        scores[existingIndex] = {
          ...existing,
          score: bestScore,
          lastScore: score,
          attemptCount: (existing.attemptCount || 1) + 1,
          isRemidi: true,
          timestamp: new Date().toISOString()
        };
      } else if (materiId.includes('-lab-chal')) {
        // Lab challenge dikerjakan ulang — simpan skor tertinggi (best score)
        const bestScore = Math.max(existing.score, score);
        scores[existingIndex] = {
          ...existing,
          score: bestScore,
          lastScore: score,
          attemptCount: (existing.attemptCount || 1) + 1,
          timestamp: new Date().toISOString()
        };
      } else {
        // Submit pertama kali tapi ternyata sudah ada (edge case)
        return NextResponse.json({ error: 'Kamu sudah pernah mengerjakan latihan ini.' }, { status: 400 });
      }
    } else {
      // Submit pertama kali
      scores.push({
        username,
        fullName,
        kelas,
        materiId,
        score,
        lastScore: score,
        attemptCount: 1,
        isRemidi: false,
        timestamp: new Date().toISOString()
      });
    }

    writeDB(scores);

    return NextResponse.json({ success: true, message: 'Nilai berhasil disimpan!' });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

// GET: Ambil semua skor (untuk dashboard Guru)
export async function GET() {
  try {
    const scores = readDB();
    // Sort dari terbaru
    scores.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return NextResponse.json(scores);
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
