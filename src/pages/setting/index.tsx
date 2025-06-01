import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";import ProfileForm from "./ProfileForm";
import SecurityForm from "./SecurityForm";
import { PreferencesForm } from "./PreferencesForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6 py-10 px-2 sm:px-5 lg:px-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your preferences and application settings.
        </p>
      </div>
      <Separator />
      <Tabs defaultValue="preferences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="preferences" className="space-y-4">
          <PreferencesForm />
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <SecurityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
