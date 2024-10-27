import Header from '@/components/Header';
import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
      >
        <div className="relative z-10 text-center space-y-4 text-white">
          {/* Project Title */}
          <h1 className="text-9xl md:text-8xl font-bold shadow-lg">NexChange</h1>
          {/* Project Description */}
          <p className="text-3xl shadow-md">Discover and exchange quality second-hand items effortlessly</p>

          {/* Links */}
          <div className="space-y-2">
            <Link href="/explore">
              <p className="block text-lg font-medium underline">Explore Now →</p>
            </Link>
            <Link href="/login">
              <p className="block text-lg font-medium underline">Login Here!</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
