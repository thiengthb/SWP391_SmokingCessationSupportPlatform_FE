import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Clock,
  Mail,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  const sections = [
    {
      id: 1,
      title: "Who is responsible for your information?",
      content: [
        "We are the entity responsible for managing and protecting the personal data you provide while using the smoking cessation support system.",
      ],
    },
    {
      id: 2,
      title: "What information do we collect?",
      content: [
        "2.1. Information you provide directly:",
        "- Full name, email, phone number",
        "- Smoking status, logs, and quit plans",
        "- Feedback and messages within the system",
        "2.2. Information collected automatically:",
        "- Usage behavior (login frequency, language, accessed features)",
      ],
    },
    {
      id: 3,
      title: "Purpose of information use",
      content: [
        "- Support your quit-smoking journey",
        "- Analyze, improve, and personalize the experience",
        "- Send notifications, reminders, or surveys",
      ],
    },
    {
      id: 4,
      title: "Sharing of personal information",
      content: [
        "We do not share your personal information with third parties unless:",
        "- Required by legal authorities",
        "- You provide explicit consent",
        "- Data is anonymized for academic research purposes",
      ],
    },
    {
      id: 5,
      title: "Data retention period",
      content: [
        "Your information will be stored until:",
        "- You delete your account, or",
        "- You request deletion of personal data",
        "We may retain some data as required by law.",
      ],
    },
    {
      id: 6,
      title: "Your rights",
      content: [
        "You have the right to:",
        "- Review your personal data",
        "- Request updates, corrections, or deletion of your information",
        "- Opt out of marketing notifications (if applicable)",
      ],
    },
    {
      id: 7,
      title: "Data security",
      content: [
        "- Data is stored on a secure internal system.",
        "- We use reasonable security measures to prevent unauthorized access, loss, or data breaches.",
      ],
    },
    {
      id: 8,
      title: "Cookies and behavior analytics",
      content: [
        "The system may use cookies to:",
        "- Remember your preferences",
        "- Analyze user behavior to improve the experience",
        "You can disable cookies via browser settings, but some features may not function properly.",
      ],
    },
    {
      id: 9,
      title: "For users under 18",
      content: [
        "The system is not intended for users under 18. If unauthorized use is detected, we may suspend the account and delete related data.",
      ],
    },
    {
      id: 10,
      title: "Policy changes",
      content: [
        "This policy may be adjusted to reflect legal or technical changes. Major changes will be announced directly within the system.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last updated: July 2025
          </Badge>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.id} className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                    <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>
                    {section.id}. {section.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.content.map((line, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 border-0 text-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" />
                Contact Information
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Email</p>
                  <a
                    href="mailto:swp391team@gmail.com"
                    className="font-medium hover:underline"
                  >
                    swp391team@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Address</p>
                  <p className="font-medium text-sm">
                    Lot E2a-7, D1 Street, Hi-Tech Park
                    <br />
                    Long Thanh My Ward, Thu Duc City, Ho Chi Minh City
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
