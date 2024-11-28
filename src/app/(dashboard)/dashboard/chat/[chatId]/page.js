import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react';

async function getChatMessages(chatId) {
    try {
        const results = await fetchRedis(
            'zrange',
            `chat:${chatId}:messages`,
            0,
            -1
        );
        const dbMessages = results.map((message) => JSON.parse(message));
        const reversedDbMessages =  dbMessages.reverse();
        const messages = messageArrayValidator.parse(reversedDbMessages)
        return messages;
    } catch (error) {
        notFound();
    }
}

const page = async ({ params }) => {
    const { chatId } = params;
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const { user } = session;

    const [userId1, userId2] = chatId.split('--');

    if (user.id !== userId1 && user.id !== userId2) {
        notFound();
    }

    const chatPartnerId = user.id === userId1 ? userId2 : userId1;
    const chatPartner = await db.get(`user:${chatPartnerId}`);
    const initialMessages = await getChatMessages(chatId);

    return (
        <div>
            {params.chatId}
        </div>
    );
};

export default page;
