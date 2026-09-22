import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function getDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function saveDb(data: any) {
  const tempPath = dbPath + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
  fs.renameSync(tempPath, dbPath);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, username, password, kelas, jurusan, role } = body;

    const db = getDb();
    
    // Check if user exists
    if (db.users.find((u: any) => u.username === username)) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 });
    }

    const newUser = {
      id: Date.now().toString(),
      fullName,
      username,
      password,
      kelas,
      jurusan,
      role: role || (username.toLowerCase().includes('guru') ? 'guru' : 'siswa')
    };

    db.users.push(newUser);
    saveDb(db);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mendaftar' }, { status: 500 });
  }
}
