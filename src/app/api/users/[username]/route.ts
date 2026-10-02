import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function writeAtomic(filePath: string, data: any) {
  const tempPath = filePath + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, filePath);
}

export async function PUT(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    const body = await request.json();
    const { fullName, kelas, jurusan, isActive, newUsername, password } = body;

    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database tidak ditemukan" }, { status: 404 });
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    const userIndex = db.users.findIndex((u: any) => u.username === username);
    if (userIndex === -1) {
      return NextResponse.json({ error: "Siswa tidak ditemukan" }, { status: 404 });
    }

    // Check if newUsername is requested and different
    const targetUsername = newUsername ? newUsername.trim() : username;
    if (targetUsername !== username) {
      if (!targetUsername) {
        return NextResponse.json({ error: "Username tidak boleh kosong" }, { status: 400 });
      }
      
      const isTaken = db.users.some((u: any, idx: number) => idx !== userIndex && u.username.toLowerCase() === targetUsername.toLowerCase());
      if (isTaken) {
        return NextResponse.json({ error: `Username '${targetUsername}' sudah digunakan oleh pengguna lain` }, { status: 400 });
      }

      // Update username in db
      db.users[userIndex].username = targetUsername;

      // Update username in scores.json to preserve all student quiz & lab progress
      const scoresPath = path.join(process.cwd(), 'data', 'scores.json');
      if (fs.existsSync(scoresPath)) {
        try {
          const rawScores = fs.readFileSync(scoresPath, 'utf8');
          const scores = JSON.parse(rawScores);
          let scoresModified = false;

          scores.forEach((s: any) => {
            if (s.username === username) {
              s.username = targetUsername;
              if (fullName) s.fullName = fullName;
              scoresModified = true;
            }
          });

          if (scoresModified) {
            writeAtomic(scoresPath, scores);
          }
        } catch (err) {
          console.error("Gagal memperbarui username di scores.json:", err);
        }
      }

      // Update ping.json if exists
      const pingPath = path.join(process.cwd(), 'data', 'ping.json');
      if (fs.existsSync(pingPath)) {
        try {
          const rawPing = fs.readFileSync(pingPath, 'utf8');
          const pingDb = JSON.parse(rawPing);
          if (pingDb.online && pingDb.online[username]) {
            pingDb.online[targetUsername] = pingDb.online[username];
            delete pingDb.online[username];
            writeAtomic(pingPath, pingDb);
          }
        } catch (err) {
          console.error("Gagal memperbarui username di ping.json:", err);
        }
      }
    }

    // Update password if provided
    if (password !== undefined && password !== null && password.trim() !== '') {
      db.users[userIndex].password = password.trim();
    }

    // Update other fields
    if (fullName !== undefined) db.users[userIndex].fullName = fullName.trim();
    if (kelas !== undefined) db.users[userIndex].kelas = kelas.trim();
    if (jurusan !== undefined) db.users[userIndex].jurusan = jurusan;
    if (isActive !== undefined) db.users[userIndex].isActive = Boolean(isActive);

    // Save db.json atomically
    writeAtomic(dbPath, db);

    return NextResponse.json({ 
      message: "Data siswa berhasil diperbarui", 
      user: db.users[userIndex] 
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Gagal memperbarui data" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database tidak ditemukan" }, { status: 404 });
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    const userIndex = db.users.findIndex((u: any) => u.username === username);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Remove user
    db.users.splice(userIndex, 1);
    writeAtomic(dbPath, db);

    return NextResponse.json({ message: "User berhasil dihapus" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Gagal menghapus user" }, { status: 500 });
  }
}
