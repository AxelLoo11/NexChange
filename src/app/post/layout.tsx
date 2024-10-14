import Header from "@/components/Header";

export default function PostLayout({
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