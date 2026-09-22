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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const db = getDb();
    const user = db.users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      if (user.isActive === false) return NextResponse.json({ error: "Akun Anda telah dinonaktifkan oleh Guru" }, { status: 403 });
      return NextResponse.json({ success: true, role: user.role, user });
    } else {
      return NextResponse.json({ error: 'Username atau kata sandi salah' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
