import React from 'react';
import { Save, Building2, MapPin, Mail, Phone, Globe, Clock, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const HotelProfile = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Hotel Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your business details and public presence.</p>
                </div>
                <Button className="bg-primary hover:bg-blue-600 shadow-lg shadow-blue-500/20 text-white gap-2">
                    <Save size={18} /> Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Logo & Basic Info */}
                <div className="space-y-6">
                    <Card className="border-slate-100 shadow-sm relative overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Logo & Branding</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                    <Building2 size={40} className="text-slate-300" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-3 text-center">Click to upload. PNG, JPG max 2MB.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Business Type</Label>
                                <Select defaultValue="hotel">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hotel">Hotel</SelectItem>
                                        <SelectItem value="restaurant">Restaurant</SelectItem>
                                        <SelectItem value="cafe">Café</SelectItem>
                                        <SelectItem value="club">Club / Bar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-100 shadow-sm bg-blue-50/50">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-blue-900 mb-2">Profile Completion</h3>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-bold text-blue-600">85%</span>
                                <span className="text-sm text-blue-600/80 mb-1">Excellent!</span>
                            </div>
                            <div className="w-full bg-blue-200/50 rounded-full h-2 mb-4">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-sm text-blue-800/70">
                                Add a description and website to reach 100%.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Details Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>Business Details</CardTitle>
                            <CardDescription>This information will be visible to applicants.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="businessName">Business Name</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <Input id="businessName" placeholder="e.g. Grand Hotel & Spa" className="pl-10" defaultValue="Grand Hotel" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <Input id="email" type="email" placeholder="contact@hotel.com" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <Input id="phone" placeholder="+91 98765 43210" className="pl-10" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <Input id="website" placeholder="https://www.grandhotel.com" className="pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Description / About</Label>
                                <Textarea
                                    placeholder="Tell applicants about your establishment, work culture, and what makes you unique..."
                                    className="min-h-[120px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>Location & Hours</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Address / Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <Input id="location" placeholder="123, Main Street, City" className="pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hours">Typical Working Hours</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <Input id="hours" placeholder="e.g. 9:00 AM - 11:00 PM" className="pl-10" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HotelProfile;
