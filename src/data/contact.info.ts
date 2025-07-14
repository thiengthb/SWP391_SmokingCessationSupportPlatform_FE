import { Facebook, Instagram, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export const contactInfos = [
  {
    title: "data.contact.info.email",
    icon: Mail,
    content: "swp391team@gmail.com",
  },
  {
    title: "data.contact.info.phone",
    icon: Phone,
    content: "+84 372 7321 80",
  },
  {
    title: "data.contact.info.address",
    icon: MapPin,
    content: "data.contact.info.addressValue",
  },
  {
    title:  "data.contact.info.social",
    icon: MessageSquare,
    content: "data.contact.info.followUs",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/swp391", icon: Facebook },
      { name: "Instagram", url: "https://www.instagram.com/swp391", icon: Instagram },  
    ]
  }
]