import { contactInfos } from "../../../data/contact.info";
import { useTranslate } from "@/hooks/useTranslate";

export function ContactInfo() {
  const { tContact, tData } = useTranslate();
  return (
    <div className="space-y-6 lg:space-y-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {tContact("contact.getInTouch")}
        </h2>
        <div className="space-y-6">
          {contactInfos.map((info) => (
            <div key={info.title} className="flex items-start space-x-4">
              <info.icon className="w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium">{tData(info.title)}</h3>
                <p className="text-muted-foreground">{tData(info.content)}</p>
                {info.links && (
                  <div className="w-full flex flex-wrap gap-10 mt-4">
                    {info.links.map((link, index) => (
                      <div className="">
                        <link.icon className="inline-block w-4 h-4 mr-1" />
                        <a
                          key={index}
                          href={link.url}
                          className="text-primary hover:underline"
                        >
                          {link.name}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
