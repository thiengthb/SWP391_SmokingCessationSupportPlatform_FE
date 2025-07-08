import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqSections = [
  {
    title: "1. About the quitting process",
    faqs: [
      {
        question: "1.1. What is the S.T.A.R method?",
        answer:
          "This is a four-step quit-smoking planning method:\n\nSet a quit date\n\nTell others\n\nAnticipate challenges\n\nRemove tobacco"
      },
      {
        question: "1.2. How addicted am I to nicotine?",
        answer:
          "You can self-assess by looking at how often you smoke, how soon after waking you smoke, and how uncomfortable you feel without smoking."
      },
      {
        question: "1.3. Can I smoke just one last cigarette?",
        answer:
          "No! 'Just one' often becomes an excuse that leads to relapse and going back to the old habit."
      },
      {
        question: "1.4. What is the 'cold turkey' method?",
        answer:
          "It means quitting completely and immediately without any aids. It works for some people but can be very stressful."
      },
      {
        question: "1.5. What are the health benefits of quitting?",
        answer:
          "After just 20 minutes, your blood pressure drops. After 2–3 weeks, blood circulation improves. After a few months, the risks of heart and lung diseases significantly decrease."
      },
      {
        question: "1.6. How can I get through the first smoke-free day?",
        answer:
          "Avoid triggers, keep your hands and mouth busy (chew gum, drink water), and remind yourself why you're quitting."
      },
      {
        question: "1.7. I'm very irritable and anxious when quitting – what should I do?",
        answer:
          "Practice deep breathing, light meditation, exercise, or talk to a friend, loved one, coach, or support group."
      },
      {
        question: "1.8. What should I do during smoke breaks at work?",
        answer:
          "You can take a walk, listen to music, drink water, eat fruit, or use nicotine gum as a substitute."
      },
      {
        question: "1.9. Are nicotine patches effective?",
        answer:
          "Yes. They help reduce withdrawal symptoms by delivering nicotine slowly and steadily."
      },
      {
        question: "1.10. Are nicotine gums helpful?",
        answer:
          "Yes, they can be used throughout the day. But use the correct dose and timing to avoid dependency."
      },
      {
        question: "1.11. Should I use e-cigarettes to quit?",
        answer:
          "Not recommended. E-cigarettes still contain nicotine and may lead to relapse."
      },
      {
        question: "1.12. Does acupuncture help with quitting?",
        answer:
          "Some people find it helpful, but there's no solid scientific proof of its long-term effectiveness."
      },
      {
        question: "1.13. Is hypnosis effective?",
        answer:
          "It depends on the individual. Its effectiveness isn’t widely proven and shouldn’t replace medical methods."
      },
      {
        question: "1.14. Is laser therapy proven to work?",
        answer:
          "Similar to acupuncture, clinical evidence is still lacking."
      },
      {
        question: "1.15. Are there good books to read while quitting?",
        answer:
          "Yes. Some books like \"Allen Carr’s Easy Way to Stop Smoking\" are highly rated."
      },
      {
        question: "1.16. Where can I find more information?",
        answer:
          "You can look in the app, online support groups, or consult official medical resources."
      }
    ]
  },
  {
    title: "2. About the application",
    faqs: [
      {
        question: "2.1. How does the system work?",
        answer:
          "This is a quit-smoking support website that helps you:\n\nTrack your progress,\n\nLog your smoking history,\n\nSet goals and view stats,\n\nInteract with coaches or the community."
      },
      {
        question: "2.2. How do I access the system?",
        answer:
          "You can access it via a web browser at our website address."
      },
      {
        question: "2.3. Can I back up my data?",
        answer:
          "Yes. When you log in with your personal account (email or Google), your data is securely and automatically stored on our system."
      },
      {
        question: "2.4. Can I change the language?",
        answer:
          "Yes. You can change the language in the 'Settings' section."
      },
      {
        question: "2.5. What languages does the system support?",
        answer:
          "Currently supports Vietnamese, English, and may expand to other languages in the future."
      }
    ]
  },
  {
    title: "3. About PRO features",
    faqs: [
      {
        question: "3.1. What are the features of PRO?",
        answer:
          "Personalized quit plan\nTailored roadmap based on your habits and goals.\n\nAddiction analysis\nTrack progress, assess effectiveness, and receive deep insights.\n\nOnline consultation\nGet support from experts who accompany you during your journey.\n\nAI companion\nA 24/7 intelligent assistant to keep you motivated and informed.\n\nAdvanced reports & statistics\nDetailed data visualization about your quit-smoking progress."
      },
      {
        question: "3.2. Is PRO a one-time purchase or subscription?",
        answer:
          "It is a monthly/yearly subscription."
      }
    ]
  },
  {
    title: "4. Quitters community",
    faqs: [
      {
        question: "4.1. What are the community rules?",
        answer:
          "Be respectful, no spam, no conflict, and no misinformation."
      },
      {
        question: "4.2. I can't chat – what should I do?",
        answer:
          "Check your internet connection or verify your email before joining the chat."
      }
    ]
  },
  {
    title: "5. Account and registration",
    faqs: [
      {
        question: "5.1. I didn’t receive the activation email",
        answer:
          "Check your spam folder. If not found, request to resend the confirmation email."
      }
    ]
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">Find answers during your quitting journey</p>
      </div>

      {faqSections.map((section, sIndex) => (
        <Card key={sIndex} className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
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
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-muted-foreground whitespace-pre-line text-sm">
                      {faq.answer}
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
