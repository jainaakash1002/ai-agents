import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import TextareaAutosize from 'react-textarea-autosize';
import { Message, GenerationConfig, AIRole } from '../types';
import { generateTextWithHistory } from '../utils/gemini';
import MessageList from './MessageList';
import PromptTemplateSelector from './PromptTemplateSelector';
import { getPromptTemplates } from '../utils/constants';

interface ChatInterfaceProps {
  apiKey: string;
  generationConfig: GenerationConfig;
  selectedRole: AIRole;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  apiKey, 
  generationConfig,
  selectedRole 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessagesForHistory = (messages: Message[]) => {
    return messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    const loadingMessage: Message = {
      id: uuidv4(),
      role: 'model',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const history = formatMessagesForHistory([
        {
          role: 'model',
          content: selectedRole.systemPrompt,
          id: 'system',
          timestamp: new Date()
        },
        ...messages,
        userMessage
      ]);
      
      const response = await generateTextWithHistory(
        apiKey,
        history,
        'gemini-2.0-flash-lite',
        generationConfig
      );
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: response, isLoading: false } 
            : msg
        )
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { 
                ...msg, 
                content: `Error: ${errorMessage}. Please check your API key or try again later.`, 
                isLoading: false 
              } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptTemplateSelect = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex-1 overflow-y-auto mb-4 rounded-lg">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to your {selectedRole.name} Assistant
            </h2>
            <p className="text-gray-600 max-w-md">
              {selectedRole.description}. Select a template below or type your own question.
            </p>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <PromptTemplateSelector 
        onSelect={handlePromptTemplateSelect}
        templates={getPromptTemplates(selectedRole.id)}
      />
      
      <form onSubmit={handleSubmit} className="relative">
        <TextareaAutosize
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask your ${selectedRole.name.toLowerCase()} assistant...`}
          className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-white"
          minRows={2}
          maxRows={6}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={`absolute right-3 bottom-3 p-2 rounded-full ${
            !inputValue.trim() || isLoading
              ? 'text-gray-400 bg-gray-100'
              : 'text-white bg-blue-600 hover:bg-blue-700'
          } transition-colors duration-200`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;