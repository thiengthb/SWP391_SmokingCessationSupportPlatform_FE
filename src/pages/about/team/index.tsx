import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { teamMembers } from "../../../data/about-us.info";
import { useTranslation } from "react-i18next";

export default function TeamPage() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  const { t } = useTranslation();
  return (
    <div className="container max-w-3xl lg:max-w-6xl mx-auto px-4 py-6 lg:py-10">
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("page.team.title")}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {t("page.team.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-bold">
                    {member.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {member.description}
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
              {t("page.team.getInTouchTitle")}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              {t("page.team.getInTouchDescription")}
            </p>
          </div>

          <div className="text-center pt-6">
            <Button asChild size="lg">
              <a href="/contact">{t("page.team.buttonContact")}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
