import { NextResponse } from 'next/server';

declare global {
  var onlineUsers: Record<string, { time: number, isOnline: boolean }>;
}

if (!global.onlineUsers) {
  global.onlineUsers = {};
}

export async function POST(req: Request) {
  try {
    const { username, logout } = await req.json();
    if (username) {
      if (logout) {
        global.onlineUsers[username] = { time: Date.now(), isOnline: false };
      } else {
        global.onlineUsers[username] = { time: Date.now(), isOnline: true };
      }
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}

export async function GET() {
  const now = Date.now();
  const online: Record<string, { time: number, isOnline: boolean }> = {};
  
  for (const user in global.onlineUsers) {
    const data = global.onlineUsers[user];
    if (now - data.time >= 75 * 1000) {
      data.isOnline = false;
    }
    online[user] = data;
  }
  
  return NextResponse.json({ online, now });
}
