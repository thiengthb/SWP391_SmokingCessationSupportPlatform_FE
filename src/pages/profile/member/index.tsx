import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import MembershipTab from "./tabs/MembershipTab";
import { useProfile } from "@/contexts/ProfileContext";
import HealthReportsTab from "./tabs/HealthReportsTab";

export default function ProfilePage() {
  const { memberProfile } = useProfile();

  if (!memberProfile) {
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
      <ProfileHeader />

      <Tabs defaultValue="personal-info" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">
          <PersonalInfoTab />
        </TabsContent>

        <TabsContent value="membership">
          <MembershipTab />
        </TabsContent>

        <TabsContent value="health">
          <HealthReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
