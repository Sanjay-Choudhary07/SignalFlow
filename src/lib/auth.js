import {NextAuthOptions} from 'next-auth'
import {UpstashRedisAdapter} from '@next-auth/upstash-redis-adapter'
import { db } from './db'
import GoogleProvider from "next-auth/providers/google"

// function getGoogleCredentials()
export const authOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId:
        })
    ]
}