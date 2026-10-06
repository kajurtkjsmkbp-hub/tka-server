import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ teachers: [] });
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const users = JSON.parse(rawData).users || [];

    const teachers = users
      .filter((u: any) => u.role === 'guru' && u.isActive !== false)
      .map((t: any) => ({
        id: t.id || t.username,
        fullName: t.fullName,
        username: t.username,
        classes: Array.isArray(t.classes) ? t.classes : (t.classes ? [t.classes] : [])
      }));

    return NextResponse.json({ teachers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Gagal memuat data guru' }, { status: 500 });
  }
}
