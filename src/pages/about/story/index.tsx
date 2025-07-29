import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { milestones } from "../../../data/aboutUs.info";
import { useTranslate } from "@/hooks/useTranslate";
import { Paths } from "@/constants/path";

export default function StoryPage() {
  const { tAboutus, tData } = useTranslate();
  return (
    <div className="container max-w-6xl mx-auto py-6 lg:py-10">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {tAboutus("aboutus.story.title")}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {tAboutus("aboutus.story.subtitle")}
          </p>
        </div>

        <Card className="border-none shadow-none">
          <CardContent className="grid gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {tAboutus("aboutus.story.missionTitle")}
              </h2>
              <p className="text-muted-foreground">
                {tAboutus("aboutus.story.missionDescription")}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {tAboutus("aboutus.story.goalsTitle")}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {milestones.map((milestone) => (
                  <Card key={milestone.year}>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-semibold mb-2">
                        {tData(milestone.title)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tData(milestone.description)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {tAboutus("aboutus.story.joinTitle")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {tAboutus("aboutus.story.joinDescription")}
              </p>
              <Button size="lg" asChild>
                <a href={Paths.AUTH.REGISTER}>
                  {tAboutus("aboutus.story.buttonGetStarted")}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
