import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Send, PaperclipIcon, Smile, Image, Calendar, MoreVertical, UserCheck, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  isCoach: boolean;
}

interface TeamMessageProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  onCreateEvent: () => void;
  userId: string;
}

export function TeamMessage({ messages, onSendMessage, onCreateEvent, userId }: TeamMessageProps) {
  const [messageContent, setMessageContent] = useState("");
  
  const handleSendMessage = () => {
    if (!messageContent.trim()) return;
    
    onSendMessage(messageContent);
    setMessageContent("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Team Chat</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onCreateEvent}>
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCheck className="h-4 w-4 mr-2" />
                Manage Members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender.id === userId ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender.id !== userId && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarFallback className={message.isCoach ? "bg-[#FF6B00] text-white" : "bg-neutral-200"}>
                  {message.sender.initials}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-[70%]`}>
              {message.sender.id !== userId && (
                <div className="text-xs text-neutral-500 mb-1 flex items-center">
                  <span className="font-medium">
                    {message.sender.name}
                  </span>
                  {message.isCoach && (
                    <span className="ml-1 bg-[#FF6B00] text-white text-[10px] px-1 rounded">
                      COACH
                    </span>
                  )}
                </div>
              )}
              
              <div className={`
                p-3 rounded-lg text-sm
                ${message.sender.id === userId
                  ? 'bg-[#FF6B00] text-white rounded-tr-none'
                  : 'bg-neutral-100 rounded-tl-none'}
              `}>
                {message.content}
              </div>
              
              <div className="text-xs text-neutral-500 mt-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex items-end w-full space-x-2">
          <Textarea
            className="flex-grow min-h-[60px]"
            placeholder="Type your message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Button 
              className="rounded-full bg-[#FF6B00] hover:bg-orange-700"
              size="icon"
              onClick={handleSendMessage}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}


