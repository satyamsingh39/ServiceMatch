import React, { useEffect, useState } from 'react';
import { Camera, Mail, Phone, MapPin, Plus, X, FileCheck, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users/profile');
      setProfile(res.data.data.user);
    } catch (error) {
      toast({
        title: "Error fetching profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.post('/users/create-profile', profile);
      toast({
        title: "Profile Updated! ✨",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not save profile changes.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      const trimmed = newSkill.trim();
      if (!profile.skills?.includes(trimmed)) {
        setProfile({ ...profile, skills: [...(profile.skills || []), trimmed] });
      }
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s: string) => s !== skillToRemove) });
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-white/60 relative overflow-hidden group">
        <div className="h-32 md:h-48 w-full bg-gradient-to-r from-slate-800 to-slate-900"></div>

        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative -mt-16 md:-mt-12 shrink-0 z-10">
              <div className="relative group/avatar">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-2xl">
                    {profile.name?.charAt(0) || "U"}
                </div>
                <button className="absolute bottom-1 right-1 bg-slate-900 text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 hover:scale-110">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left w-full md:mt-4">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">{profile.name}</h1>
                  <p className="text-primary font-bold text-lg capitalize">{profile.role}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 mt-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5"><MapPin size={15} className="text-slate-400" /> {profile.location || "Location not set"}</span>
                    <span className="flex items-center gap-1.5"><Mail size={15} className="text-slate-400" /> {profile.email}</span>
                    <span className="flex items-center gap-1.5"><Phone size={15} className="text-slate-400" /> {profile.phone || "No phone"}</span>
                  </div>
                </div>

                <div className="flex gap-3 shrink-0">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg shadow-primary/30 whitespace-nowrap disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">About & Experience</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Professional Summary</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl p-4 text-sm text-slate-800 outline-none transition-all h-28 resize-none leading-relaxed"
                  placeholder="Tell employers about yourself..."
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Years of Experience</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl p-4 text-sm text-slate-800 outline-none transition-all"
                  value={profile.experience || ""}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(profile.skills || []).map((skill: string) => (
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
                placeholder="Add a skill and press Enter"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Location & Contact</h3>
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">City / Location</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;