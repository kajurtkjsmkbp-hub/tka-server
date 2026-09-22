import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'data', 'announcement.json');

export async function GET() {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: '', active: false, timestamp: Date.now() });
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read announcement' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, active } = body;
    
    const filePath = getFilePath();
    const data = {
      message: message || '',
      active: active === true,
      timestamp: Date.now()
    };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save announcement' }, { status: 500 });
  }
}
