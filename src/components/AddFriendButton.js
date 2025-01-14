"use client"
import { addFriendValidator } from "@/lib/validations/addFriend";
import Button from "./ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import axios, {AxiosError}  from "axios";
import { z } from "zod";

const AddFriendButton = ({})=>{
    const [showSuccessState, setShowSuccessState] = useState(false)
    const {register, handleSubmit, setError, formState:{errors}}= useForm({
      resolver:zodResolver(addFriendValidator),
    })
    const addFriend = async(email)=>{
        try{
           const validatedEmail = addFriendValidator.parse({email})
           await axios.post('api/friends/add', {
            email: validatedEmail,
           })
           setShowSuccessState(true)
        }
        catch(error){
             if(error instanceof z.ZodError){
               setError('email', {message:error.message})
               return
             }
             if(error.isAxiosError){
               setError('email', {message:error.response?.data})
               return
             }
             setError('email',{message:'something went wrong'})
        }
    }
    const onSubmit = (data)=>{
      addFriend(data.email)
    }
   return(
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
     <label
      htmlFor="email"
      className="block text-sm font-medium leading-6 text-green-900">
        Add Friend by E-mail
     </label>
     <div className="mt-2 flex gap-4">
      <input {...register("email")} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
      placeholder="you@example.com"/>
      <Button>Add</Button>
     </div>
     <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
     {showSuccessState ? (
      <p className="mt-1 text-sm text-green-600">Friend request sent</p>
     ):null}
    </form>
   )
}
export default AddFriendButton;