import ChatCard from '@/components/agentkitChat';
import { Header } from '@/components/Header';

export default function ChatPage() {
    return (
        <div>
            <Header />
            <div className="flex justify-between h-screen p-4">
                <div className="flex-1">
                    <p>Hello</p>
                </div>
                <div className="pl-10">
                    <ChatCard />
                </div>

            </div>
        </div>
    )
}