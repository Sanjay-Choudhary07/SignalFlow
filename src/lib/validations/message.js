import { z } from 'zod';

const messageValidator = z.object({
    id: z.string(),
    senderId: z.string(),
    text: z.string(),
    timestamp: z.number(),
});

const messageArrayValidator = z.array(messageValidator);

export default {
    messageValidator,
    messageArrayValidator,
};
