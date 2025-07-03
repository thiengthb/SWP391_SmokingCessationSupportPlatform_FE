import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfoTab from "./components/PersonalInfoTab";
import MembershipTab from "./components/MembershipTab";
import FitnessStatsTab from "./components/FitnessStatsTab";
import useApi from "@/hooks/useApi";
import {
  defaultMemberProfile,
  type MemberProfile,
} from "@/types/models/member";

export default function ProfilePage() {
  const [profile, setProfile] = useState<MemberProfile>(defaultMemberProfile);
  const [isLoading, setIsLoading] = useState(true);

  const apiWithInterceptor = useApi();

  useEffect(() => {
    try {
      const fetchProfileData = async () => {
        setIsLoading(true);
        const response = await apiWithInterceptor.get("/v1/members/my-profile");
        console.log("Fetched profile data:", response.data.result);
        setProfile(response.data.result);
      };
      fetchProfileData();
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      setProfile(defaultMemberProfile);
    } finally {
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
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="fitness">Fitness Stats</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">
          <PersonalInfoTab profile={profile} />
        </TabsContent>

        <TabsContent value="membership">
          <MembershipTab profile={profile} />
        </TabsContent>

        <TabsContent value="fitness">
          <FitnessStatsTab profile={profile} />
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                  Password management and two-factor authentication options will
                  go here.
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
