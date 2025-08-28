import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Settings, BarChart3, Bell, AlertTriangle, Plus, Edit, Trash2, Eye, Send, ToggleLeft, ToggleRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock Firebase functions (replace with your actual Firebase imports)
const mockFirebaseAuth = {
  currentUser: { uid: 'admin-123', email: 'admin@example.com' },
  onAuthStateChanged: (callback) => callback({ uid: 'admin-123', email: 'admin@example.com' })
};

const mockFirestore = {
  collection: () => ({
    add: (data) => Promise.resolve({ id: Date.now().toString() }),
    get: () => Promise.resolve({
      docs: [
        { id: '1', data: () => ({ name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: new Date() }) },
        { id: '2', data: () => ({ name: 'Jane Smith', email: 'jane@example.com', role: 'admin', createdAt: new Date() }) }
      ]
    }),
    doc: (id) => ({
      update: (data) => Promise.resolve(),
      delete: () => Promise.resolve()
    })
  })
};

// Utility Functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Custom Hooks
const useUsers = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: new Date('2024-01-15'), status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', createdAt: new Date('2024-01-10'), status: 'active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'user', createdAt: new Date('2024-02-01'), status: 'inactive' }
  ]);
  const [loading, setLoading] = useState(false);

  const addUser = async (userData) => {
    setLoading(true);
    const newUser = { id: Date.now().toString(), ...userData, createdAt: new Date(), status: 'active' };
    setUsers(prev => [...prev, newUser]);
    setLoading(false);
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...userData } : user));
    setLoading(false);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setUsers(prev => prev.filter(user => user.id !== id));
    setLoading(false);
  };

  return { users, loading, addUser, updateUser, deleteUser };
};

const useComplaints = () => {
  const [complaints, setComplaints] = useState([
    { id: '1', title: 'Login Issue', description: 'Cannot login to my account', status: 'pending', priority: 'high', submittedBy: 'john@example.com', createdAt: new Date('2024-07-25') },
    { id: '2', title: 'Feature Request', description: 'Would like dark mode option', status: 'in-progress', priority: 'medium', submittedBy: 'jane@example.com', createdAt: new Date('2024-07-26') },
    { id: '3', title: 'Bug Report', description: 'Page crashes when clicking submit', status: 'resolved', priority: 'high', submittedBy: 'mike@example.com', createdAt: new Date('2024-07-20') }
  ]);
  const [loading, setLoading] = useState(false);

  const updateComplaintStatus = async (id, status) => {
    setLoading(true);
    setComplaints(prev => prev.map(complaint => complaint.id === id ? { ...complaint, status } : complaint));
    setLoading(false);
  };

  return { complaints, loading, updateComplaintStatus };
};

const useSystemSettings = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    globalNotice: '',
    showGlobalNotice: false
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
};

// Components
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Admin Suite</h1>
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id ? 'bg-blue-600' : 'hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const GlobalNotice = ({ settings }) => {
  if (!settings.showGlobalNotice || !settings.globalNotice) return null;

  return (
    <Alert className="mb-4 bg-blue-50 border-blue-200">
      <Bell className="h-4 w-4" />
      <AlertDescription>{settings.globalNotice}</AlertDescription>
    </Alert>
  );
};

const MaintenanceNotice = ({ isMaintenanceMode }) => {
  if (!isMaintenanceMode) return null;

  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        System is currently in maintenance mode. Users will see a maintenance page.
      </AlertDescription>
    </Alert>
  );
};

