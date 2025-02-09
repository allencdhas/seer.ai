'use client';

import { useState } from 'react';

export default function ElizaChat() {
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return;

        setIsLoading(true);
        
        // Add user message immediately
        const newMessages = [...messages, { text: inputText, isUser: true }];
        setMessages(newMessages);

        try {
            const response = await fetch(
                `http://localhost:4000/seerai/message`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: inputText,
                        userId: "user",
                        userName: "User",
                    }),
                }
            );
            const data = await response.json();
            // Add each message from the response to the messages state
            const newMessages = data.map((message: { text: string }) => ({
                text: message.text,
                isUser: false
            }));
            setMessages(prev => [...prev, ...newMessages]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${
                            message.isUser
                                ? 'bg-blue-100 ml-auto max-w-[80%]'
                                : 'bg-gray-100 mr-auto max-w-[80%]'
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                        placeholder="Type your message..."
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2 ${
                            isLoading 
                                ? 'bg-gray-400' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white rounded-lg`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
} 