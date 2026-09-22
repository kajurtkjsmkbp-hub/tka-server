"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { labData } from '@/data/labData';

export default function SiswaRaport() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userScores, setUserScores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserProfile(user);
      
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

  const getModuleProgress = (id: string, title: string) => {
    // 1. Latihan Score
    const latihanScoreData = userScores.find(s => s.materiId === id);
    const latihanScore = latihanScoreData ? latihanScoreData.score : null;

    // 2. Lab Score
    const labChallenges = userScores.filter(s => s.materiId.startsWith(id + "-lab-chal"));
    let labTotal = 0;
    const doneChalIds = new Set();
    labChallenges.forEach(c => {
      labTotal += c.score;
      doneChalIds.add(c.materiId);
    });
    
    // Total challenges & max score for this module from labData
    const labDef = (labData as any)[id];
    const totalChallenges = labDef && labDef.challenges ? labDef.challenges.length : 0;
    const maxLabScore = labDef && labDef.challenges ? labDef.challenges.reduce((sum: number, c: any) => sum + (c.poin || 0), 0) : 0;
    
    const isLatihanDone = latihanScore !== null;
    const isLabDone = totalChallenges === 0 ? true : (doneChalIds.size >= totalChallenges);

    return {
      id,
      title,
      latihanScore,
      labTotal: doneChalIds.size > 0 ? labTotal : null,
      maxLabScore,
      labDoneCount: doneChalIds.size,
      totalChallenges,
      isLatihanDone,
      isLabDone,
      isTuntas: isLatihanDone && isLabDone
    };
  };

  const s1Modules = semester1Titles.map((title, i) => getModuleProgress(`s1-p${i+1}`, title));
  const s2Modules = semester2Titles.map((title, i) => getModuleProgress(`s2-p${i+1}`, title));

  const allModules = [...s1Modules, ...s2Modules];
  const completed = allModules.filter(m => m.isTuntas).length;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-sans">Memuat data...</div>;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-slate-50">
        <p className="mb-4">Silakan login terlebih dahulu.</p>
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Ke Halaman Login</Link>
      </div>
    );
  }

  const renderRow = (modul: any, index: number, semester: number) => {
    let missingParts = [];
    if (!modul.isLatihanDone) missingParts.push("Latihan Soal");
    if (!modul.isLabDone) {
      missingParts.push(`Virtual Lab (${modul.labDoneCount}/${modul.totalChallenges})`);
    }
    
    const missingText = missingParts.length > 0 ? missingParts.join(" & ") + " belum dikerjakan" : "";

    return (
      <tr key={modul.id} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition">
        <td className="p-4 text-slate-700 font-medium w-12 text-center">{index + 1}</td>
        <td className="p-4 text-slate-700 font-medium">
          {modul.title}
          <div className="text-xs text-slate-400 mt-1">Pertemuan {index + 1}</div>
        </td>
        <td className="p-4">
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500">Latihan:</span>
              <span className="font-bold text-slate-800">{modul.latihanScore !== null ? modul.latihanScore : '-'}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500">Lab:</span>
              <span className="font-bold text-slate-800">{modul.labTotal !== null ? modul.labTotal : '-'} <span className="text-xs text-slate-400 font-normal">/ {modul.maxLabScore}</span></span>
            </div>
          </div>
        </td>
        <td className="p-4">
          {modul.isTuntas ? (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold block w-max">
              Tuntas
            </span>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold w-max">
                Belum Tuntas
              </span>
              <span className="text-xs text-rose-600 font-medium leading-tight max-w-[200px]">
                * {missingText}
              </span>
            </div>
          )}
        </td>
      </tr>
    );
  };

  // Helper untuk menghitung Nilai Akhir per Semester
  const calculateSemesterGrade = (modules: any[]) => {
    let totalLatihan = 0;
    let sumMaxLatihan = modules.length * 100; // Tiap soal max 100

    let totalLab = 0;
    let sumMaxLab = 0;

    modules.forEach(m => {
      totalLatihan += m.latihanScore || 0;
      totalLab += m.labTotal || 0;
      sumMaxLab += m.maxLabScore || 0;
    });

    // Rata-rata Latihan (skala 100)
    const avgLatihan = sumMaxLatihan > 0 ? (totalLatihan / sumMaxLatihan) * 100 : 0;
    
    // Rata-rata Lab (skala 100)
    const avgLab = sumMaxLab > 0 ? (totalLab / sumMaxLab) * 100 : 0;

    // Nilai Akhir (50% Latihan, 50% Lab)
    const finalGrade = (avgLatihan + avgLab) / 2;

    return {
      latihan: avgLatihan.toFixed(1),
      lab: avgLab.toFixed(1),
      final: finalGrade.toFixed(1)
    };
  };

  const gradeS1 = calculateSemesterGrade(s1Modules);
  const gradeS2 = calculateSemesterGrade(s2Modules);

  const renderSemesterSummary = (grade: any) => (
    <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
      <div>
        <h4 className="text-blue-800 font-bold text-sm uppercase tracking-wider">Rekap Nilai Semester</h4>
        <p className="text-blue-600 text-sm mt-1">Rata-rata Latihan: <b>{grade.latihan}</b> &nbsp;|&nbsp; Rata-rata Lab: <b>{grade.lab}</b></p>
      </div>
      <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-blue-100">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Nilai Akhir:</span>
        <span className="text-3xl font-black text-blue-700">{grade.final}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Buku Nilai (Raport Lengkap)</h1>
            <p className="text-slate-500 mt-1">Laporan akademik per pertemuan untuk <b className="text-blue-600">{userProfile.fullName}</b> ({userProfile.kelas})</p>
          </div>
          <Link href="/dashboard/siswa" className="px-5 py-2.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition shadow-sm">
            Kembali ke Beranda
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Modul Tuntas Sempurna</h3>
            <p className="text-5xl font-extrabold text-emerald-500">{completed} <span className="text-xl text-slate-300 font-bold">/ 24</span></p>
            <p className="text-xs text-slate-400 mt-2">Syarat tuntas: Latihan dan Virtual Lab dikerjakan seluruhnya.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Status Akademik</h3>
            <p className="text-3xl font-extrabold text-slate-700">{completed > 0 ? "Aktif Belajar" : "Belum Memulai"}</p>
          </div>
        </div>

        {/* Laporan Semester 1 */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4 ml-2">
            <h2 className="text-2xl font-black text-slate-800">Semester 1</h2>
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Berpikir Komputasional</span>
          </div>
          
          {renderSemesterSummary(gradeS1)}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold w-12 text-center">#</th>
                    <th className="p-4 font-bold">Modul</th>
                    <th className="p-4 font-bold w-48">Rincian Nilai</th>
                    <th className="p-4 font-bold w-64">Status & Info</th>
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
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4 ml-2">
            <h2 className="text-2xl font-black text-slate-800">Semester 2</h2>
            <span className="bg-fuchsia-100 text-fuchsia-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Kecerdasan Artifisial</span>
          </div>

          {renderSemesterSummary(gradeS2)}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold w-12 text-center">#</th>
                    <th className="p-4 font-bold">Modul</th>
                    <th className="p-4 font-bold w-48">Rincian Nilai</th>
                    <th className="p-4 font-bold w-64">Status & Info</th>
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
