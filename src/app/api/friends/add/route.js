import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/addFriend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req){
    try{
        const body = await req.json();
        const {email:emailToAdd} = addFriendValidator.parse(body.email)
        // console.log('get id', email)
        const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`)
    //     const RESTResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,
    //     {
    //         headers:{
    //             Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    //         },
    //         cache:'no-store',
    //     }
    // )
    //  const data = (await RESTResponse.json())
    //  const idToAdd = data.result
     if(!idToAdd){
      return new Response('This person does not exist',{status:400})
     }
     const session = await getServerSession(authOptions)
     if(!session){
        return new Response('Unauthorized', {status:401})
     }
     if(idToAdd===session.user.id){
        return new Response('You can not add yourself as a friend', {status:400})
     }
     const isAlreadyAdded = await fetchRedis(
        'sismember',
        `user:${idToAdd}:incoming_friend_requests`,
        session.user.id
     )
     if(isAlreadyAdded){
        return new Response('Already added this user', {status:400}) 
     }
     const isAlreadyFriends = await fetchRedis(
        'sismember',
        `user:${idToAdd}:friends`,
        idToAdd
     )
     if(isAlreadyFriends){
        return new Response('Already friends with this user', {status:400}) 
     }
     // send friend request

      db.sadd(`user:${idToAdd}:incoming_friend_request`, session.user.id)
     return new Response('OK')
    //  console.log(data)
    }
    catch(error){
      if(error instanceof z.ZodError){
        return new Response('Invalid request payload', {status:422})
      }
      return new Response('Invalid request', {status:400})
    }
}