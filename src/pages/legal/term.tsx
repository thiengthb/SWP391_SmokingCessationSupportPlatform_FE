import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Clock, FileText } from "lucide-react";
import { termsSections } from "@/data/terms";
import { useTranslate } from "@/hooks/useTranslate";
import TermsPageSkeleton from "@/components/skeleton/legal/TermsPageSkeleton";
import { useEffect, useState } from "react";
const TermsPage = () => {
  const { tData, tTerms } = useTranslate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <TermsPageSkeleton />;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{tTerms("terms.title")}</h1>
          <p className="text-xl text-muted-foreground mb-4">
            {tTerms("terms.subtitle")}
          </p>
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {tTerms("terms.updated", { date: "July 2025" })}
          </Badge>
        </div>

        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-100">
            <strong>{tTerms("terms.notice.strong")}</strong>{" "}
            {tTerms("terms.notice.content")}
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {termsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>
                      {section.id}. {tData(section.titleKey)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {section.type ? (
                    <Alert className="mb-4">
                      <Icon className="w-4 h-4 text-foreground" />
                      {section.descriptionKey && (
                        <AlertDescription>
                          {tData(section.descriptionKey)}
                        </AlertDescription>
                      )}
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      {section.descriptionKey && (
                        <p className="text-muted-foreground leading-relaxed">
                          {tData(section.descriptionKey)}
                        </p>
                      )}
                      {section.itemKeys && (
                        <div className="space-y-2">
                          {section.itemKeys.map((key, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">
                                {tData(key)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.noteKey && (
                        <>
                          <Separator className="my-4" />
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              <strong>{tTerms("terms.noteLabel")}</strong>{" "}
                              {tData(section.noteKey)}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
