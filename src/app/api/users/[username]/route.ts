import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request: Request, { params }: { params: { username: string } }) {
  try {
    const { username } = await params;
    const body = await request.json();
    const { fullName, kelas, jurusan, isActive } = body;

    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    const userIndex = db.users.findIndex((u: any) => u.username === username);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update fields
    if (fullName !== undefined) db.users[userIndex].fullName = fullName;
    if (kelas !== undefined) db.users[userIndex].kelas = kelas;
    if (jurusan !== undefined) db.users[userIndex].jurusan = jurusan;
    if (isActive !== undefined) db.users[userIndex].isActive = isActive;

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

    return NextResponse.json({ message: "User updated successfully", user: db.users[userIndex] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { username: string } }) {
  try {
    const { username } = await params;
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    const userIndex = db.users.findIndex((u: any) => u.username === username);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove user
    db.users.splice(userIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
