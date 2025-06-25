import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { type UserProfile } from '@/utils/mockdata/profile';
import { 
  CalendarIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  UserIcon 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import { toast } from 'sonner';

interface PersonalInfoTabProps {
  profile: UserProfile;
}

export default function PersonalInfoTab({ profile }: PersonalInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: profile.name,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    address: profile.address,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    bio: profile.bio,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    console.log('Updated profile:', formState);
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

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
            // View mode
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Full Name
                  </div>
                  <div className="font-medium">{profile.name}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <MailIcon className="w-4 h-4 mr-2" />
                    Email Address
                  </div>
                  <div className="font-medium">{profile.email}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Phone Number
                  </div>
                  <div className="font-medium">{profile.phoneNumber}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Date of Birth
                  </div>
                  <div className="font-medium">{new Date(profile.dateOfBirth).toLocaleDateString()}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Gender</div>
                  <div className="font-medium capitalize">{profile.gender}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    Address
                  </div>
                  <div className="font-medium">{profile.address}</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Bio</div>
                <div>{profile.bio}</div>
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
                    value={formState.name}
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
                    value={formState.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={formState.gender} 
                    onValueChange={(value) => handleSelectChange(value, 'gender')}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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