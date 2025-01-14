// const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
// const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

// // type Command = 'zrange' | 'sismember' | 'get' | 'sismember'
// const allowedCommands = ['zrange', 'sismember', 'get', 'smembers'];
// export async function fetchRedis(
//     command, ...args
// ){
// //    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`
   
// //    const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,
// //     {
// //         headers:{
// //             Authorization: `Bearer ${authToken}`,
// //         },
// //         cache:'no-store',
// //     }
// // )
// if (!allowedCommands.includes(command)) {
//   throw new Error(`Unsupported Redis command: ${command}`);
// }
// const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`;

//   const response = await fetch(commandUrl, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//     cache: 'no-store',
//   });
//    if(!response.ok){
//     throw new Error(`Error executing Redis Command: ${response.statusText}`)
//    }  
//    const data = await response.json();
//    return data.result
// }



const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Executes a Redis command via Upstash REST API.
 * @param {string} command - The Redis command to execute (e.g., 'zrange', 'sismember', 'get', 'smembers').
 * @param {...(string|number)} args - The arguments for the Redis command.
 * @returns {Promise<any>} - The result of the Redis command.
 * @throws {Error} - If the response is not successful.
 */
export async function fetchRedis(command, ...args) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}

// module.exports = { fetchRedis };
