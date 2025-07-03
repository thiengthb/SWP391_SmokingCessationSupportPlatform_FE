import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  VenusAndMars,
  UserRoundPen,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Gender, type MemberProfile } from "@/types/models/member";
import { toCapitalizedWords } from "@/utils/stringFormatUtils";

interface PersonalInfoTabProps {
  profile: MemberProfile;
}

export default function PersonalInfoTab({ profile }: PersonalInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    address: profile.address,
    dob: profile.dob || "",
    gender: profile.gender,
    bio: profile.bio,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Updated profile:", formState);
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const listTags = [
    {
      name: "Full Name",
      icon: UserIcon,
      value: formState.fullName || "...",
    },
    { name: "Email Address", icon: MailIcon, value: formState.email || "..." },
    {
      name: "Phone Number",
      icon: PhoneIcon,
      value: formState.phoneNumber || "...",
    },
    {
      name: "Date of Birth",
      icon: CalendarIcon,
      value: new Date(formState.dob).toLocaleDateString(),
    },
    {
      name: "Gender",
      icon: VenusAndMars,
      value: toCapitalizedWords(formState.gender),
    },
    { name: "Address", icon: MapPinIcon, value: formState.address || "..." },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Details
          </Button>
        ) : null}
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listTags.map((tag) => (
                  <div key={tag.name} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <tag.icon className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm font-medium text-muted-foreground">
                        {tag.name}
                      </div>
                    </div>
                    <div className="ml-6">{tag.value}</div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <UserRoundPen className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-medium text-muted-foreground">
                    Bio
                  </div>
                </div>
                <div className="ml-6">
                  {profile.bio || "No bio description."}
                </div>
              </div>
            </>
          ) : (
            // Edit mode
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formState.dob.toString()}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formState.gender}
                    onValueChange={(value) =>
                      handleSelectChange(value, "gender")
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                      <SelectItem value={Gender.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formState.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </>
          )}
        </CardContent>

        {isEditing && (
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
