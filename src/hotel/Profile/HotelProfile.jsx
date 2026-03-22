import React, { useEffect, useState } from 'react';
import { Save, Building2, MapPin, Mail, Phone, Globe, Clock, Camera, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

// Animation for business profile
const businessAnimation = "https://lottie.host/362f3e8b-2c40-4f51-8b1b-9f9316d9a0d8/YtXv0G7n9V.json";

const HotelProfile = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        user: {},
        hotel: {}
    });
    const { toast } = useToast();

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users/profile');
            setData({
                user: res.data.data.user || {},
                hotel: res.data.data.hotelDetails || {}
            });
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchProfile();
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.post('/users/create-profile', {
                ...data.user,
                ...data.hotel,
                businessName: data.hotel.businessName,
                website: data.hotel.website,
                description: data.hotel.description,
                workHours: data.hotel.workHours,
                businessType: data.hotel.businessType
            });
            toast({
                title: "Profile Saved! 🏨",
                description: "Your business details have been updated.",
            });
        } catch (error) {
            toast({
                title: "Save Failed",
                description: "Could not update profile details.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8 pb-20 relative"
        >
            {/* Background Orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950/90 backdrop-blur-xl py-4 px-6 md:py-5 md:px-8 text-white shadow-xl border border-white/10 group">
                <div className="absolute top-0 right-0 w-1/4 h-full opacity-10 pointer-events-none">
                    <Lottie animationData={null} path={businessAnimation} loop={true} />
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/20 p-1.5 rounded-lg text-primary backdrop-blur-md">
                                <Building2 size={16} />
                            </div>
                            <span className="text-primary font-bold tracking-widest text-[9px] uppercase">Management Portal</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                            Hotel Profile
                        </h1>
                        <p className="text-slate-400 max-w-md text-xs font-medium leading-relaxed opacity-80">
                            Refine your brand presence and manage your business identity.
                        </p>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-primary hover:bg-blue-600 shadow-xl shadow-primary/10 text-white font-bold h-10 px-5 rounded-xl gap-2 text-xs border border-primary/20 transition-all"
                        >
                            <Save size={16} className={saving ? "animate-pulse" : ""} />
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column - Profile Card */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="bg-white/70 backdrop-blur-xl border-sky-100 shadow-xl rounded-[2rem] overflow-hidden group">
                            <div className="h-24 bg-gradient-to-r from-primary/10 via-indigo-50 to-primary/5 relative">
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-sky-100/50">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-extrabold uppercase text-slate-600">Verified</span>
                                </div>
                            </div>
                            <CardContent className="px-6 pb-8 pt-0 -mt-12 flex flex-col items-center">
                                <div className="w-32 h-32 rounded-3xl bg-white border-4 border-white shadow-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden transition-all duration-500 group-hover:rounded-2xl">
                                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-primary font-black text-4xl uppercase">
                                        {data.hotel.businessName?.charAt(0) || data.user.name?.charAt(0) || "H"}
                                    </div>
                                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                                        <Camera className="text-white scale-75 group-hover:scale-100 transition-transform" size={32} />
                                    </div>
                                </div>
                                <h2 className="mt-4 font-black text-2xl text-slate-800 text-center">{data.hotel.businessName || "Your Hotel"}</h2>
                                <p className="text-slate-500 text-sm font-medium">{(data.hotel.businessType || 'Hospitality').toUpperCase()} • {data.hotel.location || 'Location TBD'}</p>
                                
                                <div className="w-full mt-8 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 space-y-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completion</span>
                                        <span className="text-sm font-black text-primary">{data.user.profileCompleted || 0}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${data.user.profileCompleted || 0}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="bg-gradient-to-r from-primary to-blue-400 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                        ></motion.div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Complete your profile to gain 3x more visibility from premium candidates.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <Card className="bg-white/60 backdrop-blur-lg border-sky-100 shadow-lg rounded-[2rem] p-6">
                        <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Primary Category</Label>
                        <Select 
                            value={data.hotel.businessType || "hotel"}
                            onValueChange={(val) => setData({...data, hotel: {...data.hotel, businessType: val}})}
                        >
                            <SelectTrigger className="rounded-xl border-slate-100 h-12">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hotel">🏨 Premium Hotel</SelectItem>
                                <SelectItem value="restaurant">🍽️ Fine Dining</SelectItem>
                                <SelectItem value="cafe">☕ Cozy Café</SelectItem>
                                <SelectItem value="club">🍸 Bar & Lounge</SelectItem>
                                <SelectItem value="other">✨ Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </Card>
                </div>

                {/* Right Column - Form Groups */}
                <div className="lg:col-span-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="bg-white/70 backdrop-blur-xl border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                                <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-800">
                                    <Sparkles size={20} className="text-primary" />
                                    Business Identity
                                </CardTitle>
                                <CardDescription className="text-slate-500 font-medium">Public details that candidates will see on your job posts.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="businessName" className="font-bold text-slate-700">Business Name</Label>
                                    <div className="group relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                        <Input 
                                            id="businessName" 
                                            placeholder="Your Establishment Name" 
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-white group-hover:border-primary/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-lg font-medium" 
                                            value={data.hotel.businessName || ""} 
                                            onChange={(e) => setData({...data, hotel: {...data.hotel, businessName: e.target.value}})}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="font-bold text-slate-700">Official Email</Label>
                                        <div className="relative opacity-60">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                            <Input id="email" type="email" value={data.user.email || ""} disabled className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 cursor-not-allowed font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="phone" className="font-bold text-slate-700">Contact Number</Label>
                                        <div className="group relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                            <Input 
                                                id="phone" 
                                                placeholder="+91..." 
                                                className="pl-12 h-14 rounded-2xl border-slate-100 bg-white group-hover:border-primary/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium" 
                                                value={data.hotel.phone || data.user.phone || ""}
                                                onChange={(e) => setData({...data, hotel: {...data.hotel, phone: e.target.value}})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="website" className="font-bold text-slate-700">Official Website</Label>
                                    <div className="group relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                        <Input 
                                            id="website" 
                                            placeholder="https://..." 
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-white group-hover:border-primary/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium" 
                                            value={data.hotel.website || ""}
                                            onChange={(e) => setData({...data, hotel: {...data.hotel, website: e.target.value}})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <Label className="font-bold text-slate-700">Establishment Bio</Label>
                                    <Textarea
                                        placeholder="Describe your hotel/restaurant culture, mission, and what makes you unique..."
                                        className="min-h-[160px] rounded-3xl border-slate-100 bg-white p-6 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium leading-relaxed resize-none"
                                        value={data.hotel.description || ""}
                                        onChange={(e) => setData({...data, hotel: {...data.hotel, description: e.target.value}})}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="bg-white/70 backdrop-blur-xl border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                                <CardTitle className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    <MapPin size={20} className="text-primary" />
                                    Operational Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="location" className="font-bold text-slate-700">Business Address</Label>
                                    <div className="group relative">
                                        <MapPin className="absolute left-4 top-4 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                        <Textarea
                                            id="location" 
                                            placeholder="Street, City, State, Zip..." 
                                            className="pl-12 min-h-[100px] rounded-2xl border-slate-100 bg-white group-hover:border-primary/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium resize-none" 
                                            value={data.hotel.location || ""}
                                            onChange={(e) => setData({...data, hotel: {...data.hotel, location: e.target.value}})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="hours" className="font-bold text-slate-700">Business Hours</Label>
                                    <div className="group relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                        <Input 
                                            id="hours" 
                                            placeholder="e.g. 9:00 AM - 11:00 PM" 
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-white group-hover:border-primary/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium" 
                                            value={data.hotel.workHours || ""}
                                            onChange={(e) => setData({...data, hotel: {...data.hotel, workHours: e.target.value}})}
                                        />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 mt-2">
                                        <p className="text-[11px] text-sky-700/80 font-bold leading-relaxed">Show candidates when they can expect your outlet to be active and busiest.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default HotelProfile;
