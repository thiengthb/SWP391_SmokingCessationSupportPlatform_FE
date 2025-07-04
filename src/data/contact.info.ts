import { Facebook, Instagram, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export const contactInfos = [
  {
    title: "Email",
    icon: Mail,
    content: "swp391team@gmail.com",
  },
  {
    title: "page.contact.info.phone",
    icon: Phone,
    content: "+84 372 7321 80",
  },
  {
    title: "page.contact.info.address",
    icon: MapPin,
    content: "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức",
  },
  {
    title: "page.contact.info.social",
    icon: MessageSquare,
    content: "page.contact.info.followUs",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/swp391", icon: Facebook },
      { name: "Instagram", url: "https://www.instagram.com/swp391", icon: Instagram },  
    ]
  }
]