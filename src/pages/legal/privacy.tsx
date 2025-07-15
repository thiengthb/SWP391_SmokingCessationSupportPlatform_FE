import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, FileText, CheckCircle } from "lucide-react";
import { privacySections } from "@/data/privacy";
import { useTranslate } from "@/hooks/useTranslate";
import { useEffect, useState } from "react";
import PrivacyPolicySkeleton from "@/components/skeleton/legal/PrivacyPolicySkeleton";
const PrivacyPolicyPage = () => {
  const { tPrivacy, tData } = useTranslate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PrivacyPolicySkeleton />;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            {tPrivacy("privacy.title")}
          </h1>
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {tPrivacy("privacy.updated", { date: "July 2025" })}
          </Badge>
        </div>

        <div className="space-y-6">
          {privacySections.map((section) => (
            <Card key={section.id} className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                    <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>
                    {section.id}. {tData(section.titleKey)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.contentKeys.map((key, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {tData(key)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
