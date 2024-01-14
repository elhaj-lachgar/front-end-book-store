import React from "react";
import SideBar from "@/components/SideBar";
import PrivateRoute from "@/components/PrivateRoute";


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex gap-x-8">
      <PrivateRoute>
        <SideBar />
        {children}
      </PrivateRoute>
    </main>
  );
}
