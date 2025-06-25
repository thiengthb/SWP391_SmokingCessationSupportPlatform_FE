import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMockProfile } from "@/utils/mockdata/profile";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfoTab from "./components/PersonalInfoTab";
import AccountSettingsTab from "./components/AccountSettingsTab";
import MembershipTab from "./components/MembershipTab";
import FitnessStatsTab from "./components/FitnessStatsTab";
import CoachDetailsTab from "./components/CoachDetailsTab";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For development, we're using mock data
    try {
      const mockProfile = getMockProfile("member");
      setProfile(mockProfile);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground">
            We couldn't load your profile information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <ProfileHeader profile={profile} />

      <Tabs defaultValue="personal-info" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>

          {profile.role === "member" && (
            <>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="fitness">Fitness Stats</TabsTrigger>
            </>
          )}

          {profile.role === "coach" && (
            <TabsTrigger value="coach-details">Coach Details</TabsTrigger>
          )}

          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">
          <PersonalInfoTab profile={profile} />
        </TabsContent>

        <TabsContent value="account">
          <AccountSettingsTab profile={profile} />
        </TabsContent>

        {profile.role === "member" && (
          <>
            <TabsContent value="membership">
              <MembershipTab profile={profile} />
            </TabsContent>

            <TabsContent value="fitness">
              <FitnessStatsTab profile={profile} />
            </TabsContent>
          </>
        )}

        {profile.role === "coach" && (
          <TabsContent value="coach-details">
            <CoachDetailsTab profile={profile} />
          </TabsContent>
        )}

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                  Password management and two-factor authentication options will go
                  here.
                </p>
                <Separator />
                <p className="text-sm">This section is under development.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
