import React from 'react';
import { Send, Sparkles, MapPin, IndianRupee, Clock, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const PostJob = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Post a New Job</h1>
                    <p className="text-slate-500 mt-1">Create a job listing to find the best staff for your establishment.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-100 shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-base font-semibold">Job Title</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input placeholder="e.g. Senior Chef, Waiter, Housekeeping Staff" className="pl-10 h-11" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Salary Range / Month</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input placeholder="e.g. 15,000 - 25,000" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Openings</Label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input type="number" placeholder="1" className="pl-10" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Experience Required</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select experience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fresher">Fresher</SelectItem>
                                            <SelectItem value="0-1">0 - 1 Years</SelectItem>
                                            <SelectItem value="1-3">1 - 3 Years</SelectItem>
                                            <SelectItem value="3-5">3 - 5 Years</SelectItem>
                                            <SelectItem value="5+">5+ Years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Shift Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select shift" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full-time">Full Time</SelectItem>
                                            <SelectItem value="part-time">Part Time</SelectItem>
                                            <SelectItem value="night-shift">Night Shift</SelectItem>
                                            <SelectItem value="weekend">Weekend Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Job Description</Label>
                                <Textarea
                                    placeholder="Describe the roles and responsibilities..."
                                    className="min-h-[150px] resize-none"
                                />
                                <p className="text-xs text-slate-500 text-right">0/500 characters</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input placeholder="Same as profile location" className="pl-10" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Tips */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0 shadow-lg">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="text-yellow-300" />
                                    <h3 className="font-bold text-lg">AI Smart Match</h3>
                                </div>
                                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                                    Our AI will automatically match this job with candidates who have relevant experience and skills.
                                </p>
                                <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                    <span className="text-sm font-medium">Enable AI Matching</span>
                                    <Switch defaultChecked id="ai-mode" className="data-[state=checked]:bg-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-100 shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-slate-800 mb-3">Posting Tips</h3>
                            <ul className="text-sm text-slate-500 space-y-2 list-disc pl-4">
                                <li>Be specific about the shift timings.</li>
                                <li>Mention any extra perks (e.g. food included).</li>
                                <li>Competitive salaries attract 2x more applicants.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Button className="w-full h-12 text-lg bg-slate-900 hover:bg-slate-800 shadow-xl transition-all">
                        Post Job Now <Send className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
