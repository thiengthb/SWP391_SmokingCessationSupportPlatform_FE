import { cn } from "@/lib/utils";
import { BotMessageSquare, UserRound } from "lucide-react";

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatMessageProps {
  message: Message;
  loading?: boolean;
}

export const ChatMessage = ({ message, loading }: ChatMessageProps) => {
  const isBot = message.sender === 'bot';

  return (
    <div 
      className={cn(
        "flex gap-2 items-end animate-in slide-in-from-bottom-2",
        !isBot && "justify-end"
      )}
    >
      {isBot && (
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BotMessageSquare className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div className={cn(
        "px-4 py-2 rounded-2xl max-w-[85%] shadow-sm",
        "transition-all duration-200",
        isBot ? 
          "bg-muted/50 text-foreground rounded-bl-none" : 
          "bg-primary text-primary-foreground rounded-br-none",
        loading && "animate-pulse"
      )}>
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.text}
        </p>
      </div>

      {!isBot && (
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <UserRound className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  );
};
