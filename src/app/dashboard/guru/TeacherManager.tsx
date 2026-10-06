"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherManager({ initialTeachers }: { initialTeachers: any[] }) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [formData, setFormData] = useState({ fullName: '', username: '', password: '', classesStr: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ fullName: '', username: '', password: '', classesStr: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (t: any) => {
    setEditMode(true);
    setCurrentUsername(t.username);
    const existingClasses = Array.isArray(t.classes) ? t.classes.join(', ') : (t.classes || '');
    setFormData({ fullName: t.fullName, username: t.username, password: '', classesStr: existingClasses });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const parsedClasses = formData.classesStr
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    try {
      if (editMode) {
        // Edit guru
        const res = await fetch(`/api/users/${currentUsername}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            fullName: formData.fullName,
            classes: parsedClasses 
          })
        });
        if (res.ok) {
          setTeachers(teachers.map(t => t.username === currentUsername ? { 
            ...t, 
            fullName: formData.fullName,
            classes: parsedClasses
          } : t));
          setShowModal(false);
        } else {
          alert('Gagal memperbarui guru');
        }
      } else {
        // Tambah guru
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            username: formData.username,
            password: formData.password,
            role: 'guru',
            classes: parsedClasses
          })
        });
        if (res.ok) {
          const { user } = await res.json();
          setTeachers([...teachers, { ...user, isActive: true, classes: parsedClasses }]);
          setShowModal(false);
        } else {
          const err = await res.json();
          alert(err.error || 'Gagal menambahkan guru');
        }
      }
      router.refresh();
    } catch (error) {
      alert('Terjadi kesalahan jaringan');
    }
    setLoading(false);
  };

  const handleToggleActive = async (username: string, currentStatus: boolean) => {
    if (username.toLowerCase() === 'admin') {
      alert('Akun Super Administrator utama (Adiningtyas Yuli Purwanto) dilindungi dan tidak dapat dinonaktifkan oleh siapa pun!');
      return;
    }
    if (confirm(`Yakin ingin ${currentStatus ? 'menonaktifkan' : 'mengaktifkan'} guru ini?`)) {
      const res = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        setTeachers(teachers.map(t => t.username === username ? { ...t, isActive: !currentStatus } : t));
        router.refresh();
      }
    }
  };

  const handleDelete = async (username: string) => {
    if (username.toLowerCase() === 'admin') {
      alert('Akun Super Administrator utama (Adiningtyas Yuli Purwanto) dilindungi dan tidak dapat dihapus!');
      return;
    }
    if (confirm('Yakin ingin menghapus guru ini secara permanen?')) {
      const res = await fetch(`/api/users/${username}`, { method: 'DELETE' });
      if (res.ok) {
        setTeachers(teachers.filter(t => t.username !== username));
        router.refresh();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden mb-12">
      <div className="p-8 border-b border-slate-100 bg-white/50 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Guru & Pembagian Kelas</h2>
          <p className="text-slate-500 text-sm mt-1">
            Atur kelas yang diampu oleh masing-masing guru. Nilai dan daftar siswa di dasbor akan otomatis disaring sesuai kelas yang diajar.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-2">
          <span>➕</span> Tambah Guru
        </button>
      </div>

      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
              <th className="px-6 py-4 font-semibold">Nama Guru</th>
              <th className="px-6 py-4 font-semibold">Username</th>
              <th className="px-6 py-4 font-semibold">Kelas yang Diampu</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teachers.map((t, i) => {
              const teacherClasses = Array.isArray(t.classes) ? t.classes : (t.classes ? [t.classes] : []);
              const isAllClasses = teacherClasses.length === 0 || teacherClasses.includes('SEMUA');

              const isMasterAdmin = t.username.toLowerCase() === 'admin';

              return (
                <tr key={i} className={`hover:bg-slate-50/80 transition-colors ${isMasterAdmin ? 'bg-amber-50/20' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      {t.fullName}
                      {isMasterAdmin && (
                        <span className="text-[10px] bg-amber-400/20 text-amber-800 border border-amber-300 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          👑 Super Admin
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-sm">@{t.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {isAllClasses ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          🌟 Semua Kelas (Admin)
                        </span>
                      ) : (
                        teacherClasses.map((cls: string, cIdx: number) => (
                          <span key={cIdx} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {cls}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {isMasterAdmin ? (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-max shadow-xs">
                        <span>🛡️</span> Aktif (Permanen)
                      </span>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {t.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {isMasterAdmin ? (
                        <>
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1">
                            <span>🔒</span> Dilindungi
                          </span>
                          <button onClick={() => handleOpenEdit(t)} className="px-3 py-1 text-xs font-bold rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition">
                            Edit
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleToggleActive(t.username, t.isActive)} className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
                            {t.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                          </button>
                          <button onClick={() => handleOpenEdit(t)} className="px-3 py-1 text-xs font-bold rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(t.username)} className="px-3 py-1 text-xs font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition">
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Belum ada guru lain terdaftar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{editMode ? 'Edit Profil Guru & Kelas' : 'Tambah Guru Baru'}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Tentukan nama dan kelas yang akan diajar guru ini</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input 
                  required 
                  type="text" 
                  value={formData.fullName} 
                  onChange={e => setFormData({...formData, fullName: e.target.value})} 
                  placeholder="Contoh: Guru Andi, S.Kom"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 text-sm" 
                />
              </div>

              {!editMode && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Username (ID Login)</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.username} 
                      onChange={e => setFormData({...formData, username: e.target.value})} 
                      placeholder="Contoh: guru_andi"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                    <input 
                      required 
                      type="password" 
                      value={formData.password} 
                      onChange={e => setFormData({...formData, password: e.target.value})} 
                      placeholder="Masukkan kata sandi"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 text-sm" 
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Kelas yang Diampu (Bisa Lebih Dari 1)
                </label>
                <input 
                  type="text" 
                  value={formData.classesStr} 
                  onChange={e => setFormData({...formData, classesStr: e.target.value})} 
                  placeholder="Contoh: X TE 3, X TE 4 (atau SEMUA)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 text-sm" 
                />
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  💡 Pisahkan dengan koma jika mengajar banyak kelas. Ketik <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">SEMUA</code> jika guru ini berhak melihat seluruh kelas.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-sm">
                  Batal
                </button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 text-sm shadow-md shadow-indigo-600/20">
                  {loading ? 'Menyimpan...' : 'Simpan Guru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
