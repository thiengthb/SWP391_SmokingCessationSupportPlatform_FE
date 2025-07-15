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
import { useState, useEffect } from "react";
import { Gender } from "@/types/models/member";
import { toCapitalizedWords } from "@/utils/stringFormatUtils";
import { useProfile } from "@/contexts/ProfileContext";
import { useTranslate } from "@/hooks/useTranslate";
export default function PersonalInfoTab() {
  const [isEditing, setIsEditing] = useState(false);
  const { memberProfile, handleUpdateMemberProfile } = useProfile();
  const { tProfile } = useTranslate();
  console.log("Member Profile:", memberProfile);

  const [formState, setFormState] = useState({
    fullName: memberProfile?.fullName || "",
    email: memberProfile?.email || "",
    phoneNumber: memberProfile?.phoneNumber || "",
    address: memberProfile?.address || "",
    dob: memberProfile?.dob || "",
    gender: memberProfile?.gender || "",
    bio: memberProfile?.bio || "",
  });

  useEffect(() => {
    if (memberProfile) {
      setFormState({
        fullName: memberProfile.fullName || "",
        email: memberProfile.email || "",
        phoneNumber: memberProfile.phoneNumber || "",
        address: memberProfile.address || "",
        dob: memberProfile.dob || "",
        gender: memberProfile.gender || "",
        bio: memberProfile.bio || "",
      });
    }
  }, [memberProfile]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateMemberProfile({
      fullName: formState.fullName,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
      address: formState.address,
      dob: new Date(formState.dob),
      gender: formState.gender,
      bio: formState.bio,
    });
    setIsEditing(false);
  };

  const listTags = [
    {
      name: tProfile("profile.personalinfo.fullname"),
      icon: UserIcon,
      value: formState.fullName || "...",
    },
    {
      name: tProfile("profile.personalinfo.email"),
      icon: MailIcon,
      value: formState.email || "...",
    },
    {
      name: tProfile("profile.personalinfo.phone"),
      icon: PhoneIcon,
      value: formState.phoneNumber || "...",
    },
    {
      name: tProfile("profile.personalinfo.dob"),
      icon: CalendarIcon,
      value: formState.dob
        ? new Date(formState.dob).toLocaleDateString()
        : "...",
    },
    {
      name: tProfile("profile.personalinfo.gender.label"),
      icon: VenusAndMars,
      value: formState.gender ? toCapitalizedWords(formState.gender) : "...",
    },
    {
      name: tProfile("profile.personalinfo.address"),
      icon: MapPinIcon,
      value: formState.address || "...",
    },
  ];

  if (!memberProfile) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">
            {tProfile("profile.personalinfo.loading")}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{tProfile("profile.personalinfo.title")}</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            {tProfile("profile.personalinfo.edit")}
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
                    {tProfile("profile.personalinfo.bio.label")}
                  </div>
                </div>
                <div className="ml-6">
                  {formState.bio || tProfile("profile.personalinfo.bio.empty")}
                </div>
              </div>
            </>
          ) : (
            // Edit mode
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {" "}
                    {tProfile("profile.personalinfo.fullname")}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formState.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {" "}
                    {tProfile("profile.personalinfo.email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">
                    {tProfile("profile.personalinfo.phone")}
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">
                    {tProfile("profile.personalinfo.dob")}
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formState.dob.toString()}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">
                    {tProfile("profile.personalinfo.gender.label")}
                  </Label>
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
                      <SelectItem value={Gender.MALE}>
                        {tProfile("profile.personalinfo.gender.male")}
                      </SelectItem>
                      <SelectItem value={Gender.FEMALE}>
                        {tProfile("profile.personalinfo.gender.female")}
                      </SelectItem>
                      <SelectItem value={Gender.OTHER}>
                        {tProfile("profile.personalinfo.gender.other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    {" "}
                    {tProfile("profile.personalinfo.address")}
                  </Label>
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
                <Label htmlFor="bio">
                  {" "}
                  {tProfile("profile.personalinfo.bio.label")}
                </Label>
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
          <CardFooter className="flex mt-4 justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              {tProfile("profile.personalinfo.cancel")}
            </Button>
            <Button type="submit">
              {" "}
              {tProfile("profile.personalinfo.save")}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
