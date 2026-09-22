"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherManager({ initialTeachers }: { initialTeachers: any[] }) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [formData, setFormData] = useState({ fullName: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ fullName: '', username: '', password: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (t: any) => {
    setEditMode(true);
    setCurrentUsername(t.username);
    setFormData({ fullName: t.fullName, username: t.username, password: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        // Edit guru
        const res = await fetch(`/api/users/${currentUsername}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: formData.fullName })
        });
        if (res.ok) {
          setTeachers(teachers.map(t => t.username === currentUsername ? { ...t, fullName: formData.fullName } : t));
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
            role: 'guru'
          })
        });
        if (res.ok) {
          const { user } = await res.json();
          setTeachers([...teachers, { ...user, isActive: true }]);
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
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Guru</h2>
          <p className="text-slate-500 text-sm mt-1">Tambah, edit, nonaktifkan, atau hapus akses guru.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition">
          + Tambah Guru
        </button>
      </div>

      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
              <th className="px-6 py-4 font-semibold">Nama Guru</th>
              <th className="px-6 py-4 font-semibold">Username</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teachers.map((t, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{t.fullName}</td>
                <td className="px-6 py-4 text-slate-500">@{t.username}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {t.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleToggleActive(t.username, t.isActive)} className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100">
                    {t.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button onClick={() => handleOpenEdit(t)} className="px-3 py-1 text-xs font-bold rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(t.username)} className="px-3 py-1 text-xs font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">Belum ada guru lain terdaftar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">{editMode ? 'Edit Guru' : 'Tambah Guru Baru'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Nama Lengkap</label>
                <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-blue-500 outline-none" />
              </div>
              {!editMode && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Username (Login)</label>
                    <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
                    <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-blue-500 outline-none" />
                  </div>
                </>
              )}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition">Batal</button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50">
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
