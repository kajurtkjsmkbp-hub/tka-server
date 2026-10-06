"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // Teachers list
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    localStorage.removeItem("currentUser");
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        if (data.teachers && data.teachers.length > 0) {
          setTeachers(data.teachers);
          setRegTeacher(data.teachers[0].username);
          const t0 = data.teachers[0];
          if (t0.classes && t0.classes.length > 0 && !t0.classes.includes('SEMUA')) {
            setRegClass(t0.classes[0]);
            setRegMajor(autoDetectMajor(t0.classes[0]));
          } else {
            setRegClass('X TE 1');
            setRegMajor('Teknik Elektronika');
          }
        }
      })
      .catch(console.error);
  }, []);

  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states (Khusus Siswa)
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regTeacher, setRegTeacher] = useState('');
  const [regClass, setRegClass] = useState('');
  const [customClassMode, setCustomClassMode] = useState(false);
  const [regMajor, setRegMajor] = useState('');

  const autoDetectMajor = (className: string) => {
    const upper = className.toUpperCase();
    if (upper.includes('TE')) return 'Teknik Elektronika';
    if (upper.includes('TKJ')) return 'Teknik Komputer dan Jaringan';
    if (upper.includes('RPL')) return 'Rekayasa Perangkat Lunak';
    if (upper.includes('TKR')) return 'Teknik Kendaraan Ringan';
    if (upper.includes('TBSM')) return 'Teknik dan Bisnis Sepeda Motor';
    return 'Teknologi Informasi';
  };

  const handleTeacherChange = (teacherUsername: string) => {
    setRegTeacher(teacherUsername);
    const selected = teachers.find(t => t.username === teacherUsername);
    if (selected && selected.classes && selected.classes.length > 0 && !selected.classes.includes('SEMUA')) {
      const firstClass = selected.classes[0];
      setRegClass(firstClass);
      setCustomClassMode(false);
      setRegMajor(autoDetectMajor(firstClass));
    } else {
      setCustomClassMode(true);
      if (!regClass) {
        setRegClass('X TE 1');
        setRegMajor('Teknik Elektronika');
      }
    }
  };

  const handleClassChange = (newClass: string) => {
    if (newClass === '__CUSTOM__') {
      setCustomClassMode(true);
      setRegClass('');
    } else {
      setRegClass(newClass);
      setRegMajor(autoDetectMajor(newClass));
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        if (data.role === 'guru') {
          router.push('/dashboard/guru');
        } else {
          router.push('/dashboard/siswa');
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Gagal terhubung ke server");
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!regClass) {
      alert('Silakan pilih atau masukkan kelas.');
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName: regFullName, 
          username: regUsername, 
          password: regPassword, 
          kelas: regClass, 
          jurusan: regMajor,
          guruPengampu: regTeacher,
          role: 'siswa'
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Pendaftaran berhasil! Silakan masuk dengan akun Anda.');
        setIsLogin(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Pendaftaran gagal");
    }
  };

  const selectedTeacherObj = teachers.find(t => t.username === regTeacher);
  const teacherClasses = selectedTeacherObj?.classes || [];
  const hasSpecificClasses = teacherClasses.length > 0 && !teacherClasses.includes('SEMUA');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sans py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 shadow-sm">
          <span>🎓</span> LMS KKA Kurikulum Merdeka
        </div>
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">LMS KKA</h1>
        <p className="text-gray-600 mt-1">Platform Belajar Koding & Kecerdasan Artifisial</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 w-full max-w-lg">
        
        {isLogin ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-800">Masuk Akun</h2>
              <p className="text-sm text-gray-500 mt-1">Gunakan username dan kata sandi Anda untuk masuk.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Username / Login</label>
                <input 
                  type="text" 
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Contoh: budi123 atau guru_andi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kata Sandi</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  required 
                />
              </div>

              <button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]">
                Masuk ke LMS
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600 border-t border-slate-100 pt-6">
              Belum punya akun siswa?{' '}
              <button 
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-bold hover:underline"
                type="button"
              >
                Daftar Sekarang
              </button>

              <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 font-medium flex items-center justify-center gap-2">
                <span>💡</span>
                <span>Jika siswa lupa dengan login dan kata sandi, silakan hubungi: <strong>Adiningtyas Yuli Purwanto, S.Kom</strong></span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-800">Daftar Akun Siswa</h2>
              <p className="text-sm text-gray-500 mt-1">Pilih kelas dan guru pengampu Anda untuk memulai belajar.</p>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  required 
                />
              </div>

              {/* Username dan Kata Sandi Berdampingan (2 Kolom) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Username / ID Login</label>
                  <input 
                    type="text" 
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value.toLowerCase().trim())}
                    placeholder="Contoh: budi_te4"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-mono"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Kata Sandi</label>
                  <input 
                    type="password" 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Buat kata sandi"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                    required 
                  />
                </div>
              </div>

              {/* Pilihan Guru Pengampu */}
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 space-y-3 mt-1">
                <div>
                  <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>👨‍🏫</span> Guru Pengampu Mapel
                  </label>
                  <select
                    value={regTeacher}
                    onChange={(e) => handleTeacherChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-slate-800 font-medium text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    required
                  >
                    {teachers.map(t => {
                      const tClasses = t.classes && t.classes.length > 0 ? t.classes.join(', ') : 'Semua Kelas';
                      return (
                        <option key={t.username} value={t.username}>
                          {t.fullName} (Mengajar: {tClasses})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Pilihan Kelas sesuai Guru */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🏫</span> Kelas
                    </label>
                    {hasSpecificClasses && !customClassMode ? (
                      <select
                        value={regClass}
                        onChange={(e) => handleClassChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-slate-800 font-bold text-sm focus:border-indigo-500 outline-none"
                        required
                      >
                        {teacherClasses.map((cls: string) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                        <option value="__CUSTOM__">✍️ Ketik Kelas Lainnya...</option>
                      </select>
                    ) : (
                      <div className="space-y-1">
                        <input 
                          type="text"
                          value={regClass} 
                          onChange={(e) => {
                            setRegClass(e.target.value);
                            setRegMajor(autoDetectMajor(e.target.value));
                          }}
                          placeholder="Contoh: X TE 4"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-slate-800 font-bold text-sm focus:border-indigo-500 outline-none"
                          required
                        />
                        {hasSpecificClasses && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomClassMode(false);
                              setRegClass(teacherClasses[0]);
                            }}
                            className="text-[11px] text-indigo-600 hover:underline font-semibold"
                          >
                            ↩️ Kembali ke daftar kelas guru
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
                      Jurusan
                    </label>
                    <input 
                      type="text" 
                      value={regMajor} 
                      onChange={(e) => setRegMajor(e.target.value)}
                      placeholder="Contoh: Teknik Elektronika"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-slate-800 text-sm focus:border-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="text-[11px] text-indigo-900 font-medium bg-white/90 p-2.5 rounded-xl border border-indigo-200/80 flex items-center gap-2 shadow-sm">
                  <span className="text-sm">💡</span>
                  <span>
                    Jika siswa lupa dengan login dan kata sandi, silakan hubungi: <strong className="font-bold text-indigo-950">Adiningtyas Yuli Purwanto, S.Kom</strong>.
                  </span>
                </div>
              </div>

              <button type="submit" className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]">
                Daftar Akun Siswa Sekarang 🎉
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 border-t border-slate-100 pt-5">
              Sudah punya akun?{' '}
              <button 
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-bold hover:underline"
                type="button"
              >
                Masuk di sini
              </button>
            </div>
          </>
        )}

      </div>

      <footer className="mt-12 text-center text-xs text-slate-400">
        <p className="font-bold text-slate-500">LMS KKA (Koding & Kecerdasan Artifisial)</p>
        <p className="mt-0.5">Design by Adiningtyas Yuli Purwanto, S.Kom</p>
      </footer>
    </div>
  );
}
