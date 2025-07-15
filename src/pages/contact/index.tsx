import { useEffect, useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";
import ContactPageSkeleton from "@/components/skeleton/contact/ContactPageSkeleton";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <ContactPageSkeleton />;

  return (
    <div className="container max-w-3xl xl:max-w-6xl 2xl:max-w-[1240px] px-5 py-6 lg:py-10 xl:py-16 2xl:py-32 mx-auto">
      <div className="flex justify-between flex-col xl:flex-row gap-6 xl:gap-12 2xl:gap-20 relative">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}
