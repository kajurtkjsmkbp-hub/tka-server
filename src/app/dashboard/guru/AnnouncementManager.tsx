"use client";

import { useState, useEffect } from 'react';

export default function AnnouncementManager() {
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetch('/api/announcement?_t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setMessage(data.message || '');
          setIsActive(data.active || false);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (activeState: boolean) => {
    setSaving(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, active: activeState })
      });
      const data = await res.json();
      if (data.success) {
        setIsActive(activeState);
        setStatusMsg('Pengumuman berhasil ' + (activeState ? 'disebarkan!' : 'dicabut.'));
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (err) {
      setStatusMsg('Terjadi kesalahan.');
    }
    setSaving(false);
  };

  if (loading) return <div className="h-40 bg-white rounded-3xl animate-pulse"></div>;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4 hover:-translate-y-1 transition-transform">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shadow-inner">
          📢
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Broadcast Pengumuman</h3>
          <p className="text-xs text-slate-500">Pesan ini akan muncul di dasbor semua siswa.</p>
        </div>
      </div>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ketik pengumuman di sini... (Contoh: Kerjakan Modul 5 dan 6 paling lambat hari Jumat!)"
        className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20 bg-slate-50 text-slate-700"
      ></textarea>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-2 gap-3">
        <span className="text-xs font-bold text-emerald-600">{statusMsg}</span>
        <div className="flex gap-2">
          {isActive ? (
            <button 
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors"
            >
              Cabut Pengumuman
            </button>
          ) : (
            <button 
              onClick={() => handleSave(true)}
              disabled={saving || !message.trim()}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 rounded-lg text-sm font-bold transition-all shadow-md disabled:opacity-50"
            >
              Sebarkan
            </button>
          )}
          {isActive && (
            <button 
              onClick={() => handleSave(true)}
              disabled={saving || !message.trim()}
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-bold transition-all shadow-md disabled:opacity-50"
            >
              Perbarui
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
