import type { Metadata } from "next";
import { UserProvider } from '@/context/UserContext';
import './globals.css';

export const metadata: Metadata = {
  title: "NexChange",
  description: "test description ...",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          {modal}
        </UserProvider>
      </body>
    </html>
  );
}
