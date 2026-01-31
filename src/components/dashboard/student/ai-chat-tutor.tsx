// @ts-nocheck
'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAIResponse } from '@/app/actions';
import { type Message } from '@/lib/types';
import { Bot, Send, User, Loader2 } from 'lucide-react';

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI Tutor. How can I help you with your studies today?",
  },
];

const initialState = {
  message: null,
  errors: {},
  success: false,
  answer: null,
  question: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export function AIChatTutor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [formState, formAction] = useActionState(getAIResponse, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formState.success && formState.answer) {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: 'user', content: formState.question! },
        { id: crypto.randomUUID(), role: 'assistant', content: formState.answer },
      ]);
      formRef.current?.reset();
    }
  }, [formState]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <div className="h-[40vh] flex flex-col border rounded-lg">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 text-sm ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t">
        <form
          ref={formRef}
          action={formAction}
          className="flex w-full items-center space-x-2"
        >
          <Input
            name="question"
            placeholder="Type your question..."
            autoComplete="off"
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
