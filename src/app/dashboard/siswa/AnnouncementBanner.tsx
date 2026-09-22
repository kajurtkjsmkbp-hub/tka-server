"use client";

import { useState, useEffect } from 'react';

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [visible, setVisible] = useState(true);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);

  useEffect(() => {
    const fetchAnnouncement = () => {
      fetch('/api/announcement?_t=' + Date.now())
        .then(res => res.json())
        .then(data => {
          if (data.active && data.message) {
            setAnnouncement(data);
            // Jika ada pengumuman baru (timestamp berbeda), munculkan kembali bannernya
            setLastTimestamp(prev => {
              if (prev !== 0 && prev !== data.timestamp) {
                setVisible(true);
              }
              return data.timestamp;
            });
          } else {
            setAnnouncement(null);
          }
        })
        .catch(() => {});
    };

    // Ambil saat pertama kali dimuat
    fetchAnnouncement();

    // Lakukan pengecekan setiap 15 detik (Real-time polling)
    const interval = setInterval(fetchAnnouncement, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!announcement || !visible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-3 shadow-lg flex items-center justify-between z-50 relative gap-3">
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <span className="text-xl animate-pulse mt-0.5 sm:mt-0 flex-shrink-0">📢</span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
          <span className="font-bold uppercase tracking-wider text-[10px] sm:text-xs bg-black/20 px-2 py-0.5 rounded-full w-max flex-shrink-0">Pengumuman</span>
          <span className="font-medium text-sm sm:text-base break-words line-clamp-3 sm:line-clamp-none">{announcement.message}</span>
        </div>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
}
