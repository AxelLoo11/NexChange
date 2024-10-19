import React from "react";
import Header from "@/components/Header";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="fixed w-screen h-screen">
      <Header />
      {children}
    </div>
  )
}