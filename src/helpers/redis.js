const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

// type Command = 'zrange' | 'sismember' | 'get' | 'sismember'
const allowedCommands = ['zrange', 'sismember', 'get', 'smembers'];
export async function fetchRedis(
    command, ...args
){
//    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`
   
//    const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,
//     {
//         headers:{
//             Authorization: `Bearer ${authToken}`,
//         },
//         cache:'no-store',
//     }
// )
if (!allowedCommands.includes(command)) {
  throw new Error(`Unsupported Redis command: ${command}`);
}
const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  });
   if(!response.ok){
    throw new Error(`Error executing Redis Command: ${response.statusText}`)
   }  
   const data = await response.json();
   return data.result
}