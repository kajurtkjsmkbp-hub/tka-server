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
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, dbPath);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, username, password, kelas, jurusan, role, guruPengampu, classes } = body;

    const db = getDb();
    
    // Check if user exists
    if (db.users.find((u: any) => u.username.toLowerCase() === username.toLowerCase())) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 });
    }

    const assignedRole = role || (username.toLowerCase().includes('guru') ? 'guru' : 'siswa');

    let teacherName = '';
    if (assignedRole === 'siswa' && guruPengampu) {
      const teacherObj = db.users.find((u: any) => u.role === 'guru' && u.username === guruPengampu);
      if (teacherObj) {
        teacherName = teacherObj.fullName;
      }
    }

    const newUser: any = {
      id: Date.now().toString(),
      fullName,
      username,
      password,
      role: assignedRole,
      isActive: true
    };

    if (assignedRole === 'siswa') {
      newUser.kelas = kelas || '';
      newUser.jurusan = jurusan || '';
      newUser.guruPengampu = guruPengampu || '';
      if (teacherName) {
        newUser.guruPengampuName = teacherName;
      }
    } else if (assignedRole === 'guru') {
      newUser.classes = Array.isArray(classes) ? classes : (classes ? [classes] : []);
    }

    db.users.push(newUser);
    saveDb(db);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mendaftar' }, { status: 500 });
  }
}
