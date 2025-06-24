import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage } from "@/types/community/chat";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const initials = message.author.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={cn(
      "flex items-start gap-2 p-2 rounded",
      message.isSystem && "bg-muted/50 text-center justify-center"
    )}>
      {!message.isSystem && (
        <Avatar>
          <AvatarImage src={message.author.avatar} alt={message.author.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1">
        {!message.isSystem && (
          <div className="text-sm font-medium">{message.author.name}</div>
        )}
        <p className={cn(
          "text-sm",
          message.isSystem ? "text-muted-foreground" : "text-foreground"
        )}>
          {message.content}
        </p>
      </div>
      <time className="text-xs text-muted-foreground">
        {new Date(message.timestamp).toLocaleTimeString()}
      </time>
    </div>
  );
}
