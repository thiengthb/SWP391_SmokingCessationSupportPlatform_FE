import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface TestimonialAvatarProps {
  src?: string;
  alt: string;
}

export function TestimonialAvatar({ src, alt }: TestimonialAvatarProps) {
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        {src ? <User className="h-6 w-6" /> : initials}
      </AvatarFallback>
    </Avatar>
  );
}
