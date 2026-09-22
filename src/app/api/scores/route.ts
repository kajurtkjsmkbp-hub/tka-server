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

// POST: Simpan skor baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, fullName, kelas, materiId, score } = body;

    if (!username || !materiId || score === undefined) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const scores = readDB();
    
    // Cek apakah siswa sudah pernah mengerjakan materi ini
    const existingIndex = scores.findIndex((s: any) => s.username === username && s.materiId === materiId);
    
    const newScore = {
      username,
      fullName,
      kelas,
      materiId,
      score,
      timestamp: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      // Update skor (atau bisa juga pilih skor tertinggi, tapi di sini kita replace)
      scores[existingIndex] = newScore;
    } else {
      scores.push(newScore);
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
