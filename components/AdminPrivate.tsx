"use client"
import { useLayoutEffect } from 'react'
import { redirect } from 'next/navigation'
import { TUser } from "@/integration/sign"
export default function AdminPrivate({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(()=>{
    if(!window.localStorage.getItem('user') || !window.localStorage.getItem('token'))
    redirect('/');
  // @ts-ignore
    const user : TUser = JSON.parse(window.localStorage.getItem("user"));
    if(user.role != "admin"){
      redirect('/');
    }
  },[])
  return <>{children}</>;
}
