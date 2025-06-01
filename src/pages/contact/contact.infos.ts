import { Facebook, Instagram, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export const contactInfos = [
  {
    title: "Email",
    icon: Mail,
    content: "swp391team@gmail.com",
  },
  {
    title: "Phone",
    icon: Phone,
    content: "+84 372 7321 80",
  },
  {
    title: "Address",
    icon: MapPin,
    content: "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức",
  },
  {
    title: "Social Media",
    icon: MessageSquare,
    content: "Follow us on our social media channels for updates and support.",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/swp391", icon: Facebook },
      { name: "Instagram", url: "https://www.instagram.com/swp391", icon: Instagram },  
    ]
  }
]