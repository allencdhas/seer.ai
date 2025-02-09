import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        console.log('Received message:', message);

        // Replace with your actual Eliza service URL
        const elizaUrl = 'http://localhost:4000';
        console.log('Attempting to connect to Eliza at:', elizaUrl);

        const response = await fetch(elizaUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        console.log('Eliza service response status:', response.status);
        const responseData = await response.text();
        console.log('Eliza service response:', responseData);

        if (!response.ok) {
            throw new Error(`Eliza service error: ${response.status} - ${responseData}`);
        }

        const data = JSON.parse(responseData);
        
        return NextResponse.json({ response: data.response });
    } catch (error) {
        console.error('Detailed API route error:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error'
        });
        
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to process request' },
            { status: 500 }
        );
    }
} 