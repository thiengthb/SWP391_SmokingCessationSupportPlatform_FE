import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import MembershipTab from "./tabs/MembershipTab";
import { useProfile } from "@/contexts/ProfileContext";
import HealthReportsTab from "./tabs/HealthReportsTab";
import { useTranslate } from "@/hooks/useTranslate";

export default function ProfilePage() {
  const { memberProfile } = useProfile();
  const { tProfile } = useTranslate();
  if (!memberProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            {tProfile("profile.notFound.title")}
          </h2>
          <p className="text-muted-foreground">
            {tProfile("profile.notFound.description")}
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
          <TabsTrigger value="personal-info">
            {tProfile("profile.tabs.personal")}
          </TabsTrigger>
          <TabsTrigger value="membership">
            {tProfile("profile.tabs.membership")}
          </TabsTrigger>
          <TabsTrigger value="health">
            {tProfile("profile.tabs.health")}
          </TabsTrigger>
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
