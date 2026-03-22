import React, { useState } from 'react';
import { MOCK_USER } from '../services/mockData';
import { Camera, Mail, Phone, MapPin, Plus, X, FileCheck } from 'lucide-react';

const Profile: React.FC = () => {
  const [skills, setSkills] = useState(MOCK_USER.skills);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-white/60 relative overflow-hidden group">
        {/* Banner */}
        <div className="h-32 md:h-48 w-full bg-gradient-to-r from-secondary to-primary/80"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar - Negative margin pulls ONLY the avatar up */}
            <div className="relative -mt-16 md:-mt-12 shrink-0 z-10">
              <div className="relative group/avatar">
                <img
                  src={MOCK_USER.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-slate-200"
                />
                <button className="absolute bottom-1 right-1 bg-slate-900 text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 hover:scale-110">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            {/* User Info - Flows naturally below banner */}
            <div className="flex-1 text-center md:text-left w-full md:mt-4">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">{MOCK_USER.name}</h1>
                  <p className="text-primary font-bold text-lg">{MOCK_USER.role}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 mt-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5"><MapPin size={15} className="text-slate-400" /> {MOCK_USER.location}</span>
                    <span className="flex items-center gap-1.5"><Mail size={15} className="text-slate-400" /> {MOCK_USER.email}</span>
                    <span className="flex items-center gap-1.5"><Phone size={15} className="text-slate-400" /> {MOCK_USER.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 shrink-0">
                  <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                    Preview
                  </button>
                  <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg shadow-primary/30 whitespace-nowrap">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-8">

          {/* Experience Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              About & Experience
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Professional Summary</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl p-4 text-sm text-slate-800 outline-none transition-all h-28 resize-none leading-relaxed"
                  placeholder="Tell employers about yourself..."
                  defaultValue="Dedicated waiter with 5 years of experience in high-volume dining environments. Passionate about delivering exceptional guest service."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Experience</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl p-4 text-sm text-slate-800 outline-none transition-all"
                  defaultValue={MOCK_USER.experience}
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map(skill => (
                <span key={skill} className="bg-sky-50 text-primary border border-sky-100 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 group transition-colors hover:bg-sky-100">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:bg-primary hover:text-white rounded-full p-0.5 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <Plus className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Add a skill (e.g. Cocktail Mixing) and press Enter"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl outline-none transition-all text-sm"
              />
            </div>
          </div>

        </div>

        {/* Right Column - Availability & Docs */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Availability</h3>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-medium text-slate-600">{day}</span>
                  <select className="bg-white border border-slate-200 text-xs rounded-lg py-1.5 pl-2 pr-6 focus:ring-2 focus:ring-primary/50 text-slate-700 font-medium outline-none">
                    <option>Anytime</option>
                    <option>Evening</option>
                    <option>Morning</option>
                    <option>Unavailable</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-primary/30 cursor-pointer transition-all bg-slate-50 hover:bg-white hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-100 text-rose-500 p-2.5 rounded-xl">
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Resume.pdf</p>
                    <p className="text-xs text-slate-400 font-medium">Uploaded 2d ago</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-500 hover:border-primary hover:text-primary hover:bg-sky-50 transition-all">
                + Upload Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;