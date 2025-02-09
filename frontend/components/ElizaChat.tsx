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
            console.log('Sending request to Eliza...', inputText);
            
            const response = await fetch('/api/eliza', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputText }),
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
            }

            const data = JSON.parse(responseText);
            
            // Add Eliza's response
            setMessages(prev => [...prev, { text: data.response, isUser: false }]);
        } catch (error) {
            console.error('Detailed error:', {
                error,
                message: error instanceof Error ? error.message : 'Unknown error'
            });
            setMessages(prev => [...prev, { 
                text: "Sorry, I'm having trouble connecting right now. Please try again.", 
                isUser: false 
            }]);
        } finally {
            setIsLoading(false);
            setInputText('');
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