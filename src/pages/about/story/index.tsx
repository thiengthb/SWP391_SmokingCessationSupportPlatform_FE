import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { milestones } from "./milestones";

export default function StoryPage() {
  return (
    <div className="container max-w-6xl mx-auto py-6 lg:py-10">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The journey of creating a smoke-free future
          </p>
        </div>

        <Card className="border-none shadow-none">
          <CardContent className="grid gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                We're committed to helping people break free from smoking addiction through innovative technology,
                supportive community, and evidence-based approaches.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Goals</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {milestones.map((milestone) => (
                  <Card key={milestone.year}>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold mb-2">{milestone.year}</div>
                      <h3 className="font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Join Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Be part of our journey in creating a healthier world. Together, we can help more people
                quit smoking and live healthier lives.
              </p>
              <Button size="lg" asChild>
                <a href="/auth/register">Get Started Today</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
