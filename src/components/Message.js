'use client'
import React, {useRef, useState} from 'react'
import Message from '@/lib/validations/message'
const Message = ({initialMessages, sessionId}) => {
    const [messages, setMessages] = useState(initialMessages)
    const scrollDownRef = useRef(null);

    const formatTimestamp = (timestamp) => {
      return format(timestamp, 'HH:mm')
    }
    
  return (
    <div
     id='messages'
     className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
     <div ref={scrollDownRef} />
     {messages.map((message, index)=>{
        const isCurrentUser = message.senderId === sessionId
        const hasNextMessageFromSameUser = messages[index-1]?.senderId === messages[index].senderId
        return (
          <div
            className='chat-message'
            key={`${message.id}-${message.timestamp}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': isCurrentUser,
              })}>
              <div
                className={cn(
                  'flex flex-col space-y-2 text-base max-w-xs mx-2',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}>
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}>
                  {message.text}{' '}
                  <span className='ml-2 text-xs text-gray-400'>
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>
             </div>
             </div>
        )
    })}
    </div>
  )
}

export default Message
