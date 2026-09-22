"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("currentUser");
  }, []);


  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states (Khusus Siswa)
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regClass, setRegClass] = useState('');
  const [regMajor, setRegMajor] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">LMS KKA</h1>
        <p className="text-gray-600">Koding & Kecerdasan Artifisial - Kurikulum Merdeka</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
        
        {isLogin ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Masuk Akun</h2>
              <p className="text-sm text-gray-500 mt-1">Gunakan akun Anda untuk masuk ke platform.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Username / Login</label>
                <input 
                  type="text" 
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Contoh: budi123 atau guru_andi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required 
                />
                <p className="text-xs text-gray-400 mt-2">*Gunakan kata "guru" pada username untuk masuk sebagai guru.</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kata Sandi</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required 
                />
              </div>

              <button type="submit" className="w-full mt-2 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
                Masuk ke LMS
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <button 
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-semibold hover:underline"
                type="button"
              >
                Silakan daftar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Daftar Akun Siswa</h2>
              <p className="text-sm text-gray-500 mt-1">Isi formulir berikut untuk membuat akun siswa baru.</p>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Panjang</label>
                <input 
                  type="text" 
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 outline-none"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Username / Login</label>
                <input 
                  type="text" 
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Buat username unik"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 outline-none"
                  required 
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kelas</label>
                  <input 
                    type="text"
                    value={regClass} 
                    onChange={(e) => setRegClass(e.target.value)}
                    placeholder="Contoh: X TE 3"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Jurusan</label>
                  <input 
                    type="text"
                    value={regMajor} 
                    onChange={(e) => setRegMajor(e.target.value)}
                    placeholder="Contoh: Teknik Elektronika"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kata Sandi</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Buat kata sandi"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 outline-none"
                  required 
                />
              </div>

              <button type="submit" className="w-full mt-2 bg-green-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all">
                Daftar Akun
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <button 
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-semibold hover:underline"
                type="button"
              >
                Masuk di sini
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-12 mb-8 text-center">
        <p className="text-sm font-bold text-gray-500 mb-1">
          LMS KKA (Koding & Kecerdasan Artifisial)
        </p>
        <p className="text-xs text-gray-400">
          Platform pembelajaran masa depan SMK Kelas X Kurikulum Nasional.
        </p>
        <p className="text-xs font-semibold text-gray-500 mt-2">
          Design by Adiningtyas Yuli Purwanto, S.Kom
        </p>
      </div>
    </div>
  );
}
