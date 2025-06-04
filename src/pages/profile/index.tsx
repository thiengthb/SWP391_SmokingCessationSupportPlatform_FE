import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { ProfileFormData } from "@/types/profile";

export default function ProfilePage() {
  const { userInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username || "",
        email: userInfo.email || "",
        bio: userInfo.bio || "",
        location: userInfo.location || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to update profile
      // await api.put('/api/profile', formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="container max-w-3xl py-6 lg:py-10">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your public profile and preferences
            </p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        <Separator />

        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userInfo?.avatar} />
              <AvatarFallback className="text-lg">
                {userInfo?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            {isEditing && <Button variant="outline">Change Avatar</Button>}
          </div>

          {/* Form Section */}
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <Button
                onClick={handleSave}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
