import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexChange",
  description: "test description ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex bg-stone-800"
      >
        {children}
      </body>
    </html>
  );
}
