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
          <h1 className="text-5xl md:text-6xl font-bold">NexChange</h1>
          {/* Project Description */}
          <p className="text-2xl">Discover and exchange quality second-hand items effortlessly</p>

          {/* Links */}
          <div className="space-y-2">
            <Link href="/explore">
              <a className="block text-lg font-medium underline">Explore Now →</a>
            </Link>
            <Link href="/login">
              <a className="block text-lg font-medium underline">Login Here!</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
