import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  AlertTriangle,
  Phone,
  Shield,
  FileText,
  Users,
  Settings,
  Scale,
  UserX,
  Clock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TermsPage = () => {
  const sections = [
    {
      id: 1,
      title: "Scope of Application",
      icon: (
        <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      ),
      content: {
        description:
          "These terms apply to the use of the smoking cessation support system, including the following features:",
        items: [
          "Create a quit smoking plan",
          "Track progress and health statistics",
          "Schedule coaching sessions",
          "Daily smoking diary",
          "Receive notifications and rewards",
        ],
        note: "The system is intended for personal and educational purposes only, not for commercial or professional medical use.",
      },
    },
    {
      id: 2,
      title: "Not a Medical Service",
      icon: (
        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      ),
      type: "warning",
      content: {
        description:
          "The system does not provide medical diagnosis or treatment. All content is for reference only. If you need medical support, consult a doctor or professional healthcare provider.",
      },
    },
    {
      id: 3,
      title: "Not for Emergency Use",
      icon: <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />,
      type: "danger",
      content: {
        description:
          "If you are experiencing a serious or emergency health issue, do not use this system. Instead, contact the nearest medical center or call 115 immediately.",
      },
    },
    {
      id: 4,
      title: "User Accounts",
      icon: (
        <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      ),
      content: {
        items: [
          "Users must be at least 18 years old to create an account.",
          "You are responsible for securing your account and password.",
          "Do not share your account with others.",
          "If unauthorized access is detected, notify the development team immediately.",
        ],
      },
    },
    {
      id: 5,
      title: "Privacy Policy",
      icon: <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      type: "info",
      content: {
        description:
          "We are committed to protecting your personal information. Data you provide (name, email, phone number, smoking habits...) is used solely to support your quit-smoking journey. We do not share data with third parties.",
      },
    },
    {
      id: 6,
      title: "Intellectual Property Rights",
      icon: <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      content: {
        description:
          "All content, design, and source code of the system belong to the development team. You may not copy, reuse, or modify the system without permission.",
      },
    },
    {
      id: 7,
      title: "System Content Changes",
      icon: (
        <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
      ),
      content: {
        description:
          "The system may update or change features at any time to improve the learning experience and user support. Changes will be publicly announced if necessary.",
      },
    },
    {
      id: 8,
      title: "Limitation of Liability",
      icon: (
        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      ),
      content: {
        description:
          'The system is provided "as-is." The development team is not liable for any risks arising from misuse or misunderstanding of content.',
      },
    },
    {
      id: 9,
      title: "Account Suspension or Termination",
      icon: <UserX className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      content: {
        description:
          "We reserve the right to suspend or delete user accounts if any of the following are detected:",
        items: [
          "Violation of rules or laws",
          "Intentional system disruption",
          "Using the system for improper purposes",
        ],
      },
    },
    {
      id: 10,
      title: "Governing Law",
      icon: <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      content: {
        description:
          "These terms are governed by the laws of the Socialist Republic of Vietnam. For questions or concerns, please contact the development team via email or internal support channels.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-xl text-muted-foreground mb-4">User Agreement</p>
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last updated: July 2025
          </Badge>
        </div>

        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-100">
            <strong>Important Notice:</strong> Please read these terms carefully
            before using the system. By accessing and using the service, you
            agree to the entire content of this Terms of Service.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.id} className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                    {section.icon}
                  </div>
                  <span>
                    {section.id}. {section.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.type && (
                  <Alert className="mb-4">
                    {section.icon}
                    <AlertDescription>
                      {section.content.description}
                    </AlertDescription>
                  </Alert>
                )}
                {!section.type && (
                  <div className="space-y-4">
                    {section.content.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content.description}
                      </p>
                    )}
                    {section.content.items && (
                      <div className="space-y-2">
                        {section.content.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.content.note && (
                      <>
                        <Separator className="my-4" />
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Note:</strong> {section.content.note}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
