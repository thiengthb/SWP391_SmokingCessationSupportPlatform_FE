import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";

export default function ProfileHeader() {
  const { auth } = useAuth();
  const { memberProfile } = useProfile();

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <CardContent className="relative pt-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-12 md:-mt-16">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage
                src={memberProfile?.avatar}
                alt={memberProfile?.username}
              />
              <AvatarFallback className="text-2xl">
                {memberProfile?.username}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 items-center md:items-start mt-2 md:mt-0 md:mb-2">
              <div className="flex flex-col gap-2 md:flex-row items-center mb-2">
                <h1 className="text-2xl font-bold">
                  {memberProfile?.username}
                </h1>
                <Badge>
                  {auth.currentAcc?.havingSubscription ? "Premium" : "Free"}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {memberProfile?.bio || "No bio description."}
              </p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>
                    Joined{" "}
                    {new Date(memberProfile?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{memberProfile?.address || "No address recorded"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
          {Object.entries({}).map(([platform]) => (
            <a
              key={platform}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors"
            >
              <span className="capitalize">{platform}</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
