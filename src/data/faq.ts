export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface FAQSection {
  titleKey: string;
  faqs: FAQItem[];
}

export const faqSections: FAQSection[] = [
  {
    titleKey: "data.faq.1.title",
    faqs: [
      { questionKey: "data.faq.1.1.q", answerKey: "data.faq.1.1.a" },
      { questionKey: "data.faq.1.2.q", answerKey: "data.faq.1.2.a" },
      { questionKey: "data.faq.1.3.q", answerKey: "data.faq.1.3.a" },
      { questionKey: "data.faq.1.4.q", answerKey: "data.faq.1.4.a" },
      { questionKey: "data.faq.1.5.q", answerKey: "data.faq.1.5.a" },
      { questionKey: "data.faq.1.6.q", answerKey: "data.faq.1.6.a" },
      { questionKey: "data.faq.1.7.q", answerKey: "data.faq.1.7.a" },
      { questionKey: "data.faq.1.8.q", answerKey: "data.faq.1.8.a" },
      { questionKey: "data.faq.1.9.q", answerKey: "data.faq.1.9.a" },
      { questionKey: "data.faq.1.10.q", answerKey: "data.faq.1.10.a" },
      { questionKey: "data.faq.1.11.q", answerKey: "data.faq.1.11.a" },
      { questionKey: "data.faq.1.12.q", answerKey: "data.faq.1.12.a" },
      { questionKey: "data.faq.1.13.q", answerKey: "data.faq.1.13.a" },
      { questionKey: "data.faq.1.14.q", answerKey: "data.faq.1.14.a" },
      { questionKey: "data.faq.1.15.q", answerKey: "data.faq.1.15.a" },
      { questionKey: "data.faq.1.16.q", answerKey: "data.faq.1.16.a" }
    ]
  },
  {
    titleKey: "data.faq.2.title",
    faqs: [
      { questionKey: "data.faq.2.1.q", answerKey: "data.faq.2.1.a" },
      { questionKey: "data.faq.2.2.q", answerKey: "data.faq.2.2.a" },
      { questionKey: "data.faq.2.3.q", answerKey: "data.faq.2.3.a" },
      { questionKey: "data.faq.2.4.q", answerKey: "data.faq.2.4.a" },
      { questionKey: "data.faq.2.5.q", answerKey: "data.faq.2.5.a" }
    ]
  },
  {
    titleKey: "data.faq.3.title",
    faqs: [
      { questionKey: "data.faq.3.1.q", answerKey: "data.faq.3.1.a" },
      { questionKey: "data.faq.3.2.q", answerKey: "data.faq.3.2.a" }
    ]
  },
  {
    titleKey: "data.faq.4.title",
    faqs: [
      { questionKey: "data.faq.4.1.q", answerKey: "data.faq.4.1.a" },
      { questionKey: "data.faq.4.2.q", answerKey: "data.faq.4.2.a" }
    ]
  },
  {
    titleKey: "data.faq.5.title",
    faqs: [
      { questionKey: "data.faq.5.1.q", answerKey: "data.faq.5.1.a" }
    ]
  }
];
