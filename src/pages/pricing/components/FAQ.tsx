import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslate } from "@/hooks/useTranslate";
import { type FAQItem } from "@/types/models/membership";

interface FAQProps {
  faqs: FAQItem[];
}

export function FAQ({ faqs }: FAQProps) {
  const { tData, tPricing } = useTranslate();
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">{tPricing("pricing.faq.title")}</h2>
        <p className="text-muted-foreground">
          {tPricing("pricing.faq.description")}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {tData(faq.question)}
              </AccordionTrigger>
              <AccordionContent>{tData(faq.answer)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
