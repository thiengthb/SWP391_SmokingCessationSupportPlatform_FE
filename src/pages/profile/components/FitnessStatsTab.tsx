import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type UserProfile } from '@/utils/mockdata/profile';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { BarChart3, Target, TrendingUp, Edit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FitnessStatsTabProps {
  profile: UserProfile;
}

export default function FitnessStatsTab({ profile }: FitnessStatsTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    height: profile.fitnessStats?.height || 0,
    weight: profile.fitnessStats?.weight || 0,
    bodyFat: profile.fitnessStats?.bodyFat || 0,
    goals: profile.fitnessStats?.goals || [],
    preferences: profile.fitnessStats?.preferences || [],
  });

  const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStats((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log('Updated fitness stats:', stats);
    toast.success('Fitness stats updated successfully');
    setIsEditing(false);
  };

  const calculateBMI = (height: number, weight: number) => {
    if (!height || !weight) return 0;
    // BMI = weight(kg) / (height(m))²
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'bg-blue-100 text-blue-800' };
    if (bmi < 25) return { label: 'Normal', color: 'bg-green-100 text-green-800' };
    if (bmi < 30) return { label: 'Overweight', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Obese', color: 'bg-red-100 text-red-800' };
  };

  // Mock data for fitness progress
  const fitnessProgress = [
    { name: 'Strength', progress: 85 },
    { name: 'Endurance', progress: 60 },
    { name: 'Flexibility', progress: 40 },
    { name: 'Speed', progress: 70 },
  ];

  if (!profile.fitnessStats) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p>No fitness statistics available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const bmi = calculateBMI(stats.height, stats.weight);
  const bmiStatus = getBMIStatus(Number(bmi));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Body Metrics</CardTitle>
            <CardDescription>Your physical measurements and statistics</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Update Metrics
            </Button>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {!isEditing ? (
              // View mode
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Height</span>
                  <span className="text-2xl font-bold">{profile.fitnessStats.height} cm</span>
                </div>
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Weight</span>
                  <span className="text-2xl font-bold">{profile.fitnessStats.weight} kg</span>
                </div>
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Body Fat</span>
                  <span className="text-2xl font-bold">{profile.fitnessStats.bodyFat}%</span>
                </div>
              </div>
            ) : (
              // Edit mode
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={stats.height}
                    onChange={handleStatChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={stats.weight}
                    onChange={handleStatChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">Body Fat (%)</Label>
                  <Input
                    id="bodyFat"
                    name="bodyFat"
                    type="number"
                    value={stats.bodyFat}
                    onChange={handleStatChange}
                    step="0.1"
                  />
                </div>
              </div>
            )}

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">BMI (Body Mass Index)</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your height and weight
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{bmi}</span>
                <Badge className={bmiStatus.color}>
                  {bmiStatus.label}
                </Badge>
              </div>
            </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <CardTitle>Fitness Goals</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.fitnessStats.goals?.map((goal, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1.5">
                  {goal}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Edit Goals</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <CardTitle>Workout Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.fitnessStats.preferences?.map((preference, index) => (
                <Badge key={index} variant="outline" className="text-sm py-1.5">
                  {preference}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Edit Preferences</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Fitness Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {fitnessProgress.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button>View Detailed Reports</Button>
        </CardFooter>
      </Card>
    </div>
  );
}