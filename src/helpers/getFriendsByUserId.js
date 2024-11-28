import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId) => {
    const friendIds = await fetchRedis('smembers', `user:${userId}:friends`);

    const friends = await Promise.all(
        friendIds.map(async (friendId) => {
            const friend = await fetchRedis('get', `user:${friendId}`);
            const parsedFriend = JSON.parse(friend)
            return parsedFriend;
        })
    );

    return friends;
};
