import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage } from "@/types/community/chat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatMessageProps {
  message: ChatMessage;
  isOwnMessage?: boolean;
}

export function ChatMessage({ message, isOwnMessage = false }: ChatMessageProps) {
  const initials = message.author.username
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex gap-2 items-start animate-in slide-in-from-bottom-2">
      {
        !isOwnMessage && <Tooltip>
          <TooltipTrigger><Avatar>
            <AvatarImage src={message.author.avatar} alt={message.author.username} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar></TooltipTrigger>
          <TooltipContent>
            <p>{message.author.username}</p>
          </TooltipContent>
        </Tooltip>
      }
      <div className={cn(
        "flex items-center justify-between gap-2 p-2 rounded-xl max-w-1/2 shadow-sm ",
        isOwnMessage ? "ml-auto bg-gray-300 item-start rounded-br-none" : "rounded-bl-none bg-muted/50",
      )}>

        <p className={cn("text-sm px-1")}>
          {message.content}
        </p>
        {message.timestamp && (
          <time className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </time>)}
      </div>
      {
        isOwnMessage && <Tooltip>
          <TooltipTrigger>
            <Avatar className="flex justify-center items-center">
              <AvatarImage src={message.author.avatar} alt={message.author.username} />
              <AvatarFallback className="mb-[1.5px]">{initials}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{message.author.username}</p>
          </TooltipContent>
        </Tooltip>
      }
    </div>
  );
}
