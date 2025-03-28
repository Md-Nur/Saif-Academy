"use client";

import { useChat } from "@ai-sdk/react";

import { cn } from "@/lib/utils";
import { Chat } from "@/components/ui/chat";

// type ChatDemoProps = {
//   initialMessages?: UseChatOptions["initialMessages"];
// };

export default function ChatDemo(props) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
  });

  return (
    <div className="flex flex-col h-[500px] w-full max-w-7xl mx-auto px-3 xl:px-9">
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit} 
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        suggestions={[
          "Explain the difference between ‘their,’ ‘there,’ and ‘they’re’?",
          "Give me an example of a thesis statement for an essay.",
          "What’s a fun way to remember vocabulary words?",
        ]}
      />
    </div>
  );
}
