"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TeacherHeader() {
  const [teacher, setTeacher] = useState<{ fullName?: string; username?: string; role?: string; classes?: string[] } | null>(null);
  const [assignedClasses, setAssignedClasses] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Ambil data user dari localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setTeacher(parsed);

        // Ping online status untuk guru
        if (parsed.username) {
          fetch('/api/ping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: parsed.username })
          }).catch(() => {});
        }

        // Ambil data guru terbaru dari API untuk mendapatkan kelas terkini
        fetch('/api/teachers')
          .then(res => res.json())
          .then(data => {
            const currentTeacher = data.teachers?.find((t: any) => t.username === parsed.username);
            if (currentTeacher && currentTeacher.classes) {
              setAssignedClasses(currentTeacher.classes);
            } else if (parsed.classes) {
              setAssignedClasses(parsed.classes);
            }
          })
          .catch(() => {
            if (parsed.classes) setAssignedClasses(parsed.classes);
          });

      } catch (err) {
        console.error("Gagal membaca profil guru:", err);
      }
    }

    // Format tanggal Indonesia
    try {
      const today = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date());
      setCurrentDate(today);
    } catch {
      setCurrentDate("Hari ini");
    }
  }, []);

  const handleLogout = async () => {
    if (teacher?.username) {
      try {
        await fetch('/api/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: teacher.username, logout: true })
        });
      } catch (e) {
        console.error("Gagal mengirim status logout:", e);
      }
    }
    localStorage.removeItem("currentUser");
    router.push('/');
  };

  const displayName = teacher?.fullName || "Bapak/Ibu Guru";
  const displayUsername = teacher?.username ? `@${teacher.username}` : "@guru";

  const isAllClasses = assignedClasses.length === 0 || assignedClasses.includes('SEMUA');
  const classLabel = isAllClasses 
    ? "Semua Kelas (Akses Penuh)" 
    : assignedClasses.join(', ');

  return (
    <div className="space-y-6">
      {/* Baris Navigasi & Identitas Guru */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-black tracking-wider uppercase bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full">
              👨‍🏫 Portal Pengajar
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Online
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full flex items-center gap-1">
              <span>🏫</span> Mengampu: {classLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Portal Guru KKA
          </h1>
          <p className="text-indigo-200 mt-1 text-base md:text-lg">
            Pantau dan kelola progres belajar siswa dengan mudah.
          </p>
        </div>

        {/* Panel Identitas Guru & Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          {/* Kartu Profil Guru */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-3 text-white shadow-lg shadow-black/10">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-400 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-lg font-black text-amber-300">
                👨‍🏫
              </div>
            </div>
            <div className="min-w-0 pr-1">
              <p className="text-xs text-indigo-200 font-semibold leading-tight">Guru Pengampu:</p>
              <p className="text-sm md:text-base font-extrabold text-white truncate max-w-[200px] md:max-w-[260px]" title={displayName}>
                {displayName}
              </p>
              <p className="text-[11px] font-mono text-amber-300/90 leading-tight">
                {displayUsername}
              </p>
            </div>
          </div>

          {/* Tombol Menu Cepat */}
          <div className="flex flex-wrap items-center gap-2">
            <Link 
              href="/dashboard/guru/soal-kuis" 
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>📝</span> Soal Kuis & Kunci
            </Link>
            <Link 
              href="/dashboard/leaderboard" 
              className="px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>🏆</span> Leaderboard
            </Link>
            <Link 
              href="/dashboard/guru/raport" 
              className="px-4 py-2 text-indigo-900 bg-white hover:bg-indigo-50 rounded-xl text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              Buku Nilai
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-rose-500/80 hover:bg-rose-600 rounded-xl text-sm font-bold border border-rose-400/30 transition-all hover:scale-105 flex items-center gap-1"
            >
              🚪 Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Notifikasi Selamat Datang (Welcome Notification Banner) */}
      {showNotification && (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-indigo-950/80 border-2 border-indigo-500/40 rounded-2xl p-4 md:p-5 text-white shadow-xl backdrop-blur-md animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-xl md:text-2xl shrink-0 shadow-inner">
                ✨
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-lg md:text-xl font-black text-white">
                    Selamat Datang, {displayName}! 👋
                  </h2>
                  <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold rounded-md">
                    Sesi Aktif
                  </span>
                  <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] font-bold rounded-md">
                    Kelas: {classLabel}
                  </span>
                </div>
                <p className="text-indigo-200 text-xs md:text-sm leading-relaxed max-w-3xl">
                  Anda telah masuk sebagai <strong className="text-white font-semibold">Guru Pengampu LMS KKA</strong> ({displayUsername}). 
                  {isAllClasses ? (
                    " Anda memiliki hak akses penuh untuk memantau seluruh kelas."
                  ) : (
                    <span> Seluruh data nilai latihan, virtual lab, serta monitoring siswa di dasbor ini telah otomatis disaring khusus untuk kelas yang Anda ajar (<strong className="text-amber-300">{classLabel}</strong>).</span>
                  )}
                </p>
                {currentDate && (
                  <p className="text-indigo-300/80 text-[11px] mt-2 font-medium flex items-center gap-1.5">
                    <span>🗓️</span> {currentDate}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowNotification(false)}
              className="text-indigo-300 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-lg transition-colors border border-white/10 text-xs shrink-0"
              title="Tutup Notifikasi"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
