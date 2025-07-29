import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { teamMembers } from "../../../data/aboutUs.info";
import { useTranslate } from "@/hooks/useTranslate";
import { Paths } from "@/constants/path";
import { UserRound } from "lucide-react";

export default function TeamPage() {
  const { tData, tAboutus } = useTranslate();
  return (
    <div className="container max-w-3xl lg:max-w-6xl mx-auto px-4 py-6 lg:py-10">
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {tAboutus("aboutus.team.title")}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {tAboutus("aboutus.team.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={tData(member.name)} />
                    <AvatarFallback>
                      <UserRound />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-bold">
                    {tData(member.name)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">
                    {tData(member.role)}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {tData(member.description)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              {tAboutus("aboutus.team.getInTouchTitle")}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              {tAboutus("aboutus.team.getInTouchDescription")}
            </p>
          </div>

          <div className="text-center pt-6">
            <Button asChild size="lg">
              <a href={Paths.PUBLIC.CONTACT}>
                {tAboutus("aboutus.team.buttonContact")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
