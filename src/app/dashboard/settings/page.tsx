"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

type UserSettings = {
    stage?: 'before' | 'during' | 'after';
    year?: '1st Year' | '2nd Year' | '3rd Year' | 'Final Year';
}

export default function SettingsPage() {
    const { toast } = useToast();
    const [settings, setSettings] = useState<UserSettings>({ stage: 'during', year: '2nd Year' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Mock save operation
        setTimeout(() => {
            toast({
                title: 'Settings saved (mock)',
                description: 'This is a demo. Settings are not persisted.',
            });
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Account Settings</CardTitle>
                    <CardDescription>Manage your profile and application preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="stage">Your Current Stage</Label>
                        <Select value={settings.stage} onValueChange={(value) => setSettings(s => ({ ...s, stage: value as UserSettings['stage'] }))}>
                            <SelectTrigger id="stage" className="w-full">
                                <SelectValue placeholder="Select your stage" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="before">Before Undergrad</SelectItem>
                                <SelectItem value="during">During Undergrad</SelectItem>
                                <SelectItem value="after">After Undergrad</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Changing this will update your dashboard experience.
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="year">Your Current Year (if applicable)</Label>
                        <Select 
                            value={settings.year} 
                            onValueChange={(value) => setSettings(s => ({ ...s, year: value as UserSettings['year'] }))} 
                            disabled={settings.stage !== 'during'}
                        >
                            <SelectTrigger id="year" className="w-full">
                                <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1st Year">1st Year</SelectItem>
                                <SelectItem value="2nd Year">2nd Year</SelectItem>
                                <SelectItem value="3rd Year">3rd Year</SelectItem>
                                <SelectItem value="Final Year">Final Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Only applicable for the 'During Undergrad' stage.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
