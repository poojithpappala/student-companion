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

export default function SettingsPage() {
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
            <Select defaultValue="during">
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
            <Select defaultValue="3">
              <SelectTrigger id="year" className="w-full">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">Final Year</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Only applicable for the 'During Undergrad' stage.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