const Dashboard = () => {
  // Generate dummy heatmap data
  const generateHeatmapData = () => {
    const data = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    days.forEach((day, dayIndex) => {
      hours.forEach(hour => {
        data.push({
          day: dayIndex,
          hour,
          value: Math.floor(Math.random() * 100),
          dayName: day
        });
      });
    });
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getIntensityColor = (value) => {
    if (value < 20) return 'bg-green-100';
    if (value < 40) return 'bg-green-200';
    if (value < 60) return 'bg-green-300';
    if (value < 80) return 'bg-green-400';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Complaints</p>
              <p className="text-2xl font-bold">23</p>
            </div>
            <MessageSquare className="text-yellow-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">System Status</p>
              <p className="text-2xl font-bold text-green-600">Healthy</p>
            </div>
            <BarChart3 className="text-green-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Usage Heatmap (Last 7 Days)</h3>
        <div className="space-y-2">
          <div className="flex text-xs text-gray-500 ml-8">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="w-4 text-center">{i % 4 === 0 ? i : ''}</div>
            ))}
          </div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-1">
              <div className="w-8 text-xs text-gray-500">{day}</div>
              {heatmapData
                .filter(d => d.day === dayIndex)
                .map((d, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(d.value)}`}
                    title={`${day} ${d.hour}:00 - ${d.value} users`}
                  />
                ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-3 h-3 rounded-sm ${getIntensityColor(i * 20)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    
    if (editingUser) {
      await updateUser(editingUser.id, formData);
      setEditingUser(null);
    } else {
      await addUser(formData);
    }
    setFormData({ name: '', email: '', role: 'user' });
    setShowAddForm(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowAddForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {editingUser ? 'Update' : 'Add'} User
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingUser(null);
                  setFormData({ name: '', email: '', role: 'user' });
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Name</th>
                <th className="text-left p-4 font-medium text-gray-600">Email</th>
                <th className="text-left p-4 font-medium text-gray-600">Role</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Created</th>
                <th className="text-left p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">{formatDate(user.createdAt)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ComplaintManagement = () => {
  const { complaints, loading, updateComplaintStatus } = useComplaints();
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Complaint Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Complaints List</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {complaints.map(complaint => (
              <div
                key={complaint.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedComplaint?.id === complaint.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedComplaint(complaint)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{complaint.title}</h4>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{complaint.description.substring(0, 100)}...</p>
                <div className="text-xs text-gray-500">
                  {complaint.submittedBy} • {formatDate(complaint.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedComplaint && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Complaint Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-lg">{selectedComplaint.title}</h4>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedComplaint.priority)}`}>
                    {selectedComplaint.priority} priority
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedComplaint.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted By</label>
                  <p className="text-gray-600">{selectedComplaint.submittedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <p className="text-gray-600">{formatDate(selectedComplaint.createdAt)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <div className="flex gap-2">
                  {['pending', 'in-progress', 'resolved'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateComplaintStatus(selectedComplaint.id, status)}
                      className={`px-3 py-1 rounded-lg text-sm capitalize ${
                        selectedComplaint.status === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      disabled={loading}
                    >
                      {status.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Settings = ({ settings, updateSetting }) => {
  const [noticeText, setNoticeText] = useState(settings.globalNotice);

  const handleSaveNotice = () => {
    updateSetting('globalNotice', noticeText);
    updateSetting('showGlobalNotice', true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Maintenance Mode</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Maintenance Mode</p>
                <p className="text-sm text-gray-600">Users will see a maintenance page when enabled</p>
              </div>
              <button
                onClick={() => updateSetting('maintenanceMode', !settings.maintenanceMode)}
                className="flex items-center"
              >
                {settings.maintenanceMode ? (
                  <ToggleRight className="text-blue-600" size={32} />
                ) : (
                  <ToggleLeft className="text-gray-400" size={32} />
                )}
              </button>
            </div>
            {settings.maintenanceMode && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Maintenance mode is currently active. Users cannot access the application.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Global Notice Banner</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notice Message</label>
              <textarea
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                placeholder="Enter a global notice message..."
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSetting('showGlobalNotice', !settings.showGlobalNotice)}
                  className="flex items-center"
                >
                  {settings.showGlobalNotice ? (
                    <ToggleRight className="text-blue-600" size={24} />
                  ) : (
                    <ToggleLeft className="text-gray-400" size={24} />
                  )}
                </button>
                <span className="text-sm">Show notice banner</span>
              </div>
              <button
                onClick={handleSaveNotice}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Send size={16} />
                Save Notice
              </button>
            </div>
            {settings.showGlobalNotice && settings.globalNotice && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <Alert className="bg-blue-50 border-blue-200">
                  <Bell className="h-4 w-4" />
                  <AlertDescription>{settings.globalNotice}</AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">User Feedback Form Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
              <input
                type="text"
                defaultValue="Submit Feedback"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-response Email</label>
              <input
                type="email"
                defaultValue="support@company.com"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Categories</label>
            <div className="flex flex-wrap gap-2">
              {['Bug Report', 'Feature Request', 'General Feedback', 'Technical Issue'].map(category => (
                <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Update Form Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AdminSuite = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { settings, updateSetting } = useSystemSettings();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'complaints':
        return <ComplaintManagement />;
      case 'settings':
        return <Settings settings={settings} updateSetting={updateSetting} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <MaintenanceNotice isMaintenanceMode={settings.maintenanceMode} />
          <GlobalNotice settings={settings} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSuite;