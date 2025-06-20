import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/utils/mockdata/profile';
import { BellIcon, GlobeIcon, ShieldIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';

interface AccountSettingsTabProps {
  profile: UserProfile;
}

export default function AccountSettingsTab({ profile }: AccountSettingsTabProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    dataSharing: true,
    twoFactorAuth: false,
    darkMode: false,
    language: 'english',
  });

  const handleToggle = (field: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    // In a real app, this would be an API call
    console.log('Saved account settings:', settings);
    toast.success('Account settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Basic details about your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Account ID</p>
              <p className="font-medium">{profile.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Account Status</p>
              <div>
                <Badge variant="success" className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Account Type</p>
              <p className="font-medium capitalize">{profile.role}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
              <p className="font-medium">{new Date(profile.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage how you receive notifications and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex flex-col gap-1">
              <span>Email Notifications</span>
              <span className="font-normal text-xs text-muted-foreground">Receive updates via email</span>
            </Label>
            <Switch 
              id="emailNotifications" 
              checked={settings.emailNotifications} 
              onCheckedChange={() => handleToggle('emailNotifications')} 
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications" className="flex flex-col gap-1">
              <span>Push Notifications</span>
              <span className="font-normal text-xs text-muted-foreground">Receive updates via push notifications</span>
            </Label>
            <Switch 
              id="pushNotifications" 
              checked={settings.pushNotifications} 
              onCheckedChange={() => handleToggle('pushNotifications')} 
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="marketingEmails" className="flex flex-col gap-1">
              <span>Marketing Emails</span>
              <span className="font-normal text-xs text-muted-foreground">Receive marketing and promotional emails</span>
            </Label>
            <Switch 
              id="marketingEmails" 
              checked={settings.marketingEmails} 
              onCheckedChange={() => handleToggle('marketingEmails')} 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5" />
            Privacy
          </CardTitle>
          <CardDescription>
            Manage your privacy and data sharing preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dataSharing" className="flex flex-col gap-1">
              <span>Data Sharing</span>
              <span className="font-normal text-xs text-muted-foreground">Share your workout data with coaches</span>
            </Label>
            <Switch 
              id="dataSharing" 
              checked={settings.dataSharing} 
              onCheckedChange={() => handleToggle('dataSharing')} 
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="twoFactorAuth" className="flex flex-col gap-1">
              <span>Two-Factor Authentication</span>
              <span className="font-normal text-xs text-muted-foreground">Add an extra layer of security to your account</span>
            </Label>
            <Switch 
              id="twoFactorAuth" 
              checked={settings.twoFactorAuth} 
              onCheckedChange={() => handleToggle('twoFactorAuth')} 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GlobeIcon className="h-5 w-5" />
            Preferences
          </CardTitle>
          <CardDescription>
            Customize your application experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex flex-col gap-1">
              <span>Dark Mode</span>
              <span className="font-normal text-xs text-muted-foreground">Use dark theme</span>
            </Label>
            <Switch 
              id="darkMode" 
              checked={settings.darkMode} 
              onCheckedChange={() => handleToggle('darkMode')} 
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleSave}>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Actions that cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}