import { useState } from 'react';
import { Plus, Trash2, Edit3, X, Check } from 'lucide-react';
import { useAdmin } from '../AdminContext';

export default function UsersManager() {
  const { users, currentUser, addUser, updateUser, deleteUser } = useAdmin();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', role: 'admin' });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openNew = () => {
    setForm({ username: '', password: '', role: 'admin' });
    setEditing('new');
  };

  const openEdit = (user) => {
    setForm({ username: user.username, password: '', role: user.role });
    setEditing(user.id);
  };

  const closeForm = () => {
    setEditing(null);
    setForm({ username: '', password: '', role: 'admin' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim()) return;
    if (editing === 'new') {
      if (!form.password.trim()) return;
      addUser({ username: form.username.trim(), password: form.password, role: form.role });
    } else {
      const updates = { username: form.username.trim(), role: form.role };
      if (form.password.trim()) {
        updates.password = form.password;
      }
      updateUser(editing, updates);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (currentUser && currentUser.id === id) {
      alert('You cannot delete your own account.');
      return;
    }
    // Prevent deleting last admin
    const targetUser = users.find(u => u.id === id);
    if (targetUser && targetUser.role === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        alert('Cannot delete the last admin account.');
        return;
      }
    }
    setConfirmDelete(id);
  };

  const confirmDeleteUser = () => {
    if (confirmDelete) {
      deleteUser(confirmDelete);
      setConfirmDelete(null);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Manage Users</h1>
          <p className="text-sm text-neutral-500 mt-1">{users.length} user{users.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-olive-500 text-white px-5 py-2.5 rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Add/Edit Form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-neutral-800">{editing === 'new' ? 'New User' : 'Edit User'}</h2>
            <button onClick={closeForm} className="text-neutral-400 hover:text-neutral-600"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Username</label>
                <input className={inputClass} value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="username" required />
              </div>
              <div>
                <label className={labelClass}>
                  {editing === 'new' ? 'Password' : 'New Password (leave blank to keep)'}
                </label>
                <input className={inputClass} type="text" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder={editing === 'new' ? '••••••••' : 'Leave blank to keep'} required={editing === 'new'} />
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <select className={inputClass} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-5 py-2.5 bg-olive-500 text-white rounded-xl hover:bg-olive-600 text-sm font-medium">
                {editing === 'new' ? 'Add User' : 'Save Changes'}
              </button>
              <button type="button" onClick={closeForm} className="px-5 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full mx-4">
            <h3 className="font-bold text-neutral-800 mb-2">Delete User</h3>
            <p className="text-sm text-neutral-500 mb-4">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 text-sm font-medium">Cancel</button>
              <button onClick={confirmDeleteUser} className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="text-left px-5 py-3.5 font-semibold text-neutral-500 text-xs uppercase tracking-wider">Username</th>
              <th className="text-left px-5 py-3.5 font-semibold text-neutral-500 text-xs uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3.5 font-semibold text-neutral-500 text-xs uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3.5 font-semibold text-neutral-500 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center">
                      <span className="text-olive-700 text-xs font-bold">{user.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-800">{user.username}</span>
                      {currentUser && currentUser.id === user.id && (
                        <span className="text-xs text-olive-500 ml-2">(you)</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-green-600">
                    <Check size={12} /> Active
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(user)} className="p-2 rounded-lg text-neutral-400 hover:text-olive-500 hover:bg-olive-50 transition-all">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}