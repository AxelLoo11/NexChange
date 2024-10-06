import Header from "@/components/Header";
import type { Metadata } from "next";
import './globals.css';

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
