import { contactInfos } from "./contact.infos";

export function ContactInfo() {
  return (
    <div className="space-y-6 lg:space-y-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Get in Touch</h2>
        <div className="space-y-6">
          {contactInfos.map((info) => (
            <div key={info.title} className="flex items-start space-x-4">
              <info.icon className="w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium">{info.title}</h3>
                <p className="text-muted-foreground">{info.content}</p>
                {info.links && (
                  <div className="w-full flex flex-wrap gap-10 mt-6">
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
