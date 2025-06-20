import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/utils/mockdata/profile';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  Calendar,
  Clock,
  Users,
  Star,
  Edit
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';

interface CoachDetailsTabProps {
  profile: UserProfile;
}

export default function CoachDetailsTab({ profile }: CoachDetailsTabProps) {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  const handleUpdateInfo = () => {
    toast.success('Coach information updated successfully');
    setIsEditingInfo(false);
  };

  const handleUpdateSchedule = () => {
    toast.success('Schedule updated successfully');
    setIsEditingSchedule(false);
  };

  // Mock data
  const recentClients = [
    { id: 1, name: 'John Doe', sessions: 12, nextSession: '2023-06-25' },
    { id: 2, name: 'Jane Smith', sessions: 8, nextSession: '2023-06-26' },
    { id: 3, name: 'Alex Johnson', sessions: 15, nextSession: '2023-06-27' },
  ];

  if (!profile.coachDetails) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p>No coach details available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Coach Information</CardTitle>
            <CardDescription>Professional details and qualifications</CardDescription>
          </div>
          {!isEditingInfo && (
            <Button variant="outline" onClick={() => setIsEditingInfo(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Info
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Specialties
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.coachDetails.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Certifications</h3>
                <ul className="mt-2 space-y-1">
                  {profile.coachDetails.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Experience
                </h3>
                <p className="mt-1 text-lg">{profile.coachDetails.experience} years</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Rating
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(profile.coachDetails.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{profile.coachDetails.rating}</span>
                  <span className="text-sm text-muted-foreground">({profile.coachDetails.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        {isEditingInfo && (
          <CardFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditingInfo(false)}>Cancel</Button>
              <Button onClick={handleUpdateInfo}>Save Changes</Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Availability Schedule
            </CardTitle>
            <CardDescription>Your weekly coaching hours</CardDescription>
          </div>
          {!isEditingSchedule && (
            <Button variant="outline" onClick={() => setIsEditingSchedule(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Schedule
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weekdays.map((day) => (
              <Card key={day}>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium capitalize">{day}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  {profile.coachDetails?.availability[day as keyof typeof profile.coachDetails.availability]?.length ? (
                    profile.coachDetails.availability[day as keyof typeof profile.coachDetails.availability].map((time, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {time}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Not available</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        {isEditingSchedule && (
          <CardFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditingSchedule(false)}>Cancel</Button>
              <Button onClick={handleUpdateSchedule}>Save Schedule</Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Clients
          </CardTitle>
          <CardDescription>Members you're currently coaching</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Completed Sessions</TableHead>
                <TableHead>Next Session</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.sessions}</TableCell>
                  <TableCell>{new Date(client.nextSession).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline">View All Clients</Button>
        </CardFooter>
      </Card>
    </div>
  );
}