import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage } from "@/types/community/chat";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const initials = message.author.username
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={cn(
      "flex items-start gap-2 p-2 rounded bg-muted/50"
    )}>
      {
        <Avatar>
          <AvatarImage src={message.author.avatar} alt={message.author.username} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      }
      <div className="flex-1">
          <div className="text-sm font-medium">{message.author.username}</div>
        <p className={cn(
          "text-sm",
        )}>
          {message.content}
        </p>
      </div>
      {message.timestamp && (
      <time className="text-xs text-muted-foreground">
        {new Date(message.timestamp).toLocaleTimeString()}
      </time>)}
    </div>
  );
}
