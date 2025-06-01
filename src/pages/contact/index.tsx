import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";

export default function ContactPage() {
  return (
    <div className="container max-w-3xl xl:max-w-6xl 2xl:max-w-[1240px] px-5 py-6 lg:py-10 xl:py-16 2xl:py-32 mx-auto">
      <div className="flex justify-between flex-col xl:flex-row gap-6 xl:gap-12 2xl:gap-20 relative">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}
