import Header from "@/components/Header";

export default function ChatLayout({
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