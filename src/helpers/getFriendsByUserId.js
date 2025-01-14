import { fetchRedis } from "./redis";

/**
 * Retrieves friends for a given user ID.
 * @param {string} userId - The ID of the user whose friends are to be retrieved.
 * @returns {Promise<Array>} - A list of friends for the given user.
 */
export const getFriendsByUserId = async (userId) => {
  // Retrieve friends for the current user
  console.log("userid", userId); // Add console log for the user ID

  const friendIds = await fetchRedis('smembers', `user:${userId}:friends`);
  console.log("friend ids", friendIds); // Add console log for friend IDs

  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = await fetchRedis('get', `user:${friendId}`);
      const parsedFriend = JSON.parse(friend);
      return parsedFriend;
    })
  );

  return friends;
};


// import { fetchRedis } from "./redis";

// export const getFriendsByUserId = async (userId) => {
//     const friendIds = await fetchRedis('smembers', `user:${userId}:friends`);

//     const friends = await Promise.all(
//         friendIds.map(async (friendId) => {
//             const friend = await fetchRedis('get', `user:${friendId}`);
//             const parsedFriend = JSON.parse(friend)
//             return parsedFriend;
//         })
//     );

//     return friends;
// };
