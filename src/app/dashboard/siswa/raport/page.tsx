"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { labData } from '@/data/labData';

export default function SiswaRaport() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userScores, setUserScores] = useState<any[]>([]);
  const [teacherName, setTeacherName] = useState<string>("Adiningtyas Yuli Purwanto, S.Kom");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserProfile(user);
      
      // Ambil data skor
      fetch('/api/scores?_t=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const myScores = data.filter((s: any) => s.username === user.username);
          setUserScores(myScores);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });

      // Deteksi Guru Pengampu
      fetch('/api/teachers?_t=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const list = data.teachers || [];
          if (user.guruPengampu) {
            const match = list.find((t: any) => t.username === user.guruPengampu);
            if (match) {
              setTeacherName(match.fullName);
              return;
            }
          }
          if (user.kelas) {
            const matchByClass = list.find((t: any) => t.classes && t.classes.includes(user.kelas.trim()));
            if (matchByClass) {
              setTeacherName(matchByClass.fullName);
              return;
            }
          }
          if (user.guruPengampuName) {
            setTeacherName(user.guruPengampuName);
          }
        })
        .catch(() => {});
    } else {
      setIsLoading(false);
    }
  }, []);

  const semester1Titles = [
    "Pengantar Berpikir Komputasional", "Algoritma dan Pseudocode", "Pengenalan Bahasa Pemrograman (Python)",
    "Variabel dan Tipe Data", "Operator Logika dan Aritmatika", "Percabangan (If/Else)",
    "Perulangan (For/While)", "Fungsi dan Prosedur", "Struktur Data Dasar (List, Array)",
    "Penanganan Error (Debugging)", "Studi Kasus Algoritma Terapan", "Projek Nyata: Membuat Kalkulator Pintar"
  ];

  const semester2Titles = [
    "Sejarah dan Konsep Dasar AI", "Machine Learning vs Tradisional", "Supervised Learning (Klasifikasi)", 
    "Supervised Learning (Regresi)", "Unsupervised Learning (Clustering)", "Pengantar Jaringan Saraf Tiruan (ANN)",
    "Deep Learning & Computer Vision", "Natural Language Processing (NLP)", "Reinforcement Learning & AI Agents", 
    "Generative AI & Etika AI", "AIoT (AI & Internet of Things)", "Deployment AI & API"
  ];

  const KKM = 75; // Kriteria Ketuntasan Minimal

  const getModuleProgress = (id: string, title: string) => {
    // 1. Status Latihan / Kuis
    const latihanScoreData = userScores.find(s => s.materiId === id);
    const isLatihanDone = latihanScoreData !== undefined;
    const isLatihanTuntas = isLatihanDone && (latihanScoreData.score || 0) >= KKM;
    const needRemidi = isLatihanDone && !isLatihanTuntas;

    // 2. Status Lab
    const labChallenges = userScores.filter(s => s.materiId.startsWith(id + "-lab-chal"));
    const doneChalIds = new Set(labChallenges.map(c => c.materiId));
    
    const labDef = (labData as any)[id];
    const totalChallenges = labDef && labDef.challenges ? labDef.challenges.length : 0;
    const isLabDone = totalChallenges === 0 ? true : (doneChalIds.size >= totalChallenges);

    return {
      id,
      title,
      labDoneCount: doneChalIds.size,
      totalChallenges,
      isLatihanDone,
      isLatihanTuntas,
      needRemidi,
      isLabDone,
      isTuntas: isLatihanTuntas && isLabDone
    };
  };

  const s1Modules = semester1Titles.map((title, i) => getModuleProgress(`s1-p${i+1}`, title));
  const s2Modules = semester2Titles.map((title, i) => getModuleProgress(`s2-p${i+1}`, title));

  const allModules = [...s1Modules, ...s2Modules];
  const completed = allModules.filter(m => m.isTuntas).length;
  const kuisTuntasCount = allModules.filter(m => m.isLatihanTuntas).length;
  const labTuntasCount = allModules.filter(m => m.isLabDone).length;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-sans text-slate-600">Memuat status progres belajar...</div>;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-slate-50">
        <p className="mb-4 text-slate-700 font-bold">Silakan login terlebih dahulu.</p>
        <Link href="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-md">
          Ke Halaman Login
        </Link>
      </div>
    );
  }

  const renderRow = (modul: any, index: number, semester: number) => {
    return (
      <tr key={modul.id} className="border-b border-slate-200/80 last:border-0 hover:bg-slate-50/80 transition">
        {/* Nomor */}
        <td className="p-4 text-slate-500 font-bold w-12 text-center text-sm">{index + 1}</td>
        
        {/* Judul Modul */}
        <td className="p-4">
          <div className="font-extrabold text-slate-800 text-base">{modul.title}</div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Pertemuan {index + 1} &bull; Modul {modul.id.toUpperCase()}</div>
        </td>

        {/* Status Soal Kuis */}
        <td className="p-4">
          {modul.isLatihanTuntas ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
              <span>✅</span> Tuntas
            </span>
          ) : modul.needRemidi ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
              <span>⚠️</span> Belum Tuntas (Remidi)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
              <span>⏳</span> Belum Dikerjakan
            </span>
          )}
        </td>

        {/* Status Virtual Lab */}
        <td className="p-4">
          {modul.totalChallenges === 0 ? (
            <span className="text-xs text-slate-400 font-medium italic">-</span>
          ) : modul.isLabDone ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
              <span>✅</span> Tuntas ({modul.totalChallenges}/{modul.totalChallenges})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
              <span>⏳</span> Belum Tuntas ({modul.labDoneCount}/{modul.totalChallenges})
            </span>
          )}
        </td>

        {/* Status Modul Keseluruhan */}
        <td className="p-4">
          {modul.isTuntas ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
              <span>🎉</span> TUNTAS
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-slate-200 text-slate-700 border border-slate-300">
              <span>⏳</span> BELUM TUNTAS
            </span>
          )}
        </td>

        {/* Aksi Cepat */}
        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <Link 
              href={`/dashboard/siswa/materi/${modul.id}`}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
              title="Baca Materi"
            >
              📖
            </Link>
            <Link 
              href={`/dashboard/siswa/latihan/${modul.id}`}
              className="px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-lg text-xs font-bold transition"
              title="Buka Kuis"
            >
              📝
            </Link>
            {modul.totalChallenges > 0 && (
              <Link 
                href={`/dashboard/siswa/lab/${modul.id}`}
                className="px-2.5 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg text-xs font-bold transition"
                title="Buka Virtual Lab"
              >
                💻
              </Link>
            )}
          </div>
        </td>
      </tr>
    );
  };

  const s1Completed = s1Modules.filter(m => m.isTuntas).length;
  const s2Completed = s2Modules.filter(m => m.isTuntas).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Identitas & Navigasi */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider mb-2">
              <span>📋</span> Status & Progres Pembelajaran
            </div>
            <h1 className="text-3xl font-black text-slate-800">Progres Ketuntasan Modul Siswa</h1>
            <p className="text-slate-500 mt-1">
              Data aktivitas belajar untuk <b className="text-slate-800">{userProfile.fullName}</b> ({userProfile.kelas}) &bull; <span className="font-mono text-slate-400">@{userProfile.username}</span>
            </p>
          </div>
          <Link href="/dashboard/siswa" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-sm flex items-center gap-2">
            <span>🏠</span> Beranda Siswa
          </Link>
        </header>

        {/* Banner Khusus Informasi Nilai Akademik & Guru Pengampu */}
        <div className="mb-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl border border-indigo-700/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
              👨‍🏫
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5">
                <span>⭐</span> Koordinasi Nilai Akademik
              </div>
              <h3 className="text-xl font-black text-white">Guru Pengampu: {teacherName}</h3>
              <p className="text-indigo-200 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
                Rincian angka nilai kuis, nilai lab, dan nilai raport semester dikelola secara terpusat oleh Guru Pengampu. 
                Untuk mengetahui nilai angka resmi atau konsultasi hasil belajar, silakan langsung menghubungi <strong>{teacherName}</strong>.
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center shrink-0">
            <div className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Status Bimbingan</div>
            <div className="text-sm font-black text-amber-300 mt-0.5">Terkoneksi Guru</div>
          </div>
        </div>

        {/* Statistik Ringkas Ketuntasan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Modul Tuntas</h3>
            <p className="text-4xl font-black text-emerald-600">{completed} <span className="text-lg text-slate-300 font-bold">/ 24</span></p>
            <p className="text-xs text-slate-500 mt-2">Syarat tuntas: Kuis lulus KKM (75) &amp; seluruh lab selesai.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Ketuntasan Kuis</h3>
            <p className="text-4xl font-black text-sky-600">{kuisTuntasCount} <span className="text-lg text-slate-300 font-bold">/ 24</span></p>
            <p className="text-xs text-slate-500 mt-2">Modul dengan soal latihan berstatus tuntas.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Ketuntasan Virtual Lab</h3>
            <p className="text-4xl font-black text-purple-600">{labTuntasCount} <span className="text-lg text-slate-300 font-bold">/ 24</span></p>
            <p className="text-xs text-slate-500 mt-2">Praktikum pemrograman diselesaikan penuh.</p>
          </div>
        </div>

        {/* Laporan Semester 1 */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center text-lg shadow-sm">1</span>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Semester 1</h2>
                <p className="text-xs text-slate-500 font-medium">Berpikir Komputasional &amp; Pemrograman Dasar (Python)</p>
              </div>
            </div>
            <div className="bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl text-sky-800 text-xs font-bold flex items-center gap-2">
              <span>📊 Progres Semester 1:</span>
              <strong className="text-sky-900 text-sm font-black">{s1Completed} / 12 Tuntas</strong>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold w-12 text-center">#</th>
                    <th className="p-4 font-bold">Modul Pembelajaran</th>
                    <th className="p-4 font-bold w-52">Status Soal Kuis</th>
                    <th className="p-4 font-bold w-52">Status Virtual Lab</th>
                    <th className="p-4 font-bold w-44">Status Modul</th>
                    <th className="p-4 font-bold w-32 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {s1Modules.map((modul, i) => renderRow(modul, i, 1))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Laporan Semester 2 */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500 text-white font-black flex items-center justify-center text-lg shadow-sm">2</span>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Semester 2</h2>
                <p className="text-xs text-slate-500 font-medium">Kecerdasan Buatan (AI) &amp; Machine Learning Terapan</p>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl text-purple-800 text-xs font-bold flex items-center gap-2">
              <span>📊 Progres Semester 2:</span>
              <strong className="text-purple-900 text-sm font-black">{s2Completed} / 12 Tuntas</strong>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold w-12 text-center">#</th>
                    <th className="p-4 font-bold">Modul Pembelajaran</th>
                    <th className="p-4 font-bold w-52">Status Soal Kuis</th>
                    <th className="p-4 font-bold w-52">Status Virtual Lab</th>
                    <th className="p-4 font-bold w-44">Status Modul</th>
                    <th className="p-4 font-bold w-32 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {s2Modules.map((modul, i) => renderRow(modul, i, 2))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
