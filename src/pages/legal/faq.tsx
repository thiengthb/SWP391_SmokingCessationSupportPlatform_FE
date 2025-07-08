import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { faqSections } from "@/data/faq";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">{t("faq.title")}</h1>
        <p className="text-muted-foreground text-lg">{t("faq.subtitle")}</p>
      </div>

      {faqSections.map((section, sIndex) => (
        <Card key={sIndex} className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{t(section.titleKey)}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.faqs.map((faq, index) => {
              const isOpen = openIndex === index + sIndex * 100;
              return (
                <div key={index} className="border-b py-4">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index + sIndex * 100)}
                  >
                    <span className="font-medium text-base text-foreground">
                      {t(faq.questionKey)}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-muted-foreground whitespace-pre-line text-sm">
                      {t(faq.answerKey)}
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FAQPage;
